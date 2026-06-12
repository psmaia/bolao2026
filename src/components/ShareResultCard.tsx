'use client'

import { useState } from 'react'
import toast from 'react-hot-toast'
import { useLocale } from '@/contexts/LocaleContext'

type T = (key: string, vars?: Record<string, string | number>) => string

const BRAND_BLUE = '#002776'
const BRAND_BLUE_DARK = '#001233'
const BRAND_YELLOW = '#ffdf00'
const BRAND_GREEN = '#009c3b'

interface Props {
  nickname: string
  name: string
  avatarUrl?: string | null
  position: number
  totalPoints: number
  groupName: string
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => resolve(img)
    img.onerror = () => reject(new Error('image load failed'))
    img.src = src
  })
}

function medalLabel(position: number, t: T) {
  const label = t('share.medal', { n: position })
  if (position === 1) return `🥇 ${label}`
  if (position === 2) return `🥈 ${label}`
  if (position === 3) return `🥉 ${label}`
  return label
}

async function buildCardBlob(props: Props, t: T): Promise<Blob | null> {
  const { nickname, name, avatarUrl, position, totalPoints, groupName } = props
  const size = 1080
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')
  if (!ctx) return null

  // background gradient
  const gradient = ctx.createLinearGradient(0, 0, 0, size)
  gradient.addColorStop(0, BRAND_BLUE)
  gradient.addColorStop(1, BRAND_BLUE_DARK)
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, size, size)

  // soft decorative circles
  ctx.fillStyle = 'rgba(255,255,255,0.04)'
  ctx.beginPath(); ctx.arc(size * 0.85, size * 0.1, 220, 0, Math.PI * 2); ctx.fill()
  ctx.beginPath(); ctx.arc(size * 0.1, size * 0.92, 260, 0, Math.PI * 2); ctx.fill()

  ctx.textAlign = 'center'

  // header
  ctx.fillStyle = BRAND_YELLOW
  ctx.font = '700 56px "Segoe UI", Roboto, Arial, sans-serif'
  ctx.fillText('⚽ Bolão 2026', size / 2, 130)

  ctx.fillStyle = 'rgba(255,255,255,0.85)'
  ctx.font = '400 34px "Segoe UI", Roboto, Arial, sans-serif'
  const truncatedGroup = groupName.length > 28 ? groupName.slice(0, 27) + '…' : groupName
  ctx.fillText(truncatedGroup, size / 2, 180)

  // avatar circle
  const cx = size / 2
  const cy = 400
  const radius = 140

  let avatarDrawn = false
  if (avatarUrl) {
    try {
      const img = await loadImage(avatarUrl)
      ctx.save()
      ctx.beginPath()
      ctx.arc(cx, cy, radius, 0, Math.PI * 2)
      ctx.closePath()
      ctx.clip()
      ctx.drawImage(img, cx - radius, cy - radius, radius * 2, radius * 2)
      ctx.restore()
      avatarDrawn = true
    } catch {
      avatarDrawn = false
    }
  }

  if (!avatarDrawn) {
    ctx.fillStyle = BRAND_YELLOW
    ctx.beginPath()
    ctx.arc(cx, cy, radius, 0, Math.PI * 2)
    ctx.fill()
    ctx.fillStyle = BRAND_BLUE
    ctx.font = '700 110px "Segoe UI", Roboto, Arial, sans-serif'
    ctx.textBaseline = 'middle'
    ctx.fillText((nickname || name || '?').slice(0, 2).toUpperCase(), cx, cy + 8)
    ctx.textBaseline = 'alphabetic'
  }

  // ring around avatar
  ctx.strokeStyle = 'rgba(255,255,255,0.5)'
  ctx.lineWidth = 6
  ctx.beginPath()
  ctx.arc(cx, cy, radius + 8, 0, Math.PI * 2)
  ctx.stroke()

  // nickname
  ctx.fillStyle = '#ffffff'
  ctx.font = '700 64px "Segoe UI", Roboto, Arial, sans-serif'
  ctx.fillText(nickname || name, size / 2, 630)

  if (name && nickname && name !== nickname) {
    ctx.fillStyle = 'rgba(255,255,255,0.6)'
    ctx.font = '400 32px "Segoe UI", Roboto, Arial, sans-serif'
    ctx.fillText(name, size / 2, 670)
  }

  // position badge
  ctx.fillStyle = BRAND_YELLOW
  ctx.font = '700 76px "Segoe UI", Roboto, Arial, sans-serif'
  ctx.fillText(medalLabel(position, t), size / 2, 800)

  // points pill
  const pointsText = `${totalPoints} ${t(totalPoints === 1 ? 'share.point' : 'share.points')}`
  ctx.font = '700 52px "Segoe UI", Roboto, Arial, sans-serif'
  const textWidth = ctx.measureText(pointsText).width
  const pillPaddingX = 48
  const pillWidth = textWidth + pillPaddingX * 2
  const pillHeight = 88
  const pillX = size / 2 - pillWidth / 2
  const pillY = 850

  ctx.fillStyle = BRAND_GREEN
  ctx.beginPath()
  // rounded rectangle
  const r = pillHeight / 2
  ctx.moveTo(pillX + r, pillY)
  ctx.lineTo(pillX + pillWidth - r, pillY)
  ctx.arcTo(pillX + pillWidth, pillY, pillX + pillWidth, pillY + r, r)
  ctx.lineTo(pillX + pillWidth, pillY + pillHeight - r)
  ctx.arcTo(pillX + pillWidth, pillY + pillHeight, pillX + pillWidth - r, pillY + pillHeight, r)
  ctx.lineTo(pillX + r, pillY + pillHeight)
  ctx.arcTo(pillX, pillY + pillHeight, pillX, pillY + pillHeight - r, r)
  ctx.lineTo(pillX, pillY + r)
  ctx.arcTo(pillX, pillY, pillX + r, pillY, r)
  ctx.closePath()
  ctx.fill()

  ctx.fillStyle = '#ffffff'
  ctx.textBaseline = 'middle'
  ctx.fillText(pointsText, size / 2, pillY + pillHeight / 2 + 4)
  ctx.textBaseline = 'alphabetic'

  // footer
  ctx.fillStyle = 'rgba(255,255,255,0.55)'
  ctx.font = '400 30px "Segoe UI", Roboto, Arial, sans-serif'
  ctx.fillText('agendadacopa2026.com.br', size / 2, size - 60)

  return new Promise(resolve => canvas.toBlob(b => resolve(b), 'image/png'))
}

