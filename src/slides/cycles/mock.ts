import type { CyclesData } from './types'

export const cyclesPositive: CyclesData = {
  location: 'Kitchen',
  product: 'Tomato basil soup base, 50 gal batch',
  unit: { singular: 'batch', plural: 'batches' },
  completed: 14,
  planned: 24,
  averageActiveSeconds: 41 * 60,
  averageTotalSeconds: 47 * 60,
  assets: [
    { id: 'k1', name: 'Kettle 1', state: 'active', elapsedSeconds: 31 * 60, cycleSeconds: 45 * 60 },
    { id: 'k2', name: 'Kettle 2', state: 'active', elapsedSeconds: 12 * 60, cycleSeconds: 45 * 60 },
    { id: 'k3', name: 'Kettle 3', state: 'active', elapsedSeconds: 40 * 60, cycleSeconds: 45 * 60 },
    { id: 'k4', name: 'Kettle 4', state: 'inactive', cycleSeconds: 45 * 60 },
    { id: 'k5', name: 'Kettle 5', state: 'active', elapsedSeconds: 22 * 60, cycleSeconds: 45 * 60 },
  ],
}

export const cyclesNegative: CyclesData = {
  ...cyclesPositive,
  location: 'Kitchen North, steam jacketed kettles',
  product: 'Roasted red pepper and smoked gouda bisque concentrate, 50 gal batch',
  completed: 9,
  averageActiveSeconds: 52 * 60,
  averageTotalSeconds: 61 * 60,
  assets: [
    { id: 'k1', name: 'Kettle 1', state: 'overrun', elapsedSeconds: 53 * 60 + 10, cycleSeconds: 45 * 60 },
    { id: 'k2', name: 'Kettle 2', state: 'active', elapsedSeconds: 38 * 60, cycleSeconds: 45 * 60 },
    { id: 'k3', name: 'Kettle 3', state: 'rejected', cycleSeconds: 45 * 60 },
    { id: 'k4', name: 'Kettle 4', state: 'overrun', elapsedSeconds: 47 * 60 + 40, cycleSeconds: 45 * 60 },
    { id: 'k5', name: 'Kettle 5', state: 'no-product', cycleSeconds: 45 * 60 },
    { id: 'k6', name: 'Kettle 6', state: 'active', elapsedSeconds: 9 * 60, cycleSeconds: 45 * 60 },
  ],
}
