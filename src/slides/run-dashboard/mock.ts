import type { RunDashboardData } from './types'

const cases = { singular: 'case', plural: 'cases' }
const run = (product: string, completed: number, planned: number, oee: number, quality: number) => ({
  product,
  unit: cases,
  completed,
  planned,
  oee,
  oeeTarget: 80,
  quality,
  qualityTarget: 98,
})

export const runDashboardPositive: RunDashboardData = {
  location: 'Packaging area',
  locations: [
    { id: 'l1', location: 'Line 1', run: run('466DHR GOLD PACKS 11 OZ 12 CS', 15_400, 22_900, 86.4, 99.2) },
    { id: 'l2', location: 'Line 2', run: run('212KLM CLASSIC PRETZEL TWISTS 16 OZ', 8_120, 12_000, 83.1, 98.8) },
    { id: 'l3', location: 'Line 3', run: run('530PQR TRAIL MIX VARIETY 24 CT', 6_000, 6_000, 88.9, 99.5) },
    { id: 'l4', location: 'Bottling Line 4', run: run('118SPW SPARKLING WATER LIME 12 OZ 24 PK', 30_450, 48_000, 81.5, 98.4) },
  ],
}

export const runDashboardNegative: RunDashboardData = {
  location: 'Packaging area',
  locations: [
    { id: 'l1', location: 'Line 1', run: run('466DHR GOLD PACKS 11 OZ 12 CS', 15_400, 22_900, 86.4, 99.2) },
    { id: 'l2', location: 'Line 2', run: run('212KLM CLASSIC PRETZEL TWISTS 16 OZ', 5_210, 12_000, 64.2, 95.1) },
    {
      id: 'l3',
      location: 'Packaging Line 3 West Mezzanine',
      run: run('7781BX ORGANIC VANILLA ALMOND BEVERAGE 32 OZ ASEPTIC CARTON 6 PACK', 9_800, 22_900, 71.8, 97.2),
    },
    { id: 'l4', location: 'Bottling Line 4' },
    { id: 'l5', location: 'Line 5', run: run('530PQR TRAIL MIX VARIETY 24 CT', 6_000, 6_000, 82.0, 99.1) },
  ],
}
