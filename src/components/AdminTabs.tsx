'use client'

import Link from 'next/link'

const TABS = [
  { key: 'jogos', label: '⚽ Jogos' },
  { key: 'usuarios', label: '👤 Usuários' },
  { key: 'grupos', label: '👥 Grupos' },
]

export default function AdminTabs({ active }: { active: string }) {
  return (
    <div className="flex gap-1 mb-4 border-b border-gray-200">
      {TABS.map(tab => (
        <Link
          key={tab.key}
          href={`/admin?tab=${tab.key}`}
          className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${
            active === tab.key
              ? 'bg-white border border-b-white border-gray-200 text-brand-blue -mb-px'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          {tab.label}
        </Link>
      ))}
    </div>
  )
}
