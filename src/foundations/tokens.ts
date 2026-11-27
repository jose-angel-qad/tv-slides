import defaults from '../../tokens/tv-colors.json'

export type Mode = 'dark' | 'light'
export type TokenSet = Record<Mode, Record<string, string>>

export const DEFAULT_TOKENS: TokenSet = defaults as TokenSet
export const MODES: Mode[] = ['dark', 'light']

// "color.surface.default" -> "--rz-color-surface-default"
export function cssVarName(token: string): string {
  return '--rz-' + token.replace(/\./g, '-')
}

export function tokensToCss(tokens: TokenSet): string {
  return MODES.map((mode) => {
    const body = Object.entries(tokens[mode])
      .map(([k, v]) => `  ${cssVarName(k)}: ${v};`)
      .join('\n')
    return `[data-theme="${mode}"] {\n${body}\n}`
  }).join('\n\n')
}

export function cloneTokens(t: TokenSet): TokenSet {
  return JSON.parse(JSON.stringify(t))
}

// localStorage key for dev-only color edits (Storybook color editor).
export const TOKEN_STORAGE_KEY = 'rz-tv-color-tokens'

// Dev-only overrides. Each edited value remembers the default it replaced, so when
// tv-colors.json changes, the new default wins over an edit made against the old one.
// Older saved formats are ignored.
interface StoredOverrides {
  v: 2
  overrides: Partial<Record<Mode, Record<string, { value: string; base: string }>>>
}

const HEX = /^#[0-9a-f]{6}([0-9a-f]{2})?$/i
const same = (a: string, b: string) => a.toUpperCase() === b.toUpperCase()

export function encodeOverrides(t: TokenSet): string | null {
  const out: StoredOverrides = { v: 2, overrides: {} }
  let count = 0
  for (const mode of MODES) {
    for (const [k, value] of Object.entries(t[mode])) {
      const base = DEFAULT_TOKENS[mode][k]
      if (base && !same(value, base)) {
        ;(out.overrides[mode] ??= {})[k] = { value, base }
        count++
      }
    }
  }
  return count ? JSON.stringify(out) : null
}

export function decodeOverrides(raw: string | null): TokenSet {
  const t = cloneTokens(DEFAULT_TOKENS)
  if (!raw) return t
  try {
    const saved = JSON.parse(raw) as StoredOverrides
    if (saved?.v !== 2) return t
    for (const mode of MODES) {
      for (const [k, o] of Object.entries(saved.overrides[mode] ?? {})) {
        const base = DEFAULT_TOKENS[mode][k]
        if (base && HEX.test(o.value) && same(o.base, base)) t[mode][k] = o.value
      }
    }
  } catch {
    // Corrupt storage: defaults.
  }
  return t
}
