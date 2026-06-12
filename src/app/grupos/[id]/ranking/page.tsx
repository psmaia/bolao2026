import { redirect, notFound } from 'next/navigation'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import RankingHeader from '@/components/RankingHeader'

export const dynamic = 'force-dynamic'

export default async function RankingPage({ params }: { params: { id: string } }) {
  const supabase = await createServerSupabaseClient() as any
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: membership } = await supabase
    .from('group_members').select('role').eq('group_id', params.id).eq('user_id', user.id).single()
  if (!membership) notFound()

  const { data: group } = await supabase
    .from('groups').select('name').eq('id', params.id).single()
  if (!group) notFound()

  const { data: ranking } = await supabase
    .rpc('get_group_ranking', { group_uuid: params.id })

  let rankingWithAvatars = ranking || []
  if (ranking && ranking.length > 0) {
    const { data: avatarProfiles } = await supabase
      .from('profiles')
      .select('id, avatar_url')
      .in('id', ranking.map((r: { user_id: string }) => r.user_id))
    const avatarMap = Object.fromEntries((avatarProfiles || []).map((p: any) => [p.id, p.avatar_url]))
    rankingWithAvatars = ranking.map((r: { user_id: string }) => ({ ...r, avatar_url: avatarMap[r.user_id] || null }))
  }

  return (
    <RankingHeader
      groupId={params.id}
      groupName={group.name}
      ranking={rankingWithAvatars}
      currentUserId={user.id}
    />
  )
}
