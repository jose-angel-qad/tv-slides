import type { NewsData } from './types'

const at = (h: number, m = 0) => new Date(2026, 10, 18, h, m)

export const newsPositive: NewsData = {
  location: 'Packaging area',
  page: { index: 1, count: 3 },
  items: [
    { id: 'n1', type: 'high-five', at: at(20, 5), author: 'Maria Gonzalez', text: 'Line 8 hit 26 Victory Points tonight. Great teamwork on the 7 PM changeover, done in 19 minutes.' },
    { id: 'n2', type: 'alert', at: at(19, 40), author: 'Quality', text: 'Hold on lot 4471-B until the seal integrity check is complete. Do not ship pallets from Line 3.' },
    { id: 'n3', type: 'chat', at: at(18, 55), author: 'Sam Patel', text: 'Forklift training moved to Thursday at 2:00 PM in the break room.' },
    { id: 'n4', type: 'high-five', at: at(17, 30), author: 'Plant manager', text: '30 days without a recordable injury. Thank you, everyone.' },
  ],
}

export const newsNegative: NewsData = { location: 'Packaging area', page: { index: 1, count: 1 }, items: [] }
