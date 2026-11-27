// WCAG 2.1 relative luminance and contrast ratio.

function channel(c: number): number {
  const s = c / 255
  return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4)
}

function rgba(hex: string): [number, number, number, number] {
  const h = hex.replace('#', '')
  const a = h.length >= 8 ? parseInt(h.slice(6, 8), 16) / 255 : 1
  return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16), a]
}

// Flattens a translucent color (#RRGGBBAA) over an opaque one. Opaque colors pass through.
export function composite(hex: string, under: string): string {
  const [r, g, b, a] = rgba(hex)
  if (a >= 1) return hex
  const [ur, ug, ub] = rgba(under)
  const mix = (top: number, bottom: number) => Math.round(top * a + bottom * (1 - a))
  return '#' + [mix(r, ur), mix(g, ug), mix(b, ub)].map((v) => v.toString(16).padStart(2, '0')).join('').toUpperCase()
}

export function luminance(hex: string): number {
  const [r, g, b] = rgba(hex)
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b)
}

export function contrast(a: string, b: string): number {
  const la = luminance(a)
  const lb = luminance(b)
  return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05)
}

export interface ContrastPair {
  fg: string
  bg: string
  /** For a translucent bg: the token it sits on (it is composited before measuring). */
  over?: string
  min: number
  use: string
}

// Pairs every slide depends on. Token keys without the "color." prefix.
// surface.raised is translucent; it sits on the tile gradient, so it is measured over gradient.surface.end.
export const CONTRAST_PAIRS: ContrastPair[] = [
  { fg: 'text.primary', bg: 'surface.default', min: 7, use: 'Key values' },
  { fg: 'text.primary', bg: 'background.default', min: 7, use: 'Key values' },
  { fg: 'text.primary', bg: 'surface.raised', over: 'gradient.surface.end', min: 7, use: 'Key values, nav buttons' },
  { fg: 'text.secondary', bg: 'surface.default', min: 4.5, use: 'Text' },
  { fg: 'text.secondary', bg: 'background.default', min: 4.5, use: 'Text' },
  { fg: 'text.secondary', bg: 'surface.raised', over: 'gradient.surface.end', min: 4.5, use: 'Status line text' },
  { fg: 'status.positive.content', bg: 'surface.default', min: 4.5, use: 'Status text' },
  { fg: 'status.warning.content', bg: 'surface.default', min: 4.5, use: 'Status text' },
  { fg: 'status.negative.content', bg: 'surface.default', min: 4.5, use: 'Status text' },
  { fg: 'status.positive.content', bg: 'surface.raised', over: 'gradient.surface.end', min: 4.5, use: 'Status line in footer' },
  { fg: 'status.warning.content', bg: 'surface.raised', over: 'gradient.surface.end', min: 4.5, use: 'Status line in footer' },
  { fg: 'status.negative.content', bg: 'surface.raised', over: 'gradient.surface.end', min: 4.5, use: 'Status line in footer' },
  { fg: 'status.positive.on-fill', bg: 'status.positive.fill', min: 4.5, use: 'Status band' },
  { fg: 'status.warning.on-fill', bg: 'status.warning.fill', min: 4.5, use: 'Status band' },
  { fg: 'status.negative.on-fill', bg: 'status.negative.fill', min: 4.5, use: 'Status band' },
  { fg: 'data.neutral', bg: 'surface.default', min: 3, use: 'Bars' },
  { fg: 'status.negative.content', bg: 'surface.default', min: 3, use: 'Bars, below target' },
  { fg: 'brand.foreground', bg: 'brand.background', min: 4.5, use: 'Footer text' },
  { fg: 'brand.foreground', bg: 'brand.red', min: 4.5, use: 'Footer text, red' },
  { fg: 'brand.foreground', bg: 'brand.blue', min: 4.5, use: 'Footer text, blue' },
]

// Measures one pair against a token map (keys with the "color." prefix).
export function pairContrast(tokens: Record<string, string>, p: ContrastPair): number | null {
  const keys = [p.fg, p.bg, ...(p.over ? [p.over] : [])]
  // A token map without one of the pair's tokens (for example a partial color-editor set) skips the pair.
  if (keys.some((k) => !tokens['color.' + k])) return null
  const bg = p.over ? composite(tokens['color.' + p.bg], tokens['color.' + p.over]) : tokens['color.' + p.bg]
  return contrast(tokens['color.' + p.fg], bg)
}