export default function ShareResultCard(props: Props) {
  const [generating, setGenerating] = useState(false)
  const { t } = useLocale()

  const handleShare = async () => {
    setGenerating(true)
    try {
      const blob = await buildCardBlob(props, t)
      if (!blob) {
        toast.error(t('share.errorGenerate'))
        setGenerating(false)
        return
      }
      const file = new File([blob], 'meu-resultado-bolao2026.png', { type: 'image/png' })
      const shareText = t('share.text', { medal: medalLabel(props.position, t), points: props.totalPoints, group: props.groupName })

      const nav = navigator as Navigator & { canShare?: (data?: ShareData) => boolean }
      if (nav.share && nav.canShare?.({ files: [file] })) {
        await nav.share({ files: [file], title: t('share.title'), text: shareText })
      } else {
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = 'meu-resultado-bolao2026.png'
        document.body.appendChild(a)
        a.click()
        a.remove()
        URL.revokeObjectURL(url)
        toast.success(t('share.downloaded'))
        window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`, '_blank')
      }
    } catch {
      toast.error(t('share.errorGenerateLater'))
    }
    setGenerating(false)
  }

  return (
    <button onClick={handleShare} disabled={generating} className="btn-secondary text-sm flex items-center gap-1.5 disabled:opacity-60">
      {generating ? t('share.generating') : <>{t('share.button')}</>}
    </button>
  )
}
