import type { CompanyUpdateData } from './types'

// Placeholder uploads (generic artwork, not a real company). Colors live inside the image, as in a
// real upload; they are content, not UI tokens.
const svg = (w: number, h: number, title: string, line: string) =>
  `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><rect width="${w}" height="${h}" fill="#1F4E79"/><circle cx="${w * 0.82}" cy="${h * 0.22}" r="${h * 0.18}" fill="#F2B134"/><rect x="${w * 0.08}" y="${h * 0.62}" width="${w * 0.84}" height="${h * 0.02}" fill="#FFFFFF" opacity="0.4"/><text x="${w * 0.08}" y="${h * 0.45}" font-family="Inter, Arial, sans-serif" font-size="${h * 0.11}" font-weight="700" fill="#FFFFFF">${title}</text><text x="${w * 0.08}" y="${h * 0.76}" font-family="Inter, Arial, sans-serif" font-size="${h * 0.05}" fill="#FFFFFF">${line}</text></svg>`)}`

export const companyUpdatePositive: CompanyUpdateData = {
  location: 'All areas',
  title: 'Holiday schedule',
  src: svg(1600, 900, 'Holiday schedule', 'Plant closed Dec 25 and Jan 1. Overtime sign-up in the break room.'),
  alt: 'Holiday schedule: plant closed December 25 and January 1. Overtime sign-up in the break room.',
}

export const companyUpdatePortrait: CompanyUpdateData = {
  location: 'All areas',
  title: 'Safety bulletin',
  src: svg(900, 1200, 'Lift safe', 'Bend your knees.'),
  alt: 'Safety bulletin: lift safe, bend your knees.',
  page: { index: 1, count: 3 },
}

// The file cannot load.
export const companyUpdateNegative: CompanyUpdateData = {
  location: 'All areas',
  title: 'Holiday schedule',
  src: 'data:image/png;base64,broken',
  alt: 'Holiday schedule',
}
