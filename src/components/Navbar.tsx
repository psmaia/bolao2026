'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase'
import type { User } from '@supabase/supabase-js'

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user))
    const { data: listener } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null)
    })
    return () => listener.subscription.unsubscribe()
  }, [])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    window.location.href = '/'
  }

  return (
    <nav className="bg-brand-blue text-white shadow-md">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
          <span className="text-2xl">⚽</span>
          <span className="text-brand-yellow">Bolão</span>
          <span>2026</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link href="/" className="hover:text-brand-yellow transition-colors">
            Agenda
          </Link>
          {user && (
            <Link href="/grupos" className="hover:text-brand-yellow transition-colors">
              Meus Grupos
            </Link>
          )}
          {user ? (
            <div className="flex items-center gap-3">
              <Link href="/perfil" className="hover:text-brand-yellow transition-colors">
                Perfil
              </Link>
              <button
                onClick={handleSignOut}
                className="bg-white/10 hover:bg-white/20 px-3 py-1 rounded-lg transition-colors"
              >
                Sair
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="bg-brand-yellow text-brand-blue font-bold px-4 py-1.5 rounded-lg hover:bg-yellow-300 transition-colors"
            >
              Entrar
            </Link>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-white/10"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen
              ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            }
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-brand-blue border-t border-white/10 px-4 pb-4 flex flex-col gap-3 text-sm font-medium">
          <Link href="/" onClick={() => setMenuOpen(false)} className="pt-3 hover:text-brand-yellow">
            Agenda
          </Link>
          {user && (
            <Link href="/grupos" onClick={() => setMenuOpen(false)} className="hover:text-brand-yellow">
              Meus Grupos
            </Link>
          )}
          {user ? (
            <>
              <Link href="/perfil" onClick={() => setMenuOpen(false)} className="hover:text-brand-yellow">
                Perfil
              </Link>
              <button onClick={handleSignOut} className="text-left hover:text-brand-yellow">
                Sair
              </button>
            </>
          ) : (
            <Link
              href="/login"
              onClick={() => setMenuOpen(false)}
              className="bg-brand-yellow text-brand-blue font-bold px-4 py-1.5 rounded-lg text-center"
            >
              Entrar
            </Link>
          )}
        </div>
      )}
    </nav>
  )
}
