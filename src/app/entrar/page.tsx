'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import toast from 'react-hot-toast'

// Página de entrada via código de convite
export default function EntrarPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [code, setCode] = useState(searchParams.get('grupo') || '')
  const [loading, setLoading] = useState(false)
  const supabase = createClient()

  const joinGroup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      router.push(`/login?next=/entrar?grupo=${code}`)
      return
    }

    // Busca grupo pelo código
    const { data: group } = await supabase
      .from('groups')
      .select('id, name')
      .eq('invite_code', code.toUpperCase().trim())
      .single()

    if (!group) {
      toast.error('Código inválido ou grupo não encontrado')
      setLoading(false)
      return
    }

    // Verifica se já é membro
    const { data: existing } = await supabase
      .from('group_members')
      .select('id')
      .eq('group_id', group.id)
      .eq('user_id', user.id)
      .single()

    if (existing) {
      toast.success('Você já é membro deste grupo!')
      router.push(`/grupos/${group.id}`)
      return
    }

    // Adiciona como membro
    const { error } = await supabase.from('group_members').insert({
      group_id: group.id,
      user_id: user.id,
      role: 'member',
    })

    if (error) {
      toast.error('Erro ao entrar no grupo')
    } else {
      toast.success(`Bem-vindo ao grupo "${group.name}"!`)
      router.push(`/grupos/${group.id}`)
    }
    setLoading(false)
  }

  return (
    <div className="max-w-sm mx-auto mt-16">
      <div className="card text-center">
        <div className="text-4xl mb-4">🏆</div>
        <h1 className="text-xl font-bold text-brand-blue mb-2">Entrar em um grupo</h1>
        <p className="text-gray-500 text-sm mb-6">
          Digite o código do grupo que você recebeu
        </p>
        <form onSubmit={joinGroup} className="flex flex-col gap-3">
          <input
            className="input text-center text-xl font-mono tracking-widest uppercase"
            value={code}
            onChange={e => setCode(e.target.value.toUpperCase())}
            placeholder="ABCD1234"
            maxLength={8}
            required
          />
          <button type="submit" disabled={loading || code.length < 6} className="btn-primary">
            {loading ? 'Entrando...' : 'Entrar no grupo'}
          </button>
        </form>
      </div>
    </div>
  )
}
