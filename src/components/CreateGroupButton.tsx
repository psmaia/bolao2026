'use client'
import { useState } from 'react'
import { createClient } from '@/lib/supabase'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { useLocale } from '@/contexts/LocaleContext'

export default function CreateGroupButton({ userId }: { userId: string }) {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient() as any
  const { t } = useLocale()

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Pega o usuário diretamente do cliente para garantir autenticação
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      toast.error(t('createGroup.errorAuth'))
      setLoading(false)
      return
    }

    // Gera código único de convite: 6 letras/números maiúsculos (ex: "A3BX9K")
    const invite_code = Math.random().toString(36).substring(2, 8).toUpperCase()

    const { data: group, error } = await supabase
      .from('groups')
      .insert({ name: name.trim(), description: description.trim() || null, owner_id: user.id, invite_code })
      .select()
      .single()

    if (error || !group) {
      toast.error(t('createGroup.errorCreate', { msg: error?.message || '—' }))
      setLoading(false)
      return
    }

    await supabase.from('group_members').insert({
      group_id: group.id,
      user_id: user.id,
      role: 'owner',
    })

    toast.success(t('createGroup.success'))
    setOpen(false)
    setName('')
    setDescription('')
    router.refresh()
    setLoading(false)
  }

  return (
    <>
      <button onClick={() => setOpen(true)} className="btn-primary text-sm">{t('groups.newGroup')}</button>
      {open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
            <h2 className="text-lg font-bold mb-4">{t('createGroup.title')}</h2>
            <form onSubmit={handleCreate} className="flex flex-col gap-4">
              <div>
                <label className="label">{t('createGroup.nameLabel')}</label>
                <input className="input" value={name} onChange={e => setName(e.target.value)} placeholder={t('createGroup.namePlaceholder')} maxLength={60} required />
              </div>
              <div>
                <label className="label">{t('createGroup.descLabel')}</label>
                <input className="input" value={description} onChange={e => setDescription(e.target.value)} placeholder={t('createGroup.descPlaceholder')} maxLength={120} />
              </div>
              <div className="flex gap-2 justify-end">
                <button type="button" onClick={() => setOpen(false)} className="btn-secondary">{t('createGroup.cancel')}</button>
                <button type="submit" disabled={loading || !name.trim()} className="btn-primary">{loading ? t('createGroup.creating') : t('createGroup.submit')}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
