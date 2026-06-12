'use client'

import Link from 'next/link'
import { useLocale } from '@/contexts/LocaleContext'
import GroupRanking from '@/components/GroupRanking'

interface RankingRow { user_id: string; nickname: string; name: string; total_points: number; exact_count: number; winner_count: number; bets_count: number; avatar_url?: string | null }

interface Props {
  groupId: string
  groupName: string
  ranking: RankingRow[]
  currentUserId: string
}

export default function RankingHeader({ groupId, groupName, ranking, currentUserId }: Props) {
  const { t } = useLocale()

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <Link href={`/grupos/${groupId}`} className="text-gray-400 hover:text-brand-blue transition-colors">
          {t('ranking.back')}
        </Link>
        <h1 className="text-2xl font-bold text-brand-blue">
          {t('ranking.title', { group: groupName })}
        </h1>
      </div>

      <div className="card mb-4 text-xs text-gray-500">
        <div className="flex gap-6">
          <span>{t('group.exactScore')} <b className="text-brand-green">10 {t('bets.pts')}</b></span>
          <span>{t('group.winner')} <b className="text-brand-green">5 {t('bets.pts')}</b></span>
          <span>{t('group.draw')} <b className="text-brand-green">3 {t('bets.pts')}</b></span>
        </div>
      </div>

      <GroupRanking ranking={ranking} currentUserId={currentUserId} groupName={groupName} />
    </div>
  )
}
