'use client'
import { useState } from 'react'

// Converte emoji de bandeira para código do flagcdn.com.
//
// Dois tipos de flag emoji existem:
//   1. Regional Indicator pair (U+1F1E6–U+1F1FF × 2)
//      Ex: 🇧🇷 → "br", 🇦🇷 → "ar"
//
//   2. Subdivision flag (U+1F3F4 + tag chars U+E0061–U+E007A + cancel U+E007F)
//      Ex: 🏴󠁧󠁢󠁳󠁣󠁴󠁿 (Escócia/gbsct) → "gb-sct"
//          🏴󠁧󠁢󠁷󠁬󠁳󠁿 (País de Gales/gbwls) → "gb-wls"
//          🏴󠁧󠁢󠁥󠁮󠁧󠁿 (Inglaterra/gbeng) → "gb-eng"
function flagEmojiToCode(emoji: string): string | null {
  const pts = [...emoji].map(c => c.codePointAt(0) ?? 0)

  // Tipo 1: Regional Indicator
  if (
    pts.length === 2 &&
    pts[0] >= 0x1F1E6 && pts[0] <= 0x1F1FF &&
    pts[1] >= 0x1F1E6 && pts[1] <= 0x1F1FF
  ) {
    return (
      String.fromCharCode(pts[0] - 0x1F1E6 + 65) +
      String.fromCharCode(pts[1] - 0x1F1E6 + 65)
    ).toLowerCase()
  }

  // Tipo 2: Subdivision flag (🏴 + tag chars)
  if (pts[0] === 0x1F3F4) {
    const tagLetters = pts
      .slice(1)
      .filter(p => p >= 0xE0061 && p <= 0xE007A)
      .map(p => String.fromCharCode(p - 0xE0000))
      .join('')
    // "gbsct" → "gb-sct", "gbwls" → "gb-wls"
    if (tagLetters.length >= 4) {
      return `${tagLetters.slice(0, 2)}-${tagLetters.slice(2)}`
    }
  }

  return null
}

interface Props {
  emoji?: string | null
  // 'sm' = 24px, 'md' = 32px (padrão), 'lg' = 40px
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const SIZE_MAP = { sm: 24, md: 32, lg: 40 } as const

function FlagImg({ emoji, code, px, className }: { emoji: string; code: string; px: number; className: string }) {
  const [failed, setFailed] = useState(false)
  if (failed) return <span className={`leading-none ${className}`} style={{ fontSize: px }}>{emoji}</span>
  return (
    <img
      src={`https://flagcdn.com/w${px}/${code.toLowerCase()}.png`}
      srcSet={`https://flagcdn.com/w${px * 2}/${code.toLowerCase()}.png 2x`}
      alt={code}
      width={px}
      height={Math.round(px * 0.75)}
      className={`inline-block object-cover rounded-sm ${className}`}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  )
}

export default function TeamFlag({ emoji, size = 'md', className = '' }: Props) {
  if (emoji) {
    const code = flagEmojiToCode(emoji)
    if (code) {
      const px = SIZE_MAP[size]
      return <FlagImg emoji={emoji} code={code} px={px} className={className} />
    }
    // Emoji válido mas não é bandeira de país — exibe direto
    return <span className={`leading-none ${className}`} style={{ fontSize: SIZE_MAP[size] }}>{emoji}</span>
  }
  // Sem emoji
  return <span className={`text-2xl leading-none ${className}`}>🏳️</span>
}
