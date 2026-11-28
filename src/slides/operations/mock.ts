import type { OperationsData } from './types'

const start = new Date(2026, 10, 18, 14).getTime()
const trend = (values: number[]) => values.map((value, i) => ({ t: new Date(start + i * 1_200_000), value }))

export const operationsPositive: OperationsData = {
  location: 'Line 1',
  product: '466DHR GOLD PACKS 11 OZ 12 CS',
  unit: { singular: 'case', plural: 'cases' },
  reliability: true,
  compliance: true,
  items: [{ id: 'd1', kind: 'data-sheet', name: 'Hourly weight check', minutesOpen: 8 }],
  unitsVsPlan: 120,
  oee: 91.7,
  oeeTarget: 85,
  endsAt: new Date(2026, 10, 19, 4, 42),
  trend: trend([438, 446, 452, 449, 441, 455, 450, 447, 452, 458, 449, 444, 451, 447, 452, 455, 449, 443, 450, 453]),
  targetRate: 440,
}

export const operationsNegative: OperationsData = {
  ...operationsPositive,
  location: 'Packaging Line 3 West Mezzanine',
  product: '7781BX ORGANIC VANILLA ALMOND BEVERAGE 32 OZ ASEPTIC CARTON 6 PACK',
  items: [
    { id: 'b1', kind: 'breakdown', name: 'Case sealer motor overload', minutesOpen: 46 },
    { id: 'p1', kind: 'problem', name: 'Filler jam at the capper infeed star wheel', minutesOpen: 32 },
    { id: 'p2', kind: 'problem', name: 'Slow running', minutesOpen: 18 },
    { id: 'd1', kind: 'data-sheet', name: 'Hourly weight check', minutesOpen: 24 },
    { id: 'd2', kind: 'data-sheet', name: 'Metal detector verification', minutesOpen: 11 },
  ],
  unitsVsPlan: -390,
  oee: 71.2,
  trend: trend([420, 431, 402, 0, 0, 288, 410, 395, 388, 301, 296, 410, 422, 405, 0, 0, 250, 402, 398, 385]),
}

// Reliability and Compliance off: only problems.
export const operationsBasic: OperationsData = { ...operationsNegative, reliability: false, compliance: false }

// Nothing open (guide handoff scenario).
export const operationsNoItems: OperationsData = { ...operationsPositive, items: [] }
