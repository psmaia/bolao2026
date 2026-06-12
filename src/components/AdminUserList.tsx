'use client'

type User = {
  id: string
  name: string
  nickname: string
  email: string
  is_admin: boolean | null
  created_at: string | null
  phone: string | null
  cpf_verified: boolean | null
}

export default function AdminUserList({ users }: { users: User[] }) {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-sm text-gray-500 mb-2">{users.length} usuário(s) cadastrado(s)</p>
      {users.map(user => (
        <div key={user.id} className="card flex items-center gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-medium text-sm">{user.name}</span>
              <span className="text-xs text-gray-400">@{user.nickname}</span>
              {user.is_admin && (
                <span className="text-xs bg-brand-yellow text-brand-blue font-bold px-2 py-0.5 rounded">ADMIN</span>
              )}
            </div>
            <p className="text-xs text-gray-500 truncate">{user.email}</p>
          </div>
          <div className="text-right flex-shrink-0">
            <p className="text-xs text-gray-400">
              {user.created_at ? new Date(user.created_at).toLocaleDateString('pt-BR') : '—'}
            </p>
            {user.cpf_verified && (
              <span className="text-xs text-green-600">CPF ✓</span>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
