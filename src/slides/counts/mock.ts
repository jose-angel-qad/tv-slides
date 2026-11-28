import type { CountsData } from './types'

const start = new Date(2026, 10, 18, 14).getTime()
// One sample every 10 minutes, 2:00 PM to 8:20 PM.
const trend = (values: number[]) => values.map((value, i) => ({ t: new Date(start + i * 600_000), value }))

const steady = [
  438, 446, 452, 449, 441, 455, 450, 447, 452, 458, 449, 444, 451, 447, 452, 449, 318, 446, 452, 455,
  449, 443, 450, 458, 452, 447, 441, 449, 454, 451, 446, 452, 457, 448, 450, 455, 449, 452, 453,
]
const unsteady = [
  420, 431, 402, 0, 0, 0, 288, 410, 395, 388, 301, 296, 410, 422, 405, 0, 0, 0, 0, 250, 402, 398,
  385, 410, 296, 288, 402, 395, 410, 380, 371, 402, 395, 0, 0, 0, 0, 0, 0,
]

// Steady: no stops, one short slowdown.
export const countsPositive: CountsData = {
  location: 'Line 1',
  unit: { singular: 'case', plural: 'cases' },
  trend: trend(steady),
  targetRate: 440,
}

// Unsteady, and stopped right now.
export const countsNegative: CountsData = {
  ...countsPositive,
  location: 'Packaging Line 3 West Mezzanine',
  trend: trend(unsteady),
}
