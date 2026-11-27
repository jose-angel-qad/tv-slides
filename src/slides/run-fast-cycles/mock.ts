import type { RunFastCyclesData } from './types'

export const runFastCyclesPositive: RunFastCyclesData = {
  location: 'Press Shop',
  product: 'BRKT-2210 Mounting bracket, left hand',
  unit: { singular: 'part', plural: 'parts' },
  completed: 3_840,
  planned: 6_000,
  averageSeconds: 42,
  targetSeconds: 45,
  assets: [
    { id: 'p1', name: 'Press 1', cycleSeconds: 41 },
    { id: 'p2', name: 'Press 2', cycleSeconds: 43 },
    { id: 'p3', name: 'Press 3', cycleSeconds: 40 },
    { id: 'p4', name: 'Press 4', cycleSeconds: 44 },
  ],
}

export const runFastCyclesNegative: RunFastCyclesData = {
  ...runFastCyclesPositive,
  location: 'Press Shop Bay 3, progressive die line',
  product: 'BRKT-2210-HD Heavy duty mounting bracket with reinforcement rib, left hand, zinc plated',
  completed: 2_960,
  averageSeconds: 51,
  assets: [
    { id: 'p1', name: 'Press 1', cycleSeconds: 49 },
    { id: 'p2', name: 'Press 2', cycleSeconds: 44 },
    { id: 'p3', name: 'Press 3', cycleSeconds: 58 },
    { id: 'p4', name: 'Press 4 (transfer die)' },
  ],
}
