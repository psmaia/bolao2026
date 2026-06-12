'use client'

import Link from 'next/link'
import { useLocale } from '@/contexts/LocaleContext'
import CreateGroupButton from '@/components/CreateGroupButton'

interface Invite {
  id: string
  group_id: string
  invited_by: string
  created_at: string
  groups: { name: string; invite_code: string } | { name: string; invite_code: string }[] | null
}

interface Membership {
  role: string
  joined_at: string
  groups: { id: string; name: string; description: string | null; invite_code: string; owner_id: string } | { id: string; name: string; description: string | null; invite_code: string; owner_id: string }[] | null
}

function one<T>(v: T | T[] | null): T | null {
  if (!v) return null
  return Array.isArray(v) ? v[0] ?? null : v
}

export default function GroupsList({ memberships, invites, userId }: { memberships: Membership[]; invites: Invite[]; userId: string }) {
  const { t } = useLocale()

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-brand-blue">{t('groups.title')}</h1>
        <div className="flex gap-2">
          <a href="/entrar" className="btn-secondary text-sm">{t('groups.haveCode')}</a>
          <CreateGroupButton userId={userId} />
        </div>
      </div>

      {invites && invites.length > 0 && (
        <div className="mb-6">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
            {t('groups.pendingInvites', { count: invites.length })}
          </h2>
          <div className="flex flex-col gap-2">
            {invites.map(inv => {
              const group = one(inv.groups)
              return (
                <div key={inv.id} className="card border-brand-yellow border-2 flex items-center justify-between">
                  <p className="font-medium">
                    {t('groups.inviteFor')}{' '}
                    <span className="text-brand-blue font-bold">{group?.name || t('groups.defaultGroup')}</span>
                  </p>
                  {group?.invite_code ? (
                    <Link href={`/entrar?grupo=${group.invite_code}`} className="btn-primary text-sm py-1">{t('groups.viewGroup')}</Link>
                  ) : (
                    <Link href="/entrar" className="btn-secondary text-sm py-1">{t('groups.haveCode')}</Link>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )}

      {memberships && memberships.length > 0 ? (() => {
        const owned = memberships.filter(m => m.role === 'owner').map(m => ({ m, group: one(m.groups) })).filter(x => x.group)
        const joined = memberships.filter(m => m.role !== 'owner').map(m => ({ m, group: one(m.groups) })).filter(x => x.group)

        const GroupCard = ({ m, group }: { m: Membership; group: NonNullable<ReturnType<typeof one<typeof m.groups>>> }) => (
          <Link href={`/grupos/${(group as any).id}`}
            className="card hover:shadow-md transition-shadow flex items-center justify-between">
            <div>
              <p className="font-semibold text-brand-blue">{(group as any).name}</p>
              {(group as any).description && <p className="text-sm text-gray-500">{(group as any).description}</p>}
            </div>
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        )

        return (
          <div className="flex flex-col gap-6">
            {owned.length > 0 && (
              <div>
                <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">🏠 Meus grupos ({owned.length})</h2>
                <div className="flex flex-col gap-3">
                  {owned.map(({ m, group }) => <GroupCard key={(group as any).id} m={m} group={group as any} />)}
                </div>
              </div>
            )}
            {joined.length > 0 && (
              <div>
                <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">👥 Participando ({joined.length})</h2>
                <div className="flex flex-col gap-3">
                  {joined.map(({ m, group }) => <GroupCard key={(group as any).id} m={m} group={group as any} />)}
                </div>
              </div>
            )}
          </div>
        )
      })() : (
        <div className="card text-center py-12 text-gray-500">
          <p className="text-4xl mb-3">🏆</p>
          <p className="font-medium mb-1">{t('groups.emptyTitle')}</p>
          <p className="text-sm">{t('groups.emptySubtitle')}</p>
        </div>
      )}
    </div>
  )
}
