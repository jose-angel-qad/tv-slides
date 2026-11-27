import type { DiscreteLocationData } from './types'

const at = (h: number) => new Date(2026, 10, 18, h)
const hourly = (values: number[]) => values.map((value, i) => ({ hour: at(14 + i), value }))

export const discreteLocationPositive: DiscreteLocationData = {
  location: 'Final Assembly',
  shift: 'Shift 2',
  unit: { singular: 'unit', plural: 'units' },
  finished: 214,
  plannedTotal: 280,
  deltaVsPlan: 9,
  oee: 84.6,
  oeeTarget: 80,
  cycleSeconds: 102,
  unitsPerHour: 35.3,
  quality: 98.6,
  reworked: 3,
  hourly: hourly([34, 36, 35, 33, 37, 36, 12]),
  targetPerHour: 34,
  currentHourIndex: 6,
}

export const discreteLocationNegative: DiscreteLocationData = {
  ...discreteLocationPositive,
  location: 'Final Assembly Cell 4 Electrical Harness',
  finished: 168,
  deltaVsPlan: -37,
  oee: 66.2,
  cycleSeconds: 131,
  unitsPerHour: 27.5,
  quality: 93.4,
  reworked: 11,
  hourly: hourly([31, 26, 29, 22, 30, 25, 5]),
}
