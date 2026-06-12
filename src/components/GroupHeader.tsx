'use client'

import type { ReactNode } from 'react'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useLocale } from '@/contexts/LocaleContext'
import InviteModal from '@/components/InviteModal'
import { createClient } from '@/lib/supabase'
import toast from 'react-hot-toast'

interface Props {
  groupId: string
  groupName: string
  groupDescription: string | null
  inviteCode: string
  isOwner: boolean
  membersCount: number
  membersNode: ReactNode
  betsNode: ReactNode
}

export default function GroupHeader({ groupId, groupName, groupDescription, inviteCode, isOwner, membersCount, membersNode, betsNode }: Props) {
  const { t } = useLocale()
  const router = useRouter()
  const [confirming, setConfirming] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const supabase = createClient() as any

  const deleteGroup = async () => {
    setDeleting(true)
    await supabase.from('bets').delete().eq('group_id', groupId)
    await supabase.from('group_members').delete().eq('group_id', groupId)
    const { error } = await supabase.from('groups').delete().eq('id', groupId)
    if (error) { toast.error('Erro ao deletar grupo'); setDeleting(false); return }
    toast.success('Grupo deletado')
    window.location.href = '/grupos'
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="card mb-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-brand-blue">{groupName}</h1>
            {groupDescription && <p className="text-gray-500 text-sm mt-1">{groupDescription}</p>}
          </div>
          <div className="flex gap-2">
            <Link href={`/grupos/${groupId}/ranking`} className="btn-secondary text-sm">{t('group.ranking')}</Link>
            <InviteModal groupId={groupId} inviteCode={inviteCode} isOwner={isOwner} />
            {isOwner && !confirming && (
              <button onClick={() => setConfirming(true)} className="text-xs px-3 py-1.5 rounded-lg border border-red-200 text-red-500 hover:bg-red-50 transition-colors">
                Deletar
              </button>
            )}
            {isOwner && confirming && (
              <div className="flex gap-1 items-center">
                <span className="text-xs text-red-600 font-medium">Tem certeza?</span>
                <button onClick={deleteGroup} disabled={deleting} className="text-xs px-2 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600">
                  {deleting ? '...' : 'Sim'}
                </button>
                <button onClick={() => setConfirming(false)} className="text-xs px-2 py-1 border rounded-lg hover:bg-gray-50">
                  Não
                </button>
              </div>
            )}
          </div>
        </div>
        <p className="mt-3 text-xs text-gray-400">
          {t('group.code')} <span className="font-mono font-bold text-gray-600">{inviteCode}</span>
        </p>
      </div>

      <div className="card mb-6 text-xs text-gray-500">
        <p className="font-semibold text-gray-700 mb-1">{t('group.scoring')}</p>
        <div className="flex gap-4">
          <span>{t('group.exactScore')} <b className="text-brand-green">10 {t('bets.pts')}</b></span>
          <span>{t('group.winner')} <b className="text-brand-green">5 {t('bets.pts')}</b></span>
          <span>{t('group.draw')} <b className="text-brand-green">3 {t('bets.pts')}</b></span>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-lg font-bold text-gray-800 mb-4">{t('group.participants', { count: membersCount })}</h2>
        {membersNode}
      </div>

      <div className="mb-8">
        <h2 className="text-lg font-bold text-gray-800 mb-4">{t('group.myBets')}</h2>
        {betsNode}
      </div>
    </div>
  )
}
