// ============================================================
// Utilitários gerais
// ============================================================

/**
 * Valida CPF pelo dígito verificador
 */
export function validateCPF(cpf: string): boolean {
  const clean = cpf.replace(/\D/g, '')
  if (clean.length !== 11) return false
  if (/^(\d)\1+$/.test(clean)) return false // todos os dígitos iguais

  const calc = (str: string, len: number) => {
    let sum = 0
    for (let i = 0; i < len; i++) {
      sum += parseInt(str[i]) * (len + 1 - i)
    }
    const rem = (sum * 10) % 11
    return rem === 10 || rem === 11 ? 0 : rem
  }

  const d1 = calc(clean, 9)
  const d2 = calc(clean, 10)

  return d1 === parseInt(clean[9]) && d2 === parseInt(clean[10])
}

/**
 * Formata CPF: 000.000.000-00
 */
export function formatCPF(value: string): string {
  return value
    .replace(/\D/g, '')
    .slice(0, 11)
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
}

/**
 * Formata celular: (00) 00000-0000
 */
export function formatPhone(value: string): string {
  return value
    .replace(/\D/g, '')
    .slice(0, 11)
    .replace(/(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{5})(\d)/, '$1-$2')
}

/**
 * Retorna o nome do fuso horário do browser
 */
export function getUserTimezone(): string {
  return Intl.DateTimeFormat().resolvedOptions().timeZone
}

/**
 * Formata data/hora de um jogo no fuso do usuário
 */
export function formatMatchDate(utcDate: string, timezone?: string): {
  date: string
  time: string
  dayOfWeek: string
  relative: string
} {
  const tz = timezone || getUserTimezone()
  const dt = new Date(utcDate)

  const dateStr = dt.toLocaleDateString('pt-BR', {
    timeZone: tz,
    day: '2-digit',
    month: '2-digit',
  })

  const timeStr = dt.toLocaleTimeString('pt-BR', {
    timeZone: tz,
    hour: '2-digit',
    minute: '2-digit',
  })

  const dayOfWeek = dt.toLocaleDateString('pt-BR', {
    timeZone: tz,
    weekday: 'short',
  })

  // Relativo: "hoje", "amanhã", "em X dias"
  const now = new Date()
  const diffMs = dt.getTime() - now.getTime()
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
  let relative = ''
  if (diffMs < 0) {
    relative = 'encerrado'
  } else if (diffDays === 0) {
    relative = 'hoje'
  } else if (diffDays === 1) {
    relative = 'amanhã'
  } else if (diffDays <= 7) {
    relative = `em ${diffDays} dias`
  }

  return { date: dateStr, time: timeStr, dayOfWeek, relative }
}

/**
 * Retorna label legível do estágio
 */
export function stageLabel(stage: string): string {
  const labels: Record<string, string> = {
    group: 'Fase de Grupos',
    r32:   'Oitavas de Final',
    r16:   'Quartas de Final',
    qf:    'Semifinais',
    sf:    'Semifinais',
    '3rd': 'Terceiro Lugar',
    final: 'Final',
  }
  return labels[stage] || stage
}

/**
 * Retorna classe de cor por status do jogo
 */
export function statusColor(status: string): string {
  const colors: Record<string, string> = {
    scheduled: 'text-gray-500',
    live:      'text-red-600 animate-pulse',
    finished:  'text-green-700',
    cancelled: 'text-gray-400 line-through',
  }
  return colors[status] || 'text-gray-500'
}

/**
 * Trunca string
 */
export function truncate(str: string, max: number): string {
  return str.length > max ? str.slice(0, max) + '…' : str
}
