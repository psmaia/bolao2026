'use client'
import { useState, useMemo } from 'react'
import type { Database } from '@/lib/database.types'
import { formatMatchDate, formatLongDate, getUserTimezone, countryCode } from '@/lib/utils'
import { stageLabel } from '@/lib/i18n'
import { useLocale } from '@/contexts/LocaleContext'
import TeamFlag from '@/components/TeamFlag'

type Match = Database['public']['Tables']['matches']['Row']
const STAGES = ['all', 'group', 'r32', 'r16', 'qf', 'sf', '3rd', 'final']
const GROUPS = ['A','B','C','D','E','F','G','H','I','J','K','L']

export default function MatchSchedule({ matches }: { matches: Match[] }) {
  const [stageFilter, setStageFilter] = useState('all')
  const [groupFilter, setGroupFilter] = useState('all')
  const timezone = getUserTimezone()
  const { locale, t } = useLocale()

  const filtered = useMemo(() => matches.filter(m => {
    if (stageFilter !== 'all' && m.stage !== stageFilter) return false
    if (groupFilter !== 'all' && m.group_name !== groupFilter) return false
    return true
  }), [matches, stageFilter, groupFilter])

  const grouped = useMemo(() => {
    const map = new Map<string, Match[]>()
    for (const m of filtered) {
      const key = formatLongDate(m.match_date, locale, timezone)
      if (!map.has(key)) map.set(key, [])
      map.get(key)!.push(m)
    }
    return map
  }, [filtered, timezone, locale])

  return (
    <div>
      <div className="flex flex-wrap gap-1 mb-4">
        {STAGES.map(s => (
          <button key={s} onClick={() => { setStageFilter(s); setGroupFilter('all') }}
            className={`px-3 py-1 text-xs rounded-full font-medium border transition-colors ${stageFilter === s ? 'bg-brand-blue text-white border-brand-blue' : 'bg-white text-gray-600 border-gray-200 hover:border-brand-blue'}`}>
            {s === 'all' ? t('home.stageAll') : stageLabel(s, locale)}
          </button>
        ))}
      </div>
      {stageFilter === 'group' && (
        <div className="flex flex-wrap gap-1 mb-4">
          <button onClick={() => setGroupFilter('all')} className={`px-3 py-1 text-xs rounded-full font-medium border transition-colors ${groupFilter === 'all' ? 'bg-brand-green text-white border-brand-green' : 'bg-white text-gray-600 border-gray-200'}`}>{t('home.stageAll')}</button>
          {GROUPS.map(g => (
            <button key={g} onClick={() => setGroupFilter(g)} className={`px-3 py-1 text-xs rounded-full font-medium border transition-colors ${groupFilter === g ? 'bg-brand-green text-white border-brand-green' : 'bg-white text-gray-600 border-gray-200'}`}>{t('home.groupLabel', { g })}</button>
          ))}
        </div>
      )}
      <p className="text-xs text-gray-400 mb-4">{t('home.timezoneLabel')} <span className="font-medium text-gray-600">{timezone}</span></p>
      {[...grouped.entries()].map(([dateKey, dayMatches]) => (
        <div key={dateKey} className="mb-8">
          <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3 capitalize">{dateKey}</h2>
          <div className="flex flex-col gap-3">
            {dayMatches.map(match => <MatchCard key={match.id} match={match} timezone={timezone} />)}
          </div>
        </div>
      ))}
    </div>
  )
}

function MatchCard({ match, timezone }: { match: Match; timezone: string }) {
  const { locale, t } = useLocale()
  const { time, relative } = formatMatchDate(match.match_date, timezone, locale)
  const isFinished = match.status === 'finished'
  const isLive = match.status === 'live'
  return (
    <div className={`card flex flex-col sm:flex-row items-center gap-4 ${isLive ? 'ring-2 ring-red-500' : ''}`}>
      <div className="w-20 text-center flex-shrink-0">
        {isLive ? <span className="text-xs font-bold text-red-600 animate-pulse">{t('home.live')}</span>
          : isFinished ? <span className="text-xs text-gray-400">{t('home.finished')}</span>
          : <><p className="text-lg font-bold text-brand-blue">{time}</p>{relative && <p className="text-xs text-gray-400">{relative}</p>}</>}
      </div>
      <div className="flex-1 flex items-center justify-center gap-4">
        <div className="flex flex-col items-center gap-1 w-28">
          <TeamFlag emoji={match.home_flag} size="lg" />
          <span className="text-sm font-medium text-center truncate w-full text-center">{match.home_team}</span>
          {countryCode(match.home_team) && <span className="text-[10px] font-semibold text-gray-400 tracking-wider">{countryCode(match.home_team)}</span>}
        </div>
        <div className="text-center flex-shrink-0">
          {isFinished || isLive
            ? <div className="flex items-center gap-2"><span className="text-2xl font-bold text-brand-blue w-8 text-center">{match.home_score ?? '?'}</span><span className="text-gray-400">×</span><span className="text-2xl font-bold text-brand-blue w-8 text-center">{match.away_score ?? '?'}</span></div>
            : <span className="text-lg font-bold text-gray-300">×</span>}
          <p className="text-xs text-gray-400 mt-1">{match.group_name ? t('home.groupLabel', { g: match.group_name }) : stageLabel(match.stage, locale)}</p>
        </div>
        <div className="flex flex-col items-center gap-1 w-28">
          <TeamFlag emoji={match.away_flag} size="lg" />
          <span className="text-sm font-medium text-center truncate w-full text-center">{match.away_team}</span>
          {countryCode(match.away_team) && <span className="text-[10px] font-semibold text-gray-400 tracking-wider">{countryCode(match.away_team)}</span>}
        </div>
      </div>
      <div className="text-right flex-shrink-0 text-xs text-gray-400 hidden sm:block w-32">
        <p>{match.venue}</p><p>{match.city}</p>
      </div>
    </div>
  )
}
