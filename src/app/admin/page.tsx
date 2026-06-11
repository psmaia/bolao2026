import { redirect } from 'next/navigation'
import { createServerSupabaseClient } from '@/lib/supabase'
import AdminMatchList from '@/components/AdminMatchList'

export default async function AdminPage() {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('is_admin')
    .eq('id', user.id)
    .single()

  if (!profile?.is_admin) redirect('/')

  const { data: matches } = await supabase
    .from('matches')
    .select('*')
    .order('match_date', { ascending: true })

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-brand-blue">
          🔧 Painel Admin
        </h1>
        <span className="text-xs bg-brand-yellow text-brand-blue font-bold px-2 py-1 rounded">
          ADMIN
        </span>
      </div>

      <div className="card mb-4 bg-yellow-50 border-yellow-200">
        <p className="text-sm text-yellow-800">
          <strong>Como atualizar um resultado:</strong> Clique em "Editar" no jogo, insira o placar e salve.
          Os pontos são calculados automaticamente para todos os grupos.
        </p>
      </div>

      <AdminMatchList matches={matches || []} />
    </div>
  )
}
