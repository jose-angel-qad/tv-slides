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
