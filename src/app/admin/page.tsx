export const dynamic = 'force-dynamic'

import { redirect } from 'next/navigation'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import AdminMatchList from '@/components/AdminMatchList'
import AdminUserList from '@/components/AdminUserList'
import AdminGroupList from '@/components/AdminGroupList'
import AdminTabs from '@/components/AdminTabs'

export default async function AdminPage({ searchParams }: { searchParams: { tab?: string } }) {
  const supabase = await createServerSupabaseClient() as any
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single()
  if (!(profile as any)?.is_admin) redirect('/')

  const tab = searchParams.tab || 'jogos'

  const { data: matches } = await supabase
    .from('matches').select('*').order('match_date', { ascending: true })

  const { data: users } = await supabase
    .from('profiles').select('*').order('created_at', { ascending: false })

  const { data: groups } = await supabase
    .from('groups')
    .select('*, group_members(count), profiles!groups_owner_id_fkey(name)')
    .order('created_at', { ascending: false })

  const groupsFormatted = (groups || []).map((g: any) => ({
    ...g,
    member_count: g.group_members?.[0]?.count ?? 0,
    owner_name: g.profiles?.name ?? '—',
  }))

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-brand-blue">🔧 Painel Admin</h1>
        <span className="text-xs bg-brand-yellow text-brand-blue font-bold px-2 py-1 rounded">ADMIN</span>
      </div>

      <AdminTabs active={tab} />

      {tab === 'jogos' && (
        <>
          <div className="card mb-4 bg-yellow-50 border-yellow-200">
            <p className="text-sm text-yellow-800">
              <strong>Como atualizar resultado:</strong> Clique em Editar, insira o placar e mude o status para Encerrado. Os pontos são calculados automaticamente.
            </p>
          </div>
          <AdminMatchList matches={matches || []} />
        </>
      )}

      {tab === 'usuarios' && <AdminUserList users={users || []} />}

      {tab === 'grupos' && <AdminGroupList groups={groupsFormatted} />}
    </div>
  )
}
