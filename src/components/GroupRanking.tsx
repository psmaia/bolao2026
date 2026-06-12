'use client'

import { useLocale } from '@/contexts/LocaleContext'
import ShareResultCard from './ShareResultCard'

interface RankingRow { user_id: string; nickname: string; name: string; total_points: number; exact_count: number; winner_count: number; bets_count: number; avatar_url?: string | null }

function Avatar({ url, name }: { url?: string | null; name: string }) {
  const initials = (name || '?').slice(0, 2).toUpperCase()
  if (url) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={url} alt={name} className="w-8 h-8 rounded-full object-cover flex-shrink-0 border border-gray-200" />
  }
  return <span className="w-8 h-8 rounded-full flex-shrink-0 bg-brand-blue text-white text-xs font-bold flex items-center justify-center">{initials}</span>
}

export default function GroupRanking({ ranking, currentUserId, groupName }: { ranking: RankingRow[]; currentUserId: string; groupName?: string }) {
  const { t } = useLocale()
  if (!ranking || ranking.length === 0) return <p className="text-gray-400 text-sm text-center py-8">{t('ranking.empty')}</p>
  const medals = ['🥇', '🥈', '🥉']
  const myIndex = ranking.findIndex(r => r.user_id === currentUserId)
  const me = myIndex >= 0 ? ranking[myIndex] : null

  return (
    <div className="flex flex-col gap-3">
      {me && groupName && (
        <div className="card flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-sm text-gray-600">
            {t('ranking.position', { pos: myIndex + 1, pts: me.total_points })}
          </p>
          <ShareResultCard
            nickname={me.nickname}
            name={me.name}
            avatarUrl={me.avatar_url}
            position={myIndex + 1}
            totalPoints={me.total_points}
            groupName={groupName}
          />
        </div>
      )}
      <div className="card overflow-hidden p-0">
      <table className="w-full text-sm">
        <thead className="bg-brand-blue text-white text-xs uppercase tracking-wider">
          <tr>
            <th className="text-left px-4 py-3 w-8">#</th>
            <th className="text-left px-4 py-3">{t('ranking.colPlayer')}</th>
            <th className="text-center px-2 py-3">🎯</th>
            <th className="text-center px-2 py-3">✅</th>
            <th className="text-center px-2 py-3">{t('ranking.colBets')}</th>
            <th className="text-right px-4 py-3">{t('ranking.colPts')}</th>
          </tr>
        </thead>
        <tbody>
          {ranking.map((row, i) => (
            <tr key={row.user_id} className={`border-t border-gray-100 ${row.user_id === currentUserId ? 'bg-brand-yellow/10' : i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
              <td className="px-4 py-3 font-bold text-gray-500">{medals[i] || i + 1}</td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                  <Avatar url={row.avatar_url} name={row.nickname || row.name} />
                  <div><p className="font-semibold">{row.nickname}</p><p className="text-xs text-gray-400">{row.name}</p></div>
                </div>
              </td>
              <td className="text-center px-2 py-3 text-gray-600">{row.exact_count}</td>
              <td className="text-center px-2 py-3 text-gray-600">{row.winner_count}</td>
              <td className="text-center px-2 py-3 text-gray-400">{row.bets_count}</td>
              <td className="text-right px-4 py-3 font-bold text-brand-green text-base">{row.total_points}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  )
}
