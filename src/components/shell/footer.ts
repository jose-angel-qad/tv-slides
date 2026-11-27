// Footer tones from Figma ("Last slide", "red-footer", "blue-footer").
export type FooterTone = 'default' | 'red' | 'blue'

// Band color; TvShell paints the same color behind the rounded sheet corners.
export const FOOTER_TONE_BG: Record<FooterTone, string> = {
  default: 'var(--rz-color-brand-background)',
  red: 'var(--rz-color-brand-red)',
  blue: 'var(--rz-color-brand-blue)',
}

// Redzone pattern opacity, left to right, in percent of brand.foreground.
export const FOOTER_PATTERN_ALPHA: Record<FooterTone, [number, number]> = {
  default: [1, 3],
  red: [6, 12],
  blue: [2, 8],
}
