'use client'

import { useState, useMemo } from 'react'
import { createClient } from '@/lib/supabase'
import toast from 'react-hot-toast'
import type { Database } from '@/lib/database.types'
import { formatMatchDate, stageLabel, getUserTimezone } from '@/lib/utils'

type Match = Database['public']['Tables']['matches']['Row']
type Bet = Database['public']['Tables']['bets']['Row']

interface Props {
  matches: Match[]
  betsMap: Record<string, Bet>
  groupId: string
  userId: string
}

export default function GroupBets({ matches, betsMap: initialBets, groupId, userId }: Props) {
  const [bets, setBets] = useState<Record<string, Bet>>(initialBets)
  const [saving, setSaving] = useState<string | null>(null)
  const supabase = createClient()
  const timezone = getUserTimezone()
  const now = new Date()

  // Filtra apenas jogos que ainda não começaram
  const upcoming = useMemo(() =>
    matches.filter(m => new Date(m.match_date) > now && m.status === 'scheduled'),
    [matches]
  )
  const past = useMemo(() =>
    matches.filter(m => new Date(m.match_date) <= now || m.status !== 'scheduled'),
    [matches]
  )

  const saveBet = async (matchId: string, home: number, away: number) => {
    setSaving(matchId)
    const existing = bets[matchId]

    if (existing) {
      const { error } = await supabase
        .from('bets')
        .update({ home_score_bet: home, away_score_bet: away })
        .eq('id', existing.id)

      if (error) { toast.error('Erro ao salvar aposta'); setSaving(null); return }
      setBets(prev => ({ ...prev, [matchId]: { ...existing, home_score_bet: home, away_score_bet: away } }))
    } else {
      const { data, error } = await supabase
        .from('bets')
        .insert({ group_id: groupId, user_id: userId, match_id: matchId, home_score_bet: home, away_score_bet: away })
        .select()
        .single()

      if (error || !data) { toast.error('Erro ao salvar aposta'); setSaving(null); return }
      setBets(prev => ({ ...prev, [matchId]: data }))
    }

    toast.success('Aposta salva!')
    setSaving(null)
  }

  return (
    <div>
      {upcoming.length === 0 && (
        <p className="text-gray-400 text-sm text-center py-8">
          Não há jogos disponíveis para apostar no momento.
        </p>
      )}

      {upcoming.length > 0 && (
        <div className="flex flex-col gap-3 mb-8">
          <p className="text-xs text-gray-400">
            Apostas encerram quando o jogo começa. Horários em: {timezone}
          </p>
          {upcoming.map(match => (
            <BetRow
              key={match.id}
              match={match}
              bet={bets[match.id]}
              saving={saving === match.id}
              onSave={(h, a) => saveBet(match.id, h, a)}
              timezone={timezone}
            />
          ))}
        </div>
      )}

      {past.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
            Jogos encerrados
          </h3>
          <div className="flex flex-col gap-2">
            {past.map(match => (
              <PastBetRow key={match.id} match={match} bet={bets[match.id]} timezone={timezone} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function BetRow({ match, bet, saving, onSave, timezone }: {
  match: Match
  bet?: Bet
  saving: boolean
  onSave: (home: number, away: number) => void
  timezone: string
}) {
  const { date, time } = formatMatchDate(match.match_date, timezone)
  const [home, setHome] = useState(bet?.home_score_bet ?? '')
  const [away, setAway] = useState(bet?.away_score_bet ?? '')
  const changed = home !== (bet?.home_score_bet ?? '') || away !== (bet?.away_score_bet ?? '')

  return (
    <div className="card flex flex-col sm:flex-row items-center gap-4">
      {/* Data */}
      <div className="text-center w-20 flex-shrink-0">
        <p className="text-sm font-bold text-brand-blue">{time}</p>
        <p className="text-xs text-gray-400">{date}</p>
      </div>

      {/* Times + aposta */}
      <div className="flex-1 flex items-center justify-center gap-3">
        <div className="text-center w-24">
          <span className="text-xl">{match.home_flag || '🏳️'}</span>
          <p className="text-xs font-medium mt-1 truncate">{match.home_team}</p>
        </div>

        <div className="flex items-center gap-1">
          <input
            type="number"
            min="0"
            max="20"
            value={home}
            onChange={e => setHome(Number(e.target.value))}
            className="w-12 text-center text-lg font-bold border-2 border-gray-200 rounded-lg p-1 focus:border-brand-green focus:outline-none"
          />
          <span className="text-gray-300 font-bold">×</span>
          <input
            type="number"
            min="0"
            max="20"
            value={away}
            onChange={e => setAway(Number(e.target.value))}
            className="w-12 text-center text-lg font-bold border-2 border-gray-200 rounded-lg p-1 focus:border-brand-green focus:outline-none"
          />
        </div>

        <div className="text-center w-24">
          <span className="text-xl">{match.away_flag || '🏳️'}</span>
          <p className="text-xs font-medium mt-1 truncate">{match.away_team}</p>
        </div>
      </div>

      {/* Botão salvar */}
      <button
        onClick={() => onSave(Number(home), Number(away))}
        disabled={saving || home === '' || away === ''}
        className={`btn-primary text-sm px-3 py-1.5 flex-shrink-0 ${!changed && bet ? 'opacity-50' : ''}`}
      >
        {saving ? '...' : bet ? 'Atualizar' : 'Apostar'}
      </button>
    </div>
  )
}

function PastBetRow({ match, bet, timezone }: { match: Match; bet?: Bet; timezone: string }) {
  const { date } = formatMatchDate(match.match_date, timezone)
  const isFinished = match.status === 'finished'

  const getResultEmoji = () => {
    if (!isFinished || !bet) return null
    if (bet.points_earned >= 10) return '🎯'
    if (bet.points_earned >= 5) return '✅'
    if (bet.points_earned >= 3) return '🤝'
    return '❌'
  }

  return (
    <div className="card flex items-center gap-4 opacity-80">
      <div className="text-xs text-gray-400 w-16 flex-shrink-0">{date}</div>

      <div className="flex-1 flex items-center justify-center gap-2 text-sm">
        <span>{match.home_flag || '🏳️'}</span>
        <span className="font-medium text-xs">{match.home_team}</span>

        {isFinished ? (
          <span className="font-bold mx-1">{match.home_score} × {match.away_score}</span>
        ) : (
          <span className="text-gray-300 mx-1">×</span>
        )}

        <span className="font-medium text-xs">{match.away_team}</span>
        <span>{match.away_flag || '🏳️'}</span>
      </div>

      {/* Aposta do usuário */}
      {bet ? (
        <div className="text-xs text-right flex-shrink-0">
          <p className="text-gray-500">
            Sua aposta: <span className="font-bold">{bet.home_score_bet} × {bet.away_score_bet}</span>
          </p>
          {isFinished && (
            <p className="font-bold text-brand-green">
              {getResultEmoji()} {bet.points_earned} pts
            </p>
          )}
        </div>
      ) : (
        <p className="text-xs text-gray-300 flex-shrink-0">Sem aposta</p>
      )}
    </div>
  )
}
