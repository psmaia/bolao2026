'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

export default function CreateGroupButton({ userId }: { userId: string }) {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return

    setLoading(true)
	const invite_code = Math.random().toString(36).substring(2, 8).toUpperCase()

	const { data: group, error } = await supabase
  		.from('groups')
  		.insert({ name: name.trim(), description: description.trim() || null, owner_id: user.id, invite_code })
	.select()
    	.single()

    if (error || !group) {
      toast.error('Erro ao criar grupo')
      setLoading(false)
      return
    }

    // Adiciona criador como owner
    await supabase.from('group_members').insert({
      group_id: group.id,
      user_id: userId,
      role: 'owner',
    })

    toast.success('Grupo criado!')
    setOpen(false)
    setName('')
    setDescription('')
    router.refresh()
    setLoading(false)
  }

  return (
    <>
      <button onClick={() => setOpen(true)} className="btn-primary text-sm">
        + Novo grupo
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
            <h2 className="text-lg font-bold mb-4">Criar grupo de bolão</h2>
            <form onSubmit={handleCreate} className="flex flex-col gap-4">
              <div>
                <label className="label">Nome do grupo *</label>
                <input
                  className="input"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="ex: Família Silva, Galera do trabalho..."
                  maxLength={60}
                  required
                />
              </div>
              <div>
                <label className="label">Descrição (opcional)</label>
                <input
                  className="input"
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  placeholder="ex: R$ 50 para quem ganhar"
                  maxLength={120}
                />
              </div>
              <div className="flex gap-2 justify-end">
                <button type="button" onClick={() => setOpen(false)} className="btn-secondary">
                  Cancelar
                </button>
                <button type="submit" disabled={loading || !name.trim()} className="btn-primary">
                  {loading ? 'Criando...' : 'Criar grupo'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
