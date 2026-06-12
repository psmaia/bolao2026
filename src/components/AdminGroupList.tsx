'use client'

type Group = {
  id: string
  name: string
  description: string | null
  invite_code: string | null
  owner_id: string
  created_at: string | null
  member_count: number
  owner_name: string
}

export default function AdminGroupList({ groups }: { groups: Group[] }) {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-sm text-gray-500 mb-2">{groups.length} grupo(s) criado(s)</p>
      {groups.map(group => (
        <div key={group.id} className="card flex items-center gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-medium text-sm">{group.name}</span>
              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                {group.member_count} membro{group.member_count !== 1 ? 's' : ''}
              </span>
            </div>
            <p className="text-xs text-gray-500">
              Dono: {group.owner_name}
              {group.invite_code && (
                <span className="ml-2 font-mono text-gray-400">#{group.invite_code}</span>
              )}
            </p>
          </div>
          <div className="text-right flex-shrink-0">
            <p className="text-xs text-gray-400">
              {group.created_at ? new Date(group.created_at).toLocaleDateString('pt-BR') : '—'}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
