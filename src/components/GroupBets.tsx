'use client'
import { useState, useMemo } from 'react'
import { createClient } from '@/lib/supabase'
import toast from 'react-hot-toast'
import type { Database } from '@/lib/database.types'
import { formatMatchDate, getUserTimezone, countryCode } from '@/lib/utils'
import { useLocale } from '@/contexts/LocaleContext'
import TeamFlag from '@/components/TeamFlag'

type Match = Database['public']['Tables']['matches']['Row']
type Bet = Database['public']['Tables']['bets']['Row']

interface Props {
  matches: Match[]
  betsMap: Record<string, Bet>
  groupId: string
  userId: string
  isOwner?: boolean
  memberCount?: number
  betCountByMatch?: Record<string, number>
}

export default function GroupBets({ matches, betsMap: initialBets, groupId, userId, isOwner, memberCount, betCountByMatch }: Props) {
  const [bets, setBets] = useState<Record<string, Bet>>(initialBets)
  const [saving, setSaving] = useState<string | null>(null)
  const supabase = createClient() as any
  const timezone = getUserTimezone()
  const { locale, t } = useLocale()
  const now = new Date()

  const upcoming = useMemo(() => matches.filter(m => new Date(m.match_date) > now && m.status === 'scheduled'), [matches])
  const past = useMemo(() => matches.filter(m => new Date(m.match_date) <= now || m.status !== 'scheduled'), [matches])

  const pending = useMemo(() => upcoming.filter(m => !bets[m.id]), [upcoming, bets])
  const pendingSoon = useMemo(() => {
    const in48h = new Date(now.getTime() + 48 * 60 * 60 * 1000)
    return pending.filter(m => new Date(m.match_date) <= in48h)
  }, [pending])

  const saveBet = async (matchId: string, home: number, away: number) => {
    setSaving(matchId)
    const existing = bets[matchId]
    if (existing) {
      const { error } = await supabase.from('bets').update({ home_score_bet: home, away_score_bet: away }).eq('id', existing.id)
      if (error) { toast.error(t('bets.errorSave')); setSaving(null); return }
      setBets(prev => ({ ...prev, [matchId]: { ...existing, home_score_bet: home, away_score_bet: away } }))
    } else {
      const { data, error } = await supabase.from('bets')
        .insert({ group_id: groupId, user_id: userId, match_id: matchId, home_score_bet: home, away_score_bet: away }).select().single()
      if (error || !data) { toast.error(t('bets.errorSave')); setSaving(null); return }
      setBets(prev => ({ ...prev, [matchId]: data }))
    }
    toast.success(t('bets.saved')); setSaving(null)
  }

  return (
    <div>
      {upcoming.length === 0 && <p className="text-gray-400 text-sm text-center py-8">{t('bets.noneAvailable')}</p>}
      {upcoming.length > 0 && (
        <div className="flex flex-col gap-3 mb-8">
          <p className="text-xs text-gray-400">{t('bets.closeInfo', { tz: timezone })}</p>
          {pending.length > 0 && (
            <div className={`rounded-lg px-4 py-3 text-sm flex items-center gap-2 ${pendingSoon.length > 0 ? 'bg-amber-50 text-amber-800 border border-amber-200' : 'bg-gray-50 text-gray-600 border border-gray-200'}`}>
              <span>{pendingSoon.length > 0 ? '⏰' : '📝'}</span>
              <span>
                {pendingSoon.length > 0
                  ? <>{t('bets.urgentWarning', {
                      count: pendingSoon.length,
                      game: t(pendingSoon.length === 1 ? 'bets.game' : 'bets.games'),
                      extra: pending.length > pendingSoon.length ? t('bets.andMore', { count: pending.length - pendingSoon.length }) : '',
                    })}</>
                  : <>{t('bets.normalWarning', { count: pending.length, games: t(pending.length === 1 ? 'bets.gameSimple' : 'bets.gamesSimple') })}</>}
              </span>
            </div>
          )}
          {upcoming.map(match => (
            <BetRow
              key={match.id}
              match={match}
              bet={bets[match.id]}
              saving={saving === match.id}
              onSave={(h, a) => saveBet(match.id, h, a)}
              timezone={timezone}
              ownerInfo={isOwner && memberCount ? { betCount: betCountByMatch?.[match.id] || 0, memberCount } : undefined}
            />
          ))}
        </div>
      )}
      {past.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">{t('bets.finishedGames')}</h3>
          <div className="flex flex-col gap-2">
            {past.map(match => <PastBetRow key={match.id} match={match} bet={bets[match.id]} timezone={timezone} />)}
          </div>
        </div>
      )}
    </div>
  )
}

