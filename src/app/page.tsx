import { createServerSupabaseClient } from '@/lib/supabase'
import MatchSchedule from '@/components/MatchSchedule'

export const revalidate = 60 // revalida a cada 60s

export default async function HomePage() {
  const supabase = await createServerSupabaseClient()

  const { data: matches } = await supabase
    .from('matches')
    .select('*')
    .order('match_date', { ascending: true })

  return (
    <div>
      {/* Hero */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-brand-blue mb-2">
          ⚽ Copa do Mundo 2026
        </h1>
        <p className="text-gray-600">
          Agenda completa · Horários no seu fuso · Bolão com amigos
        </p>
      </div>

      <MatchSchedule matches={matches || []} />
    </div>
  )
}
