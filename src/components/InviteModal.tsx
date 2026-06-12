'use client'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useLocale } from '@/contexts/LocaleContext'

export default function InviteModal({ groupId, inviteCode, isOwner }: { groupId: string; inviteCode: string; isOwner: boolean }) {
  const [open, setOpen] = useState(false)
  const { t } = useLocale()

  const inviteLink = () => `${window.location.origin}/entrar?grupo=${inviteCode}`
  const inviteMessage = () => t('invite.message', { code: inviteCode, link: inviteLink() })

  const copyCode = () => { navigator.clipboard.writeText(inviteCode); toast.success(t('invite.codeCopied')) }
  const copyLink = () => { navigator.clipboard.writeText(inviteLink()); toast.success(t('invite.linkCopied')) }
  const shareWhatsApp = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(inviteMessage())}`, '_blank')
  }

  return (
    <>
      <button onClick={() => setOpen(true)} className="btn-secondary text-sm">{t('invite.button')}</button>
      {open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">{t('invite.modalTitle')}</h2>
              <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 mb-4 space-y-2">
              <p className="text-xs text-gray-500 font-medium">{t('invite.codeLabel')}</p>
              <div className="flex items-center gap-2">
                <code className="font-mono text-lg font-bold text-brand-blue flex-1">{inviteCode}</code>
                <button onClick={copyCode} className="btn-secondary text-xs py-1">{t('invite.copy')}</button>
              </div>
              <button onClick={copyLink} className="text-xs text-brand-green underline">{t('invite.copyLink')}</button>
            </div>
            <button onClick={shareWhatsApp} className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebe5a] text-white font-semibold rounded-lg py-2.5 transition-colors">
              <span className="text-lg">💬</span> {t('invite.whatsapp')}
            </button>
            <p className="text-xs text-gray-400 mt-3 text-center">
              {t('invite.whatsappHint')}
            </p>
          </div>
        </div>
      )}
    </>
  )
}
