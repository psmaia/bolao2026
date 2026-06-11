import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createServerSupabaseClient } from '@/lib/supabase'
import CreateGroupButton from '@/components/CreateGroupButton'

export default async function GruposPage() {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  // Grupos onde o usuário é membro
  const { data: memberships } = await supabase
    .from('group_members')
    .select(`
      role,
      joined_at,
      groups (
        id, name, description, invite_code, owner_id,
        group_members (count)
      )
    `)
    .eq('user_id', user.id)

  // Convites pendentes
  const { data: invites } = await supabase
    .from('group_invites')
    .select('id, group_id, invited_by, created_at, groups(name), profiles!invited_by(nickname)')
    .eq('invited_email', user.email!)
    .eq('status', 'pending')

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-brand-blue">Meus Grupos</h1>
        <CreateGroupButton userId={user.id} />
      </div>

      {/* Convites pendentes */}
      {invites && invites.length > 0 && (
        <div className="mb-6">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
            Convites pendentes ({invites.length})
          </h2>
          <div className="flex flex-col gap-2">
            {invites.map((inv: any) => (
              <InviteCard key={inv.id} invite={inv} userId={user.id} userEmail={user.email!} />
            ))}
          </div>
        </div>
      )}

      {/* Grupos */}
      {memberships && memberships.length > 0 ? (
        <div className="flex flex-col gap-3">
          {memberships.map((m: any) => (
            <Link
              key={m.groups.id}
              href={`/grupos/${m.groups.id}`}
              className="card hover:shadow-md transition-shadow flex items-center justify-between"
            >
              <div>
                <p className="font-semibold text-brand-blue">{m.groups.name}</p>
                {m.groups.description && (
                  <p className="text-sm text-gray-500">{m.groups.description}</p>
                )}
                <p className="text-xs text-gray-400 mt-1">
                  {m.groups.group_members[0]?.count ?? 0} membros · {m.role === 'owner' ? 'Seu grupo' : 'Membro'}
                </p>
              </div>
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          ))}
        </div>
      ) : (
        <div className="card text-center py-12 text-gray-500">
          <p className="text-4xl mb-3">🏆</p>
          <p className="font-medium mb-1">Você ainda não tem grupos</p>
          <p className="text-sm">Crie um grupo e convide seus amigos para o bolão!</p>
        </div>
      )}
    </div>
  )
}

function InviteCard({ invite, userId, userEmail }: { invite: any; userId: string; userEmail: string }) {
  return (
    <div className="card border-brand-yellow border-2 flex items-center justify-between">
      <div>
        <p className="font-medium">
          Convite para <span className="text-brand-blue font-bold">{invite.groups?.name}</span>
        </p>
        <p className="text-xs text-gray-500">
          de {invite.profiles?.nickname || 'alguém'}
        </p>
      </div>
      <div className="flex gap-2">
        <form action={`/api/invites/${invite.id}/accept`} method="POST">
          <button type="submit" className="btn-primary text-sm py-1">Aceitar</button>
        </form>
        <form action={`/api/invites/${invite.id}/decline`} method="POST">
          <button type="submit" className="btn-secondary text-sm py-1">Recusar</button>
        </form>
      </div>
    </div>
  )
}
