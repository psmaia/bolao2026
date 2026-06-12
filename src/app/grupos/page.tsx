export const dynamic = 'force-dynamic'

import { redirect } from 'next/navigation'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import GroupsList from '@/components/GroupsList'

export default async function GruposPage() {
  const supabase = await createServerSupabaseClient() as any
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: memberships } = await supabase
    .from('group_members')
    .select('role, joined_at, groups(id, name, description, invite_code, owner_id)')
    .eq('user_id', user.id)

  const { data: invites } = await supabase
    .from('group_invites')
    .select('id, group_id, invited_by, created_at, groups(name, invite_code)')
    .eq('invited_email', user.email!)
    .eq('status', 'pending')

  return (
    <GroupsList
      memberships={(memberships as any) || []}
      invites={(invites as any) || []}
      userId={user.id}
    />
  )
}
