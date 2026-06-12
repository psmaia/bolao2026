'use client'

import { useLocale } from '@/contexts/LocaleContext'
import { formatShortDate } from '@/lib/utils'
import type { Locale } from '@/lib/i18n'

interface MemberRow {
  user_id: string
  role: string
  joined_at: string
  profiles: { name: string; nickname: string; avatar_url: string | null } | { name: string; nickname: string; avatar_url: string | null }[] | null
}

function getProfile(p: MemberRow['profiles']) {
  if (!p) return null
  return Array.isArray(p) ? p[0] ?? null : p
}

function Avatar({ url, name }: { url?: string | null; name: string }) {
  const initials = (name || '?').slice(0, 2).toUpperCase()
  if (url) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={url} alt={name} className="w-9 h-9 rounded-full object-cover flex-shrink-0 border border-gray-200" />
  }
  return <span className="w-9 h-9 rounded-full flex-shrink-0 bg-brand-blue text-white text-xs font-bold flex items-center justify-center">{initials}</span>
}

function formatJoinedAt(value: string, locale: Locale) {
  try {
    return formatShortDate(value, locale)
  } catch {
    return ''
  }
}

export default function GroupMembers({ members, currentUserId }: { members: MemberRow[]; currentUserId: string }) {
  const { locale, t } = useLocale()
  if (!members || members.length === 0) {
    return <p className="text-gray-400 text-sm text-center py-8">{t('members.empty')}</p>
  }

  const sorted = [...members].sort((a, b) => {
    if (a.role === 'owner' && b.role !== 'owner') return -1
    if (b.role === 'owner' && a.role !== 'owner') return 1
    return new Date(a.joined_at).getTime() - new Date(b.joined_at).getTime()
  })

  return (
    <div className="card p-0 overflow-hidden">
      <div className="flex flex-col divide-y divide-gray-100">
        {sorted.map(m => {
          const profile = getProfile(m.profiles)
          const name = profile?.nickname || profile?.name || t('members.defaultPlayer')
          return (
            <div key={m.user_id} className={`flex items-center gap-3 px-4 py-3 ${m.user_id === currentUserId ? 'bg-brand-yellow/10' : ''}`}>
              <Avatar url={profile?.avatar_url} name={name} />
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm truncate">
                  {name}
                  {m.user_id === currentUserId && <span className="text-xs text-gray-400 font-normal">{t('members.you')}</span>}
                </p>
                {profile?.name && profile?.nickname && profile.name !== profile.nickname && (
                  <p className="text-xs text-gray-400 truncate">{profile.name}</p>
                )}
              </div>
              <div className="text-right flex-shrink-0">
                {m.role === 'owner' ? (
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-brand-yellow bg-brand-blue px-2 py-0.5 rounded-full">{t('members.owner')}</span>
                ) : (
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">{t('members.member')}</span>
                )}
                <p className="text-[10px] text-gray-400 mt-1">{t('members.since', { date: formatJoinedAt(m.joined_at, locale) })}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
