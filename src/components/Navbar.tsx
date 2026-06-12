'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase'
import type { User } from '@supabase/supabase-js'
import { useLocale } from '@/contexts/LocaleContext'
import { LOCALES } from '@/lib/i18n'

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null)
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)
  const [open, setOpen] = useState(false)
  const supabase = createClient() as any
  const { locale, setLocale, t } = useLocale()

  const LangSwitch = ({ compact }: { compact?: boolean }) => (
    <div className={`flex items-center gap-1 ${compact ? '' : 'ml-1'}`} title={t('lang.toggle')}>
      {LOCALES.map(l => (
        <button
          key={l.code}
          onClick={() => setLocale(l.code)}
          className={`text-xs px-1.5 py-0.5 rounded transition-colors ${locale === l.code ? 'bg-white/20 font-bold' : 'opacity-50 hover:opacity-90'}`}
        >
          {l.flag} {l.code.toUpperCase()}
        </button>
      ))}
    </div>
  )

  useEffect(() => {
    supabase.auth.getUser().then(({ data }: any) => setUser(data.user))
    const { data: listener } = supabase.auth.onAuthStateChange((_: any, session: any) => {
      setUser(session?.user ?? null)
    })
    return () => listener.subscription.unsubscribe()
  }, [])

  useEffect(() => {
    if (!user) { setAvatarUrl(null); return }
    supabase.from('profiles').select('avatar_url').eq('id', user.id).single()
      .then(({ data }: any) => setAvatarUrl(data?.avatar_url ?? null))
  }, [user])

  const signOut = async () => { await supabase.auth.signOut(); window.location.href = '/' }

  const AvatarBadge = () => (
    <span className="w-7 h-7 rounded-full overflow-hidden flex-shrink-0 bg-white/10 border border-white/30 flex items-center justify-center text-[10px] font-bold">
      {avatarUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={avatarUrl} alt="Perfil" className="w-full h-full object-cover" />
      ) : '👤'}
    </span>
  )

  return (
    <nav className="bg-brand-blue text-white shadow-md">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
          <span className="text-2xl">⚽</span>
          <span className="text-brand-yellow">Bolão</span>
          <span>2026</span>
        </Link>
        <div className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link href="/" className="hover:text-brand-yellow transition-colors">{t('nav.agenda')}</Link>
          {user && <Link href="/grupos" className="hover:text-brand-yellow transition-colors">{t('nav.myGroups')}</Link>}
          {user && <Link href="/perfil" className="flex items-center gap-1.5 hover:text-brand-yellow transition-colors"><AvatarBadge />{t('nav.profile')}</Link>}
          {user ? (
            <button onClick={signOut} className="bg-white/10 hover:bg-white/20 px-3 py-1 rounded-lg transition-colors">{t('nav.signOut')}</button>
          ) : (
            <Link href="/login" className="bg-brand-yellow text-brand-blue font-bold px-4 py-1.5 rounded-lg hover:bg-yellow-300 transition-colors">{t('nav.signIn')}</Link>
          )}
          <LangSwitch />
        </div>
        <button className="md:hidden p-2" onClick={() => setOpen(!open)}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {open
              ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </div>
      {open && (
        <div className="md:hidden bg-brand-blue border-t border-white/10 px-4 pb-4 flex flex-col gap-3 text-sm">
          <Link href="/" onClick={() => setOpen(false)} className="pt-3 hover:text-brand-yellow">{t('nav.agenda')}</Link>
          {user && <Link href="/grupos" onClick={() => setOpen(false)} className="hover:text-brand-yellow">{t('nav.myGroups')}</Link>}
          {user && <Link href="/perfil" onClick={() => setOpen(false)} className="hover:text-brand-yellow">{t('nav.profile')}</Link>}
          {user
            ? <button onClick={signOut} className="text-left hover:text-brand-yellow">{t('nav.signOut')}</button>
            : <Link href="/login" onClick={() => setOpen(false)} className="bg-brand-yellow text-brand-blue font-bold px-4 py-1.5 rounded-lg text-center">{t('nav.signIn')}</Link>}
          <LangSwitch compact />
        </div>
      )}
    </nav>
  )
}
