import type { RunSpeedData } from './types'

const at = (h: number, m = 0) => new Date(2026, 10, 18, h, m)

export const runSpeedPositive: RunSpeedData = {
  location: 'Line 1',
  sku: '466DHR',
  product: '466DHR GOLD PACKS 11 OZ 12 CS',
  unit: { singular: 'case', plural: 'cases' },
  startedAt: at(12),
  produced: 15_400,
  plannedTotal: 22_900,
  paceTarget: 15_060,
  endsAt: at(28, 12),
  plannedEndAt: at(28, 42),
  currentRate: 452,
  paceRate: 440,
  unplannedDowntimeMinutes: 12,
}

export const runSpeedNegative: RunSpeedData = {
  ...runSpeedPositive,
  location: 'Packaging Line 3 West Mezzanine',
  sku: '7781BX',
  product: '7781BX ORGANIC VANILLA ALMOND BEVERAGE 32 OZ ASEPTIC CARTON 6 PACK',
  produced: 13_980,
  endsAt: at(29, 51),
  currentRate: 398,
  unplannedDowntimeMinutes: 74,
}

// Line stopped: no ETA.
export const runSpeedNoEta: RunSpeedData = { ...runSpeedNegative, endsAt: undefined, currentRate: 0 }
