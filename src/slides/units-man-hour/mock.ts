import type { UnitsManHourData } from './types'

const at = (h: number) => new Date(2026, 10, 18, h)
const hourly = (values: number[]) => values.map((value, i) => ({ hour: at(14 + i), value }))

// The current hour carries the rate so far in that hour, so it compares with the target.
export const unitsManHourPositive: UnitsManHourData = {
  location: 'Line 1',
  unit: { singular: 'case', plural: 'cases' },
  hourly: hourly([73.1, 75.4, 70.2, 74.8, 76.0, 72.9, 74.2]),
  targetPerHour: 72,
  currentHourIndex: 6,
}

export const unitsManHourNegative: UnitsManHourData = {
  ...unitsManHourPositive,
  location: 'Packaging Line 3 West Mezzanine',
  hourly: hourly([69.4, 58.2, 73.0, 61.7, 64.3, 66.8, 63.1]),
}
