// Locale-aware formatting. Whole numbers for counts, one decimal for rates.
export const LOCALE = 'en-US'

export const formatCount = (n: number, locale = LOCALE) =>
  new Intl.NumberFormat(locale, { maximumFractionDigits: 0 }).format(n)

export const formatRate = (n: number, locale = LOCALE) =>
  new Intl.NumberFormat(locale, { minimumFractionDigits: 1, maximumFractionDigits: 1 }).format(n)

export const formatTime = (d: Date, locale = LOCALE) =>
  new Intl.DateTimeFormat(locale, { hour: 'numeric', minute: '2-digit' }).format(d)

export const formatHour = (d: Date, locale = LOCALE) =>
  new Intl.DateTimeFormat(locale, { hour: 'numeric' }).format(d)

export function formatDuration(minutes: number): string {
  const h = Math.floor(minutes / 60)
  const m = Math.round(minutes % 60)
  if (!h) return `${m}m`
  return m ? `${h}h ${m}m` : `${h}h`
}

// "4:42 AM" -> { time: "4:42", period: "AM" }. Period is empty in 24-hour locales.
export function formatTimeParts(d: Date, locale = LOCALE): { time: string; period: string } {
  const parts = new Intl.DateTimeFormat(locale, { hour: 'numeric', minute: '2-digit' }).formatToParts(d)
  const period = parts.find((p) => p.type === 'dayPeriod')?.value ?? ''
  const time = parts
    .filter((p) => p.type !== 'dayPeriod')
    .map((p) => p.value)
    .join('')
    .trim()
  return { time, period }
}

// KPI counts: whole numbers up to 99,999,999; compact from 100 million ("123.4M").
export function formatKpiCount(n: number, locale = LOCALE): string {
  if (Math.abs(n) < 100_000_000) return formatCount(n, locale)
  return new Intl.NumberFormat(locale, { notation: 'compact', maximumFractionDigits: 1 }).format(n)
}

// Percentages: one decimal ("84.2%"). Whole percent for axis ticks ("80%").
export const formatPercent = (n: number, locale = LOCALE) =>
  new Intl.NumberFormat(locale, { style: 'percent', minimumFractionDigits: 1, maximumFractionDigits: 1 }).format(n / 100)
export const formatPercentTick = (n: number, locale = LOCALE) =>
  new Intl.NumberFormat(locale, { style: 'percent', maximumFractionDigits: 0 }).format(n / 100)

// Signed count ("+120", "-260").
export const formatSigned = (n: number, locale = LOCALE) =>
  new Intl.NumberFormat(locale, { maximumFractionDigits: 0, signDisplay: 'exceptZero' }).format(n)

// Clock duration for cycle and step times: "4:05" (m:ss) or "1:02:05" (h:mm:ss).
export function formatClock(seconds: number): string {
  const s = Math.round(Math.abs(seconds))
  const h = Math.floor(s / 3600)
  const m = Math.floor((s % 3600) / 60)
  const ss = String(s % 60).padStart(2, '0')
  return h ? `${h}:${String(m).padStart(2, '0')}:${ss}` : `${m}:${ss}`
}
