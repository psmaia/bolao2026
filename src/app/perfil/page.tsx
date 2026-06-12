export const dynamic = 'force-dynamic'

import { redirect } from 'next/navigation'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import PerfilForm from '@/components/PerfilForm'

export default async function PerfilPage() {
  const supabase = await createServerSupabaseClient() as any
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  if (!profile) redirect('/')

  return (
    <div className="max-w-md mx-auto mt-8">
      <PerfilForm profile={profile} />
    </div>
  )
}
