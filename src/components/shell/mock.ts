import type { SlideHeaderProps } from './SlideHeader.vue'
import type { FooterBrandBarProps } from './FooterBrandBar.vue'

export const shellHeader: SlideHeaderProps = {
  location: 'Line 1',
  slideType: 'Run throughput',
  showControls: true,
  now: new Date(2026, 10, 18, 20, 20),
  dwellSeconds: 30,
}

// Footer tones, all with the Redzone logo as fallback.
export const shellFooter: FooterBrandBarProps = { tone: 'default', appVersion: '67.0', build: '1' }
export const shellFooterRed: FooterBrandBarProps = { tone: 'red', appVersion: '67.0', build: '1' }
export const shellFooterBlue: FooterBrandBarProps = { tone: 'blue', appVersion: '67.0', build: '1' }

// Placeholder customer logo (generic, not a real company), white for the dark footer band.
const customerSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="360" height="64" viewBox="0 0 360 64"><rect x="0" y="8" width="48" height="48" rx="12" fill="#ffffff"/><path d="M14 40l10-16 10 16z" fill="#111215"/><text x="64" y="44" font-family="Inter, Arial, sans-serif" font-size="34" font-weight="700" fill="#ffffff">Northfield Foods</text></svg>`
export const customerLogo = `data:image/svg+xml;utf8,${encodeURIComponent(customerSvg)}`

export const shellFooterCustomer: FooterBrandBarProps = {
  tone: 'default',
  appVersion: '67.0',
  build: '1',
  logoSrc: customerLogo,
  logoAlt: 'Northfield Foods',
}
