export const dynamic = 'force-dynamic'

import { createServerSupabaseClient } from '@/lib/supabase-server'
import MatchSchedule from '@/components/MatchSchedule'
import HomeHeader from '@/components/HomeHeader'

export const revalidate = 60

export default async function HomePage() {
  const supabase = await createServerSupabaseClient() as any
  const { data: matches } = await supabase
    .from('matches').select('*').order('match_date', { ascending: true })

  return (
    <div>
      <HomeHeader />
      <MatchSchedule matches={matches || []} />
    </div>
  )
}
