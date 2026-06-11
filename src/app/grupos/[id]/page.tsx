import { redirect, notFound } from 'next/navigation'
import { createServerSupabaseClient } from '@/lib/supabase'
import { stageLabel } from '@/lib/utils'
import GroupBets from '@/components/GroupBets'
import GroupRanking from '@/components/GroupRanking'
import InviteModal from '@/components/InviteModal'

export default async function GroupPage({ params }: { params: { id: string } }) {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  // Verifica se o usuário é membro
  const { data: membership } = await supabase
    .from('group_members')
    .select('role')
    .eq('group_id', params.id)
    .eq('user_id', user.id)
    .single()

  if (!membership) notFound()

  // Busca dados do grupo
  const { data: group } = await supabase
    .from('groups')
    .select('*')
    .eq('id', params.id)
    .single()

  if (!group) notFound()

  // Busca jogos (apenas futuros e em andamento para apostar)
  const { data: matches } = await supabase
    .from('matches')
    .select('*')
    .order('match_date', { ascending: true })

  // Apostas do usuário neste grupo
  const { data: userBets } = await supabase
    .from('bets')
    .select('*')
    .eq('group_id', params.id)
    .eq('user_id', user.id)

  // Ranking do grupo
  const { data: ranking } = await supabase
    .rpc('get_group_ranking', { group_uuid: params.id })

  const isOwner = membership.role === 'owner'
  const betsMap = new Map(userBets?.map(b => [b.match_id, b]) || [])

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header do grupo */}
      <div className="card mb-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-brand-blue">{group.name}</h1>
            {group.description && (
              <p className="text-gray-500 text-sm mt-1">{group.description}</p>
            )}
          </div>
          <InviteModal groupId={group.id} inviteCode={group.invite_code} isOwner={isOwner} />
        </div>
        <div className="mt-3 text-xs text-gray-400">
          Código do grupo: <span className="font-mono font-bold text-gray-600">{group.invite_code}</span>
        </div>
      </div>

      {/* Pontuação */}
      <div className="card mb-6 text-xs text-gray-500">
        <p className="font-semibold text-gray-700 mb-1">Sistema de pontos:</p>
        <div className="flex gap-4">
          <span>🎯 Placar exato: <b className="text-brand-green">10 pts</b></span>
          <span>✅ Vencedor: <b className="text-brand-green">5 pts</b></span>
          <span>🤝 Empate: <b className="text-brand-green">3 pts</b></span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6">
        <a href="#apostas" className="btn-primary text-sm">Minhas Apostas</a>
        <a href="#ranking" className="btn-secondary text-sm">Ranking</a>
      </div>

      {/* Apostas */}
      <div id="apostas" className="mb-8">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Minhas Apostas</h2>
        <GroupBets
          matches={matches || []}
          betsMap={Object.fromEntries(betsMap)}
          groupId={params.id}
          userId={user.id}
        />
      </div>

      {/* Ranking */}
      <div id="ranking">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Ranking</h2>
        <GroupRanking ranking={ranking || []} currentUserId={user.id} />
      </div>
    </div>
  )
}
