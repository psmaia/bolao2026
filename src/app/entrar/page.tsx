'use client'
import { useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import toast from 'react-hot-toast'
import { Suspense } from 'react'
import { useLocale } from '@/contexts/LocaleContext'

function EntrarForm() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const grupoParam = searchParams.get('grupo')
  const [code, setCode] = useState(grupoParam && grupoParam !== 'undefined' ? grupoParam : '')
  const [loading, setLoading] = useState(false)
  const supabase = createClient() as any
  const { t } = useLocale()

  const joinGroup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { router.push(`/login`); return }

    const { data: group } = await supabase
      .from('groups').select('id, name').eq('invite_code', code.toUpperCase().trim()).single()

    if (!group) { toast.error(t('entrar.errorCode')); setLoading(false); return }

    const { data: existing } = await supabase
      .from('group_members').select('id').eq('group_id', group.id).eq('user_id', user.id).single()

    if (existing) { router.push(`/grupos/${group.id}`); return }

    const { error } = await supabase.from('group_members')
      .insert({ group_id: group.id, user_id: user.id, role: 'member' })

    if (error) toast.error(t('entrar.errorJoin'))
    else { toast.success(t('entrar.welcome', { name: group.name })); router.push(`/grupos/${group.id}`) }
    setLoading(false)
  }

  return (
    <div className="max-w-sm mx-auto mt-16">
      <div className="card text-center">
        <div className="text-4xl mb-4">🏆</div>
        <h1 className="text-xl font-bold text-brand-blue mb-2">{t('entrar.title')}</h1>
        <p className="text-gray-500 text-sm mb-6">{t('entrar.subtitle')}</p>
        <form onSubmit={joinGroup} className="flex flex-col gap-3">
          <input className="input text-center text-xl font-mono tracking-widest uppercase"
            value={code} onChange={e => setCode(e.target.value.toUpperCase())}
            placeholder="ABCD1234" maxLength={8} required />
          <button type="submit" disabled={loading || code.length < 6} className="btn-primary">
            {loading ? t('entrar.loading') : t('entrar.button')}
          </button>
        </form>
      </div>
    </div>
  )
}

export default function EntrarPage() {
  return <Suspense><EntrarForm /></Suspense>
}
