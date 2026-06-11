'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase'
import toast from 'react-hot-toast'

export default function InviteModal({
  groupId,
  inviteCode,
  isOwner,
}: {
  groupId: string
  inviteCode: string
  isOwner: boolean
}) {
  const [open, setOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const supabase = createClient()

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || window.location.origin

  const copyCode = () => {
    navigator.clipboard.writeText(inviteCode)
    toast.success('Código copiado!')
  }

  const copyLink = () => {
    navigator.clipboard.writeText(`${appUrl}/entrar?grupo=${inviteCode}`)
    toast.success('Link copiado!')
  }

  const sendInvite = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return

    setLoading(true)
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    // Verifica se já existe convite pendente
    const { data: existing } = await supabase
      .from('group_invites')
      .select('id')
      .eq('group_id', groupId)
      .eq('invited_email', email.trim().toLowerCase())
      .eq('status', 'pending')
      .single()

    if (existing) {
      toast.error('Já existe um convite pendente para esse email')
      setLoading(false)
      return
    }

    // Verifica se a pessoa já é membro
    const { data: profile } = await supabase
      .from('profiles')
      .select('id')
      .eq('email', email.trim().toLowerCase())
      .single()

    if (profile) {
      const { data: alreadyMember } = await supabase
        .from('group_members')
        .select('id')
        .eq('group_id', groupId)
        .eq('user_id', profile.id)
        .single()

      if (alreadyMember) {
        toast.error('Esse usuário já é membro do grupo')
        setLoading(false)
        return
      }
    }

    const { error } = await supabase.from('group_invites').insert({
      group_id: groupId,
      invited_by: user.id,
      invited_email: email.trim().toLowerCase(),
    })

    if (error) {
      toast.error('Erro ao enviar convite')
    } else {
      toast.success(`Convite enviado para ${email}`)
      setEmail('')
    }
    setLoading(false)
  }

  return (
    <>
      <button onClick={() => setOpen(true)} className="btn-secondary text-sm">
        Convidar
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">Convidar para o grupo</h2>
              <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>

            {/* Código e link */}
            <div className="bg-gray-50 rounded-lg p-4 mb-4 space-y-2">
              <p className="text-xs text-gray-500 font-medium">Código do grupo</p>
              <div className="flex items-center gap-2">
                <code className="font-mono text-lg font-bold text-brand-blue flex-1">{inviteCode}</code>
                <button onClick={copyCode} className="btn-secondary text-xs py-1">Copiar</button>
              </div>
              <button onClick={copyLink} className="text-xs text-brand-green underline">
                Copiar link de convite
              </button>
            </div>

            {/* Convite por email */}
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">Ou convidar por email:</p>
              <form onSubmit={sendInvite} className="flex gap-2">
                <input
                  type="email"
                  className="input flex-1"
                  placeholder="email@exemplo.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
                <button type="submit" disabled={loading} className="btn-primary text-sm px-3">
                  {loading ? '...' : 'Enviar'}
                </button>
              </form>
              <p className="text-xs text-gray-400 mt-2">
                O convite ficará disponível na plataforma quando o usuário fizer login.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
