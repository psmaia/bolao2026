export function validateCPF(cpf: string): boolean {
  const clean = cpf.replace(/\D/g, '')
  if (clean.length !== 11) return false
  if (/^(\d)\1+$/.test(clean)) return false
  const calc = (str: string, len: number) => {
    let sum = 0
    for (let i = 0; i < len; i++) sum += parseInt(str[i]) * (len + 1 - i)
    const rem = (sum * 10) % 11
    return rem === 10 || rem === 11 ? 0 : rem
  }
  return calc(clean, 9) === parseInt(clean[9]) && calc(clean, 10) === parseInt(clean[10])
}

export function formatCPF(value: string): string {
  return value.replace(/\D/g, '').slice(0, 11)
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
}

export function formatPhone(value: string): string {
  const clean = value.replace(/\D/g, '').slice(0, 11)
  if (clean.length <= 10) {
    return clean
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{4})(\d{1,4})$/, '$1-$2')
  }
  return clean
    .replace(/(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{5})(\d{1,4})$/, '$1-$2')
}

export function getUserTimezone(): string {
  return Intl.DateTimeFormat().resolvedOptions().timeZone
}

export function formatMatchDate(utcDate: string, timezone?: string, locale: 'pt' | 'es' = 'pt') {
  const tz = timezone || getUserTimezone()
  const intlLocale = locale === 'es' ? 'es-ES' : 'pt-BR'
  const dt = new Date(utcDate)
  const date = dt.toLocaleDateString(intlLocale, { timeZone: tz, day: '2-digit', month: '2-digit' })
  const time = dt.toLocaleTimeString(intlLocale, { timeZone: tz, hour: '2-digit', minute: '2-digit' })
  const dayOfWeek = dt.toLocaleDateString(intlLocale, { timeZone: tz, weekday: 'short' })
  const now = new Date()
  const diffMs = dt.getTime() - now.getTime()
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
  let relative = ''
  if (locale === 'es') {
    if (diffMs < 0) relative = 'finalizado'
    else if (diffDays === 0) relative = 'hoy'
    else if (diffDays === 1) relative = 'mañana'
    else if (diffDays <= 7) relative = `en ${diffDays} días`
  } else {
    if (diffMs < 0) relative = 'encerrado'
    else if (diffDays === 0) relative = 'hoje'
    else if (diffDays === 1) relative = 'amanhã'
    else if (diffDays <= 7) relative = `em ${diffDays} dias`
  }
  return { date, time, dayOfWeek, relative }
}

export function formatLongDate(value: string, locale: 'pt' | 'es' = 'pt', timezone?: string) {
  const intlLocale = locale === 'es' ? 'es-ES' : 'pt-BR'
  try {
    return new Date(value).toLocaleDateString(intlLocale, { timeZone: timezone, weekday: 'long', day: '2-digit', month: 'long' })
  } catch {
    return ''
  }
}

export function formatShortDate(value: string, locale: 'pt' | 'es' = 'pt') {
  const intlLocale = locale === 'es' ? 'es-ES' : 'pt-BR'
  try {
    return new Date(value).toLocaleDateString(intlLocale, { day: '2-digit', month: '2-digit', year: 'numeric' })
  } catch {
    return ''
  }
}

// Mapeia o nome da seleção (como cadastrado pelo admin) para o código de 3 letras (padrão FIFA).
// Times ainda não definidos (ex: "Seleção A2", "A definir") retornam null e não exibem código.
const COUNTRY_CODES: Record<string, string> = {
  'alemanha': 'GER', 'argentina': 'ARG', 'austrália': 'AUS', 'áustria': 'AUT',
  'bélgica': 'BEL', 'bolívia': 'BOL', 'brasil': 'BRA', 'camarões': 'CMR',
  'canadá': 'CAN', 'catar': 'QAT', 'chile': 'CHI', 'colômbia': 'COL',
  'costa do marfim': 'CIV', 'costa rica': 'CRC', 'croácia': 'CRO', 'dinamarca': 'DEN',
  'egito': 'EGY', 'equador': 'ECU', 'escócia': 'SCO', 'eslováquia': 'SVK',
  'espanha': 'ESP', 'estados unidos': 'USA', 'frança': 'FRA', 'gana': 'GHA',
  'grécia': 'GRE', 'holanda': 'NED', 'países baixos': 'NED', 'hungria': 'HUN',
  'inglaterra': 'ENG', 'irã': 'IRN', 'irlanda': 'IRL', 'islândia': 'ISL',
  'itália': 'ITA', 'jamaica': 'JAM', 'japão': 'JPN', 'malásia': 'MAS',
  'marrocos': 'MAR', 'méxico': 'MEX', 'nigéria': 'NGA', 'noruega': 'NOR',
  'nova zelândia': 'NZL', 'panamá': 'PAN', 'paraguai': 'PAR', 'peru': 'PER',
  'polônia': 'POL', 'portugal': 'POR', 'romênia': 'ROU',
  'arábia saudita': 'KSA', 'senegal': 'SEN', 'sérvia': 'SRB', 'suécia': 'SWE',
  'tunísia': 'TUN', 'turquia': 'TUR', 'ucrânia': 'UKR',
  'uruguai': 'URU', 'gales': 'WAL', 'país de gales': 'WAL', 'venezuela': 'VEN',
  'coreia do sul': 'KOR', 'austrália e nova zelândia': 'ANZ', 'cabo verde': 'CPV',
  'curaçao': 'CUW', 'haiti': 'HAI', 'jordânia': 'JOR', 'nova caledônia': 'NCL',
  'uzbequistão': 'UZB', 'argélia': 'ALG', 'rep. dem. do congo': 'COD',
  'áfrica do sul': 'RSA', 'república tcheca': 'CZE', 'república checa': 'CZE',
  'rep. tcheca': 'CZE', 'rep. checa': 'CZE', 'rep tcheca': 'CZE', 'rep checa': 'CZE',
  'tchéquia': 'CZE', 'chéquia': 'CZE', 'tchecoslováquia': 'CZE',
  'bósnia': 'BIH', 'bósnia e herzegovina': 'BIH', 'bósnia-herzegovina': 'BIH',
  'suíça': 'SUI', 'suiça': 'SUI', 'suiza': 'SUI',
  'congo': 'CGO', 'república do congo': 'CGO', 'rep. do congo': 'CGO',
  'rd congo': 'COD', 'r.d. congo': 'COD', 'rep. dem. congo': 'COD',
  'república democrática do congo': 'COD', 'iraque': 'IRQ',
}

// Remove acentos para casar nomes mesmo com pequenas diferenças de grafia
// (ex: "Suiça" vs "Suíça", "Africa do Sul" vs "África do Sul").
function stripAccents(s: string): string {
  return s.normalize('NFD').replace(/[̀-ͯ]/g, '')
}

const COUNTRY_CODES_NORMALIZED: Record<string, string> = Object.fromEntries(
  Object.entries(COUNTRY_CODES).map(([name, code]) => [stripAccents(name), code])
)

export function countryCode(teamName: string | null | undefined): string | null {
  if (!teamName) return null
  const key = stripAccents(teamName.trim().toLowerCase())
  return COUNTRY_CODES_NORMALIZED[key] || null
}