function BetRow({ match, bet, saving, onSave, timezone, ownerInfo }: { match: Match; bet?: Bet; saving: boolean; onSave: (h: number, a: number) => void; timezone: string; ownerInfo?: { betCount: number; memberCount: number } }) {
  const { locale, t } = useLocale()
  const { date, time } = formatMatchDate(match.match_date, timezone, locale)
  const [home, setHome] = useState<number | ''>(bet?.home_score_bet ?? '')
  const [away, setAway] = useState<number | ''>(bet?.away_score_bet ?? '')
  return (
    <div className={`card flex flex-col sm:flex-row items-center gap-4 ${!bet ? 'ring-1 ring-amber-200' : ''}`}>
      <div className="text-center w-20 flex-shrink-0">
        <p className="text-sm font-bold text-brand-blue">{time}</p>
        <p className="text-xs text-gray-400">{date}</p>
        {!bet && <p className="text-[10px] font-semibold text-amber-600 mt-1">{t('bets.noBet')}</p>}
        {ownerInfo && (
          <p className={`text-[10px] font-semibold mt-1 ${ownerInfo.betCount < ownerInfo.memberCount ? 'text-amber-600' : 'text-brand-green'}`}>
            {t('bets.betCount', { betCount: ownerInfo.betCount, memberCount: ownerInfo.memberCount })}
          </p>
        )}
      </div>
      <div className="flex-1 flex items-center justify-center gap-3">
        <div className="text-center w-24"><TeamFlag emoji={match.home_flag} size="md" /><p className="text-xs font-medium mt-1 truncate">{match.home_team}</p>{countryCode(match.home_team) && <p className="text-[10px] font-semibold text-gray-400 tracking-wider">{countryCode(match.home_team)}</p>}</div>
        <div className="flex items-center gap-1">
          <input type="number" min="0" max="20" value={home} onChange={e => setHome(e.target.value === '' ? '' : Number(e.target.value))} className="w-12 text-center text-lg font-bold border-2 border-gray-200 rounded-lg p-1 focus:border-brand-green focus:outline-none" />
          <span className="text-gray-300 font-bold">×</span>
          <input type="number" min="0" max="20" value={away} onChange={e => setAway(e.target.value === '' ? '' : Number(e.target.value))} className="w-12 text-center text-lg font-bold border-2 border-gray-200 rounded-lg p-1 focus:border-brand-green focus:outline-none" />
        </div>
        <div className="text-center w-24"><TeamFlag emoji={match.away_flag} size="md" /><p className="text-xs font-medium mt-1 truncate">{match.away_team}</p>{countryCode(match.away_team) && <p className="text-[10px] font-semibold text-gray-400 tracking-wider">{countryCode(match.away_team)}</p>}</div>
      </div>
      <button onClick={() => onSave(Number(home), Number(away))} disabled={saving || home === '' || away === ''} className="btn-primary text-sm px-3 py-1.5 flex-shrink-0">
        {saving ? '...' : bet ? t('bets.update') : t('bets.bet')}
      </button>
    </div>
  )
}

function PastBetRow({ match, bet, timezone }: { match: Match; bet?: Bet; timezone: string }) {
  const { locale, t } = useLocale()
  const { date } = formatMatchDate(match.match_date, timezone, locale)
  const isFinished = match.status === 'finished'
  const pts = bet?.points_earned ?? 0
  const emoji = bet ? (pts >= 10 ? '🎯' : pts >= 5 ? '✅' : pts >= 3 ? '🤝' : '❌') : null
  return (
    <div className="card flex items-center gap-4 opacity-80">
      <div className="text-xs text-gray-400 w-16 flex-shrink-0">{date}</div>
      <div className="flex-1 flex items-center justify-center gap-2 text-sm">
        <TeamFlag emoji={match.home_flag} size="sm" /><span className="font-medium text-xs">{match.home_team}</span>{countryCode(match.home_team) && <span className="text-[10px] font-semibold text-gray-400">({countryCode(match.home_team)})</span>}
        {isFinished ? <span className="font-bold mx-1">{match.home_score} × {match.away_score}</span> : <span className="text-gray-300 mx-1">×</span>}
        {countryCode(match.away_team) && <span className="text-[10px] font-semibold text-gray-400">({countryCode(match.away_team)})</span>}<span className="font-medium text-xs">{match.away_team}</span><TeamFlag emoji={match.away_flag} size="sm" />
      </div>
      {bet ? (
        <div className="text-xs text-right flex-shrink-0">
          <p className="text-gray-500">{t('bets.yourBet')} <span className="font-bold">{bet.home_score_bet} × {bet.away_score_bet}</span></p>
          {isFinished && <p className="font-bold text-brand-green">{emoji} {bet.points_earned} {t('bets.pts')}</p>}
        </div>
      ) : <p className="text-xs text-gray-300 flex-shrink-0">{t('bets.noBetShort')}</p>}
    </div>
  )
}
