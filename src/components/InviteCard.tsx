'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

export default function InviteCard({ invite, userId }: { invite: any; userId: string }) {
  const [loading, setLoading] = useState<'accept' | 'decline' | null>(null)
  const supabase = createClient() as any
  const router = useRouter()

  const accept = async () => {
    setLoading('accept')
    // Adiciona como membro
    const { error } = await supabase.from('group_members').insert({
      group_id: invite.group_id,
      user_id: userId,
      role: 'member',
    })
    if (error) { toast.error('Erro ao aceitar convite'); setLoading(null); return }
    // Marca convite como aceito
    await supabase.from('group_invites').update({ status: 'accepted' }).eq('id', invite.id)
    toast.success(`Bem-vindo ao grupo ${invite.groups?.name || ''}!`)
    router.refresh()
  }

  const decline = async () => {
    setLoading('decline')
    await supabase.from('group_invites').update({ status: 'declined' }).eq('id', invite.id)
    toast.success('Convite recusado')
    router.refresh()
  }

  return (
    <div className="card border-brand-yellow border-2 flex items-center justify-between">
      <div>
        <p className="font-medium">
          Convite para <span className="text-brand-blue font-bold">{invite.groups?.name}</span>
        </p>
        <p className="text-xs text-gray-500">
          de {invite.profiles?.nickname || 'alguém'}
        </p>
      </div>
      <div className="flex gap-2">
        <button onClick={accept} disabled={!!loading} className="btn-primary text-sm py-1">
          {loading === 'accept' ? '...' : 'Aceitar'}
        </button>
        <button onClick={decline} disabled={!!loading} className="btn-secondary text-sm py-1">
          {loading === 'decline' ? '...' : 'Recusar'}
        </button>
      </div>
    </div>
  )
}
