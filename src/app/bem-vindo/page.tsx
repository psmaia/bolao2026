'use client'
import { useSearchParams, useRouter } from 'next/navigation'
import { Suspense, useState } from 'react'
import { createClient } from '@/lib/supabase'
import toast from 'react-hot-toast'
import { useLocale } from '@/contexts/LocaleContext'

function BemVindoContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const next = searchParams.get('next') || '/'
  const supabase = createClient()
  const { t } = useLocale()

  const [accepted, setAccepted] = useState(false)
  const [optIn, setOptIn] = useState(false)
  const [saving, setSaving] = useState(false)

  const handleContinue = async () => {
    if (!accepted) return
    setSaving(true)
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      const { error } = await (supabase as any)
        .from('profiles')
        .update({ terms_accepted_at: new Date().toISOString(), marketing_opt_in: optIn })
        .eq('id', user.id)
      if (error) {
        // Não bloqueia o acesso por causa disso — só avisa
        toast.error(t('welcome.errorSave'))
      }
    }
    setSaving(false)
    router.push(next)
  }

  return (
    <div className="max-w-lg mx-auto mt-12">
      <div className="card">
        <div className="text-4xl text-center mb-4">⚽🎉</div>
        <h1 className="text-xl font-bold text-brand-blue mb-2 text-center">{t('welcome.title')}</h1>
        <p className="text-gray-500 text-sm mb-6 text-center">{t('welcome.subtitle')}</p>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-sm text-gray-600 flex flex-col gap-3 mb-6">
          <p dangerouslySetInnerHTML={{ __html: t('welcome.p1') }} />
          <p dangerouslySetInnerHTML={{ __html: t('welcome.p2') }} />
          <p dangerouslySetInnerHTML={{ __html: t('welcome.p3') }} />
        </div>

        <div className="flex flex-col gap-3 mb-6">
          <label className="flex items-start gap-2.5 text-sm text-gray-700 cursor-pointer">
            <input
              type="checkbox"
              checked={accepted}
              onChange={e => setAccepted(e.target.checked)}
              className="mt-0.5 w-4 h-4 accent-brand-blue flex-shrink-0"
            />
            <span dangerouslySetInnerHTML={{ __html: t('welcome.acceptLabel') }} />
          </label>

          <label className="flex items-start gap-2.5 text-sm text-gray-500 cursor-pointer">
            <input
              type="checkbox"
              checked={optIn}
              onChange={e => setOptIn(e.target.checked)}
              className="mt-0.5 w-4 h-4 accent-brand-blue flex-shrink-0"
            />
            <span>{t('welcome.optInLabel')}</span>
          </label>
        </div>

        <button onClick={handleContinue} disabled={!accepted || saving} className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed">
          {saving ? t('welcome.saving') : t('welcome.continue')}
        </button>
        {!accepted && <p className="text-xs text-gray-400 text-center mt-2">{t('welcome.hint')}</p>}
      </div>
    </div>
  )
}

export default function BemVindoPage() {
  return <Suspense><BemVindoContent /></Suspense>
}
