'use client'

import { useRef, useState } from 'react'
import { createClient } from '@/lib/supabase'
import toast from 'react-hot-toast'
import { formatPhone } from '@/lib/utils'
import { useLocale } from '@/contexts/LocaleContext'

interface Profile {
  id: string
  name: string
  nickname: string
  email: string
  phone: string | null
  avatar_url?: string | null
  marketing_opt_in?: boolean | null
}

const MAX_AVATAR_BYTES = 3 * 1024 * 1024 // 3MB

export default function PerfilForm({ profile }: { profile: Profile }) {
  const [name, setName] = useState(profile.name || '')
  const [nickname, setNickname] = useState(profile.nickname || '')
  const [phone, setPhone] = useState(profile.phone || '')
  const [loading, setLoading] = useState(false)
  const [avatarUrl, setAvatarUrl] = useState(profile.avatar_url || '')
  const [marketingOptIn, setMarketingOptIn] = useState(!!profile.marketing_opt_in)
  const [uploadingAvatar, setUploadingAvatar] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const supabase = createClient() as any
  const { t } = useLocale()

  const initials = (nickname || name || '?').slice(0, 2).toUpperCase()

  const handleAvatarClick = () => fileInputRef.current?.click()

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      toast.error(t('profile.errorImageType'))
      return
    }
    if (file.size > MAX_AVATAR_BYTES) {
      toast.error(t('profile.errorImageSize'))
      return
    }

    setUploadingAvatar(true)
    const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg'
    const path = `${profile.id}/avatar.${ext}`

    const { error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(path, file, { upsert: true, cacheControl: '3600' })

    if (uploadError) {
      toast.error(t('profile.errorUpload', { msg: uploadError.message }))
      setUploadingAvatar(false)
      return
    }

    const { data: publicUrlData } = supabase.storage.from('avatars').getPublicUrl(path)
    const newUrl = `${publicUrlData.publicUrl}?t=${Date.now()}`

    const { error: updateError } = await supabase
      .from('profiles')
      .update({ avatar_url: newUrl })
      .eq('id', profile.id)

    if (updateError) {
      toast.error(t('profile.errorAvatarSave', { msg: updateError.message }))
    } else {
      setAvatarUrl(newUrl)
      toast.success(t('profile.successAvatar'))
    }
    setUploadingAvatar(false)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !nickname.trim()) {
      toast.error(t('profile.errorRequired'))
      return
    }
    setLoading(true)
    const { error } = await supabase
      .from('profiles')
      .update({
        name: name.trim(),
        nickname: nickname.trim(),
        phone: phone.trim() || null,
        marketing_opt_in: marketingOptIn,
      })
      .eq('id', profile.id)

    if (error) {
      toast.error(t('profile.errorSaved', { msg: error.message }))
    } else {
      toast.success(t('profile.successSaved'))
    }
    setLoading(false)
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-brand-blue mb-6">{t('profile.title')}</h1>
      <div className="card">
      <div className="flex flex-col items-center gap-2 mb-6">
        <button
          type="button"
          onClick={handleAvatarClick}
          disabled={uploadingAvatar}
          className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-brand-blue/20 flex items-center justify-center bg-brand-blue text-white text-xl font-bold group"
          title={t('profile.changePhoto')}
        >
          {avatarUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={avatarUrl} alt={t('profile.changePhoto')} className="w-full h-full object-cover" />
          ) : (
            <span>{initials}</span>
          )}
          <span className="absolute inset-0 bg-black/40 text-[10px] font-medium opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-center px-1">
            {uploadingAvatar ? t('profile.uploading') : t('profile.changePhoto')}
          </span>
        </button>
        <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
        <p className="text-xs text-gray-400">{t('profile.changePhotoHint')}</p>
      </div>

      <form onSubmit={handleSave} className="flex flex-col gap-4">
        <div>
          <label className="label">{t('profile.email')}</label>
          <input className="input bg-gray-50 text-gray-400 cursor-not-allowed" value={profile.email} disabled />
          <p className="text-xs text-gray-400 mt-1">{t('profile.emailHint')}</p>
        </div>

        <div>
          <label className="label">{t('profile.name')}</label>
          <input
            className="input"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder={t('profile.namePlaceholder')}
            maxLength={80}
            required
          />
        </div>

        <div>
          <label className="label">{t('profile.nickname')}</label>
          <input
            className="input"
            value={nickname}
            onChange={e => setNickname(e.target.value.replace(/\s/g, ''))}
            placeholder={t('profile.nicknamePlaceholder')}
            maxLength={30}
            required
          />
          <p className="text-xs text-gray-400 mt-1">{t('profile.nicknameHint')}</p>
        </div>

        <div>
          <label className="label">{t('profile.phone')}</label>
          <input
            className="input"
            value={phone}
            onChange={e => setPhone(formatPhone(e.target.value))}
            placeholder="(11) 99999-9999"
            maxLength={15}
          />
        </div>

        <label className="flex items-start gap-2.5 text-sm text-gray-600 cursor-pointer">
          <input
            type="checkbox"
            checked={marketingOptIn}
            onChange={e => setMarketingOptIn(e.target.checked)}
            className="mt-0.5 w-4 h-4 accent-brand-blue flex-shrink-0"
          />
          <span>{t('profile.marketingLabel')}</span>
        </label>

        <button type="submit" disabled={loading} className="btn-primary mt-2">
          {loading ? t('profile.saving') : t('profile.save')}
        </button>
      </form>
      </div>
    </div>
  )
}
