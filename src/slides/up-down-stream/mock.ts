import type { UpDownStreamData } from './types'

const at = (h: number, m = 0) => new Date(2026, 10, 18, h, m)
const kg = { singular: 'kg', plural: 'kg' }
const cases = { singular: 'case', plural: 'cases' }

export const upDownStreamPositive: UpDownStreamData = {
  location: 'Packaging hall',
  locations: [
    { id: 'm', location: 'Mixing', product: 'DOUGH BASE 22 WHOLE WHEAT', unit: kg, completed: 4_200, planned: 6_000, running: true, scheduleMinutes: 14, endsAt: at(22, 10) },
    { id: 'o', location: 'Oven 2', product: 'WHOLE WHEAT CRACKER SHEETS', unit: kg, completed: 3_650, planned: 6_000, running: true, scheduleMinutes: 6, endsAt: at(22, 40) },
    { id: 'c', location: 'Cooling tunnel', product: 'WHOLE WHEAT CRACKER SHEETS', unit: kg, completed: 3_400, planned: 6_000, running: true, scheduleMinutes: 2, endsAt: at(23, 5) },
    { id: 'p', location: 'Line 1', product: '466DHR GOLD PACKS 11 OZ 12 CS', unit: cases, completed: 1_520, planned: 2_800, running: true, scheduleMinutes: 0, endsAt: at(23, 30) },
  ],
}

export const upDownStreamNegative: UpDownStreamData = {
  location: 'Packaging hall',
  locations: [
    { id: 'm', location: 'Mixing', product: 'DOUGH BASE 22 WHOLE WHEAT', unit: kg, completed: 4_200, planned: 6_000, running: true, scheduleMinutes: 14, endsAt: at(22, 10) },
    { id: 'o', location: 'Oven 2 tunnel oven, gas fired, north side', product: 'WHOLE WHEAT CRACKER SHEETS ROSEMARY AND SEA SALT', unit: kg, completed: 2_900, planned: 6_000, running: false, scheduleMinutes: -34 },
    { id: 'c', location: 'Cooling tunnel', product: 'WHOLE WHEAT CRACKER SHEETS', unit: kg, completed: 2_750, planned: 6_000, running: true, scheduleMinutes: -21, endsAt: at(23, 41) },
    { id: 'p', location: 'Line 1', product: '466DHR GOLD PACKS 11 OZ 12 CS', unit: cases, completed: 1_210, planned: 2_800, running: true, scheduleMinutes: -48, endsAt: at(0, 18) },
  ],
}
