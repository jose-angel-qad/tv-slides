import type { CompanyUpdateData } from './types'

// Placeholder uploads (generic artwork, not a real company). Colors live inside the image, as in a
// real upload; they are content, not UI tokens.
const svg = (w: number, h: number, title: string, line: string) =>
  `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><rect width="${w}" height="${h}" fill="#1F4E79"/><circle cx="${w * 0.82}" cy="${h * 0.22}" r="${Math.min(w, h) * 0.16}" fill="#F2B134"/><rect x="${w * 0.08}" y="${h * 0.62}" width="${w * 0.84}" height="${h * 0.012}" fill="#FFFFFF" opacity="0.4"/><text x="${w * 0.08}" y="${h * 0.48}" font-family="Inter, Arial, sans-serif" font-size="${Math.min(w, h) * 0.1}" font-weight="700" fill="#FFFFFF">${title}</text><text x="${w * 0.08}" y="${h * 0.74}" font-family="Inter, Arial, sans-serif" font-size="${Math.min(w, h) * 0.045}" fill="#FFFFFF">${line}</text></svg>`)}`

// A PDF page: white paper with a heading and lines of text.
const pdfPage = (n: number) =>
  `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="850" height="1100" viewBox="0 0 850 1100"><rect width="850" height="1100" fill="#FFFFFF"/><rect x="70" y="80" width="710" height="8" fill="#1F4E79"/><text x="70" y="170" font-family="Inter, Arial, sans-serif" font-size="56" font-weight="700" fill="#1A1A1A">Safety bulletin</text><text x="70" y="230" font-family="Inter, Arial, sans-serif" font-size="30" fill="#555555">Section ${n}: safe lifting</text>${Array.from({ length: 14 }, (_, i) => `<rect x="70" y="${300 + i * 48}" width="${i % 4 === 3 ? 420 : 710}" height="18" rx="4" fill="#D9DDE3"/>`).join('')}</svg>`)}`

export const companyUpdateLandscape: CompanyUpdateData = {
  title: 'Holiday schedule',
  src: svg(1600, 900, 'Holiday schedule', 'Plant closed Dec 25 and Jan 1. Overtime sign-up in the break room.'),
  alt: 'Holiday schedule: plant closed December 25 and January 1. Overtime sign-up in the break room.',
}

export const companyUpdatePortrait: CompanyUpdateData = {
  title: 'Lift safe',
  src: svg(900, 1200, 'Lift safe', 'Bend your knees.'),
  alt: 'Lift safe: bend your knees.',
}

export const companyUpdatePdf: CompanyUpdateData = {
  title: 'Safety bulletin, November',
  src: pdfPage(1),
  alt: 'Safety bulletin, section 1: safe lifting.',
  page: { index: 1, count: 3 },
}

export const companyUpdateEmpty: CompanyUpdateData = {}

export const companyUpdateLoading: CompanyUpdateData = { title: 'Holiday schedule', loading: true }
