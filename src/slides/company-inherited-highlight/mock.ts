import type { CompanyHighlightData } from './types'

const art = `data:image/svg+xml;utf8,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="900" viewBox="0 0 1200 900"><rect width="1200" height="900" fill="#2F5D50"/><circle cx="600" cy="420" r="260" fill="#F2B134"/><rect x="420" y="640" width="360" height="60" rx="30" fill="#FFFFFF" opacity="0.5"/></svg>')}`

export const companyHighlightPositive: CompanyHighlightData = {
  location: 'All areas',
  source: 'Shared by the company with all sites',
  sharedAt: new Date(2026, 10, 17),
  headline: '1 million safe hours across all plants',
  message: 'Every site reached the milestone this month. Thank you for looking out for each other on every shift.',
  image: { src: art, alt: 'Illustration of a gold medal' },
}

// Text only, a long message.
export const companyHighlightText: CompanyHighlightData = {
  location: 'All areas',
  source: 'Shared by the North America region',
  sharedAt: new Date(2026, 10, 16),
  headline: 'Winter weather plan starts Monday',
  message:
    'Parking lot B closes for snow storage. Use the north entrance and allow ten extra minutes. Shift leaders will confirm call-in times by text if roads close, so check that your phone number is current with HR this week.',
}

// Nothing shared yet.
export const companyHighlightNegative: CompanyHighlightData = { location: 'All areas', source: 'Shared by the company with all sites' }
