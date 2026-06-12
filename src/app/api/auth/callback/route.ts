import { NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase-server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/'
  if (code) {
    const supabase = await createServerSupabaseClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      // Primeiro login? created_at e last_sign_in_at praticamente coincidem.
      const { data: { user } } = await supabase.auth.getUser()
      const isFirstLogin = !!user && !!user.created_at && !!user.last_sign_in_at &&
        Math.abs(new Date(user.last_sign_in_at).getTime() - new Date(user.created_at).getTime()) < 60_000
      if (isFirstLogin) return NextResponse.redirect(`${origin}/bem-vindo?next=${encodeURIComponent(next)}`)
      return NextResponse.redirect(`${origin}${next}`)
    }
  }
  return NextResponse.redirect(`${origin}/login?error=auth`)
}
