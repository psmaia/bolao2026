'use client'
import { useState } from 'react'
import { createClient } from '@/lib/supabase'
import toast from 'react-hot-toast'
import type { Database } from '@/lib/database.types'
import { formatMatchDate, getUserTimezone, countryCode } from '@/lib/utils'
import { stageLabel } from '@/lib/i18n'
import { useRouter } from 'next/navigation'

type Match = Database['public']['Tables']['matches']['Row']

export default function AdminMatchList({ matches }: { matches: Match[] }) {
  const [editing, setEditing] = useState<string | null>(null)
  const [form, setForm] = useState<Record<string, string | number>>({})
  const [saving, setSaving] = useState(false)
  const supabase = createClient() as any
  const router = useRouter()
  const timezone = getUserTimezone()

  const startEdit = (match: Match) => {
    setEditing(match.id)
    setForm({ home_team: match.home_team, away_team: match.away_team, home_flag: match.home_flag || '', away_flag: match.away_flag || '', home_score: match.home_score ?? '', away_score: match.away_score ?? '', status: match.status ?? 'scheduled' })
  }

  const saveMatch = async (matchId: string) => {
    setSaving(true)
    const hasScore = form.home_score !== '' && form.away_score !== ''
    const update: any = { home_team: form.home_team, away_team: form.away_team, home_flag: form.home_flag || null, away_flag: form.away_flag || null, status: form.status, updated_at: new Date().toISOString() }
    if (hasScore) { update.home_score = Number(form.home_score); update.away_score = Number(form.away_score) }
    const { error } = await supabase.from('matches').update(update).eq('id', matchId)
    if (error) { toast.error('Erro ao salvar'); setSaving(false); return }
    if (form.status === 'finished' && hasScore) {
      const { error: calcError } = await supabase.rpc('calculate_points', { match_uuid: matchId })
      if (calcError) toast.error('Erro ao calcular pontos: ' + calcError.message)
      else toast.success('Resultado salvo e pontos calculados!')
    } else toast.success('Jogo atualizado!')
    setEditing(null); setSaving(false); router.refresh()
  }

  return (
    <div className="flex flex-col gap-2">
      {matches.map(match => {
        const { date, time } = formatMatchDate(match.match_date, timezone)
        const isEditing = editing === match.id
        return (
          <div key={match.id} className="card">
            {isEditing ? (
              <div className="flex flex-col gap-3">
                <div className="flex gap-2 flex-wrap">
                  <div className="flex gap-1 flex-1 min-w-40">
                    <input className="input w-14" placeholder="🏳️" value={form.home_flag} onChange={e => setForm(f => ({...f, home_flag: e.target.value}))} />
                    <input className="input flex-1" placeholder="Time da casa" value={form.home_team} onChange={e => setForm(f => ({...f, home_team: e.target.value}))} />
                  </div>
                  <span className="flex items-center text-gray-400 font-bold">×</span>
                  <div className="flex gap-1 flex-1 min-w-40">
                    <input className="input flex-1" placeholder="Time visitante" value={form.away_team} onChange={e => setForm(f => ({...f, away_team: e.target.value}))} />
                    <input className="input w-14" placeholder="🏳️" value={form.away_flag} onChange={e => setForm(f => ({...f, away_flag: e.target.value}))} />
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <label className="text-sm font-medium text-gray-700">Placar:</label>
                  <input type="number" min="0" max="30" className="input w-16 text-center" placeholder="0" value={form.home_score} onChange={e => setForm(f => ({...f, home_score: e.target.value}))} />
                  <span className="text-gray-400">×</span>
                  <input type="number" min="0" max="30" className="input w-16 text-center" placeholder="0" value={form.away_score} onChange={e => setForm(f => ({...f, away_score: e.target.value}))} />
                  <label className="text-sm font-medium text-gray-700 ml-2">Status:</label>
                  <select className="input w-36" value={form.status} onChange={e => setForm(f => ({...f, status: e.target.value}))}>
                    <option value="scheduled">Agendado</option>
                    <option value="live">Ao vivo</option>
                    <option value="finished">Encerrado</option>
                    <option value="cancelled">Cancelado</option>
                  </select>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => saveMatch(match.id)} disabled={saving} className="btn-primary text-sm">{saving ? 'Salvando...' : 'Salvar'}</button>
                  <button onClick={() => setEditing(null)} className="btn-secondary text-sm">Cancelar</button>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <div className="text-xs text-gray-400 w-20 flex-shrink-0"><p>{date}</p><p className="font-bold text-brand-blue">{time}</p></div>
                <div className="flex-1 flex items-center gap-2 text-sm">
                  <span>{match.home_flag || '🏳️'}</span><span className="font-medium">{match.home_team}</span>{countryCode(match.home_team) && <span className="text-[10px] font-semibold text-gray-400">({countryCode(match.home_team)})</span>}
                  {match.home_score !== null ? <span className="font-bold mx-1">{match.home_score} × {match.away_score}</span> : <span className="text-gray-300 mx-1">×</span>}
                  {countryCode(match.away_team) && <span className="text-[10px] font-semibold text-gray-400">({countryCode(match.away_team)})</span>}<span className="font-medium">{match.away_team}</span><span>{match.away_flag || '🏳️'}</span>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${match.status === 'finished' ? 'bg-green-100 text-green-700' : match.status === 'live' ? 'bg-red-100 text-red-700 animate-pulse' : 'bg-gray-100 text-gray-500'}`}>{match.status}</span>
                  <button onClick={() => startEdit(match)} className="btn-secondary text-xs py-1 px-2">Editar</button>
                </div>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
