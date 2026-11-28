import type { WelcomeData } from './types'

// Placeholder portraits: abstract artwork, not real people. Colors are image content.
const avatar = (bg: string, fg: string) =>
  `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400"><rect width="400" height="400" fill="${bg}"/><circle cx="200" cy="160" r="80" fill="${fg}"/><rect x="80" y="260" width="240" height="180" rx="120" fill="${fg}"/></svg>`)}`
const at = (d: number) => new Date(2026, 10, d)

export const welcomePositive: WelcomeData = {
  location: 'All areas',
  hires: [
    { id: 'h1', name: 'Aisha Rahman', role: 'Maintenance technician, Packaging', startedAt: at(16), intro: 'Ten years on filling lines. Ask me about servo drives and fishing.', photo: avatar('#C8D7F0', '#5A6F96') },
    { id: 'h2', name: 'Diego Hernández Villalobos', role: 'Line operator, Line 3', startedAt: at(17), intro: 'Moved here from our Monterrey plant. Loves soccer and barbecue.', photo: avatar('#E8D5C0', '#8F6A4A') },
    { id: 'h3', name: 'Lena Fischer', role: 'Quality technician, Lab', startedAt: at(18), intro: 'Food science graduate. First job on a plant floor.' },
  ],
}

// One new hire.
export const welcomeOne: WelcomeData = { location: 'All areas', hires: welcomePositive.hires.slice(0, 1) }

// Many new hires: page 1 of 2.
export const welcomeMany: WelcomeData = { ...welcomePositive, page: { index: 1, count: 2 } }

export const welcomeNegative: WelcomeData = { location: 'All areas', hires: [] }
