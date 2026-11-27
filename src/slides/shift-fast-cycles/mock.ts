import type { ShiftFastCyclesData } from './types'

export const shiftFastCyclesPositive: ShiftFastCyclesData = {
  location: 'Molding',
  shift: 'Shift 2',
  unit: { singular: 'part', plural: 'parts' },
  shiftUnits: 3_915,
  yieldPercent: 99.1,
  problems: 2,
  oee: 86.3,
  oeeTarget: 80,
  averageSeconds: 28,
  targetSeconds: 30,
  assets: [
    { id: 'm1', name: 'Molder 1', cycleSeconds: 27 },
    { id: 'm2', name: 'Molder 2', cycleSeconds: 29 },
    { id: 'm3', name: 'Molder 3', cycleSeconds: 28 },
    { id: 'm4', name: 'Molder 4', cycleSeconds: 30 },
    { id: 'm5', name: 'Molder 5', cycleSeconds: 26 },
    { id: 'm6', name: 'Molder 6', cycleSeconds: 29 },
  ],
}

export const shiftFastCyclesNegative: ShiftFastCyclesData = {
  ...shiftFastCyclesPositive,
  location: 'Molding Hall B, two-shot injection cells',
  shiftUnits: 2_842,
  yieldPercent: 94.6,
  problems: 9,
  oee: 68.4,
  averageSeconds: 34,
  assets: [
    { id: 'm1', name: 'Molder 1', cycleSeconds: 31 },
    { id: 'm2', name: 'Molder 2', cycleSeconds: 29 },
    { id: 'm3', name: 'Molder 3 two-shot overmold', cycleSeconds: 41 },
    { id: 'm4', name: 'Molder 4', cycleSeconds: 33 },
    { id: 'm5', name: 'Molder 5' },
    { id: 'm6', name: 'Molder 6', cycleSeconds: 28 },
  ],
}
