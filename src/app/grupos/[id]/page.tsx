export const dynamic = 'force-dynamic'

import { redirect, notFound } from 'next/navigation'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import GroupBets from '@/components/GroupBets'
import InviteModal from '@/components/InviteModal'
import GroupMembers from '@/components/GroupMembers'
import GroupHeader from '@/components/GroupHeader'

export default async function GroupPage({ params }: { params: { id: string } }) {
  const supabase = await createServerSupabaseClient() as any
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: membership } = await supabase
    .from('group_members').select('role').eq('group_id', params.id).eq('user_id', user.id).single()
  if (!membership) notFound()

  const { data: group } = await supabase.from('groups').select('*').eq('id', params.id).single()
  if (!group) notFound()

  const { data: members } = await supabase
    .from('group_members')
    .select('user_id, role, joined_at, profiles(name, nickname, avatar_url)')
    .eq('group_id', params.id)
    .order('joined_at', { ascending: true })

  const { data: matches } = await supabase.from('matches').select('*').order('match_date', { ascending: true })
  const { data: userBets } = await supabase.from('bets').select('*').eq('group_id', params.id).eq('user_id', user.id)

  const betsMap = Object.fromEntries((userBets || []).map((b: any) => [b.match_id, b]))

  const isOwner = membership.role === 'owner'
  let memberCount = 0
  let betCountByMatch: Record<string, number> = {}
  if (isOwner) {
    const { count } = await supabase.from('group_members').select('*', { count: 'exact', head: true }).eq('group_id', params.id)
    memberCount = count || 0
    const { data: allBets } = await supabase.from('bets').select('match_id').eq('group_id', params.id)
    betCountByMatch = (allBets || []).reduce((acc: Record<string, number>, b: any) => {
      acc[b.match_id] = (acc[b.match_id] || 0) + 1
      return acc
    }, {})
  }

  return (
    <GroupHeader
      groupId={params.id}
      groupName={group.name}
      groupDescription={group.description}
      inviteCode={group.invite_code}
      isOwner={isOwner}
      membersCount={members?.length || 0}
      membersNode={<GroupMembers members={members || []} currentUserId={user.id} />}
      betsNode={<GroupBets matches={matches || []} betsMap={betsMap} groupId={params.id} userId={user.id} isOwner={isOwner} memberCount={memberCount} betCountByMatch={betCountByMatch} />}
    />
  )
}
