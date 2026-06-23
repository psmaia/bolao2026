import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Mapeamento de nomes em inglês (API-Football) para português (nosso banco)
const TEAM_NAME_MAP: Record<string, string> = {
  'Mexico': 'México',
  'South Africa': 'África do Sul',
  'South Korea': 'Coreia do Sul',
  'Korea Republic': 'Coreia do Sul',
  'Czech Republic': 'Rep. Checa',
  'Czechia': 'Rep. Checa',
  'Canada': 'Canadá',
  'Bosnia': 'Bósnia-Herzeg.',
  'Bosnia and Herzegovina': 'Bósnia-Herzeg.',
  'Qatar': 'Catar',
  'Switzerland': 'Suíça',
  'Brazil': 'Brasil',
  'Morocco': 'Marrocos',
  'Haiti': 'Haiti',
  'Scotland': 'Escócia',
  'USA': 'Estados Unidos',
  'United States': 'Estados Unidos',
  'Paraguay': 'Paraguai',
  'Australia': 'Austrália',
  'Turkey': 'Turquia',
  'Turkiye': 'Turquia',
  'Germany': 'Alemanha',
  'Curacao': 'Curaçao',
  'Netherlands': 'Países Baixos',
  'Japan': 'Japão',
  "Ivory Coast": 'Costa do Marfim',
  "Cote d'Ivoire": 'Costa do Marfim',
  'Ecuador': 'Equador',
  'Sweden': 'Suécia',
  'Tunisia': 'Tunísia',
  'Belgium': 'Bélgica',
  'Egypt': 'Egito',
  'Saudi Arabia': 'Arábia Saudita',
  'Uruguay': 'Uruguai',
  'Iran': 'Irã',
  'New Zealand': 'Nova Zelândia',
  'France': 'França',
  'Senegal': 'Senegal',
  'Iraq': 'Iraque',
  'Norway': 'Noruega',
  'Argentina': 'Argentina',
  'Algeria': 'Argélia',
  'Austria': 'Áustria',
  'Jordan': 'Jordânia',
  'Portugal': 'Portugal',
  'DR Congo': 'Congo RD',
  'Congo DR': 'Congo RD',
  'Uzbekistan': 'Uzbequistão',
  'Colombia': 'Colômbia',
  'England': 'Inglaterra',
  'Croatia': 'Croácia',
  'Ghana': 'Gana',
  'Panama': 'Panamá',
  'Spain': 'Espanha',
  'Cape Verde': 'Cabo Verde',
}

function mapTeamName(name: string): string {
  return TEAM_NAME_MAP[name] || name
}

export async function GET(req: NextRequest) {
  // Verifica o secret para evitar chamadas não autorizadas
  const authHeader = req.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  // Busca jogos de hoje e ontem que ainda não foram finalizados no nosso banco
  const { data: pendingMatches } = await supabase
    .from('matches')
    .select('*')
    .in('status', ['scheduled', 'live'])
    .lte('match_date', new Date().toISOString())

  if (!pendingMatches || pendingMatches.length === 0) {
    return NextResponse.json({ message: 'Nenhum jogo pendente', updated: 0 })
  }

  // Busca fixtures nas datas dos jogos pendentes (não só hoje/ontem — um jogo
  // de 3 dias atrás que falhou ao sincronizar precisa continuar sendo tentado,
  // senão fica "scheduled" para sempre e só é corrigido manualmente no admin).
  const pendingDates = Array.from(
    new Set(pendingMatches.map(m => new Date(m.match_date).toISOString().split('T')[0]))
  )
  const today = new Date().toISOString().split('T')[0]
  if (!pendingDates.includes(today)) pendingDates.push(today)

  // Diagnóstico temporário: captura erros/avisos da API e devolve no JSON de
  // resposta, já que não temos acesso fácil aos logs do Vercel para depurar.
  const apiErrors: any[] = []

  let fixtures: any[] = []
  for (const date of pendingDates) {
    const res = await fetch(
      `https://v3.football.api-sports.io/fixtures?date=${date}&league=1&season=2026`,
      { headers: { 'x-apisports-key': process.env.APISPORTS_KEY! } }
    )
    const data = await res.json()
    if (data.errors && Object.keys(data.errors).length > 0) {
      apiErrors.push({ date, league: 1, errors: data.errors, results: data.results })
    }
    if (data.response) fixtures = fixtures.concat(data.response)
  }

  // Se league=1 não retornou nada, tenta sem filtro de liga (buscando por data)
  if (fixtures.length === 0) {
    for (const date of pendingDates) {
      const res = await fetch(
        `https://v3.football.api-sports.io/fixtures?date=${date}`,
        { headers: { 'x-apisports-key': process.env.APISPORTS_KEY! } }
      )
      const data = await res.json()
      if (data.errors && Object.keys(data.errors).length > 0) {
        apiErrors.push({ date, league: 'none', errors: data.errors, results: data.results })
      }
      if (data.response) fixtures = fixtures.concat(data.response)
    }
  }

  let updated = 0
  const errors: string[] = []
  const ftFixturesSeen: string[] = [] // diagnóstico: nomes (já mapeados p/ PT) de jogos FT vistos na API
  const unmatchedFt: string[] = [] // diagnóstico: jogos FT que não bateram com nenhum pendingMatch

  for (const fixture of fixtures) {
    const { fixture: f, teams, goals, score } = fixture
    if (f.status.short !== 'FT') continue // só jogos finalizados

    const homeEn = teams.home.name
    const awayEn = teams.away.name
    const homePt = mapTeamName(homeEn)
    const awayPt = mapTeamName(awayEn)
    const homeGoals = goals.home
    const awayGoals = goals.away

    ftFixturesSeen.push(`${homeEn} (${homePt}) x ${awayEn} (${awayPt}) [${homeGoals}-${awayGoals}]`)

    if (homeGoals === null || awayGoals === null) continue

    // Encontra o jogo correspondente no nosso banco
    const match = pendingMatches.find(m =>
      m.home_team === homePt && m.away_team === awayPt
    )
    if (!match) {
      unmatchedFt.push(`${homePt} x ${awayPt}`)
      continue
    }

    // Pênaltis (só existem em mata-mata)
    const penaltyHome = score?.penalty?.home ?? null
    const penaltyAway = score?.penalty?.away ?? null

    // Atualiza o placar
    const { error: updateError } = await supabase
      .from('matches')
      .update({
        home_score: homeGoals,
        away_score: awayGoals,
        penalty_home: penaltyHome,
        penalty_away: penaltyAway,
        updated_at: new Date().toISOString()
      })
      .eq('id', match.id)

    if (updateError) {
      errors.push(`Erro ao atualizar ${homePt} x ${awayPt}: ${updateError.message}`)
      continue
    }

    // Calcula pontos
    const { error: calcError } = await supabase
      .rpc('calculate_points', { match_uuid: match.id })

    if (calcError) {
      errors.push(`Erro ao calcular pontos ${homePt} x ${awayPt}: ${calcError.message}`)
    } else {
      updated++
    }
  }

  return NextResponse.json({
    message: 'Sync concluído',
    updated,
    errors,
    debug: {
      pendingDates,
      pendingMatchesCount: pendingMatches.length,
      pendingMatchesSample: pendingMatches.slice(0, 5).map(m => `${m.home_team} x ${m.away_team} (${m.match_date})`),
      totalFixturesFetched: fixtures.length,
      apiErrors,
      ftFixturesSeen,
      unmatchedFt,
    },
  })
}
