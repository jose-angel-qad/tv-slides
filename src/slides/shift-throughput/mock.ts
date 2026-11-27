import type { ShiftThroughputData } from './types'

const at = (h: number, m = 0) => new Date(2026, 10, 18, h, m)
const hourly = (values: number[]) => values.map((value, i) => ({ hour: at(14 + i), value }))

export const shiftThroughputPositive: ShiftThroughputData = {
  location: 'Line 1',
  shift: 'Shift 2',
  shiftStart: at(14),
  shiftEnd: at(22),
  unit: { singular: 'case', plural: 'cases' },
  produced: 2_740,
  plannedTotal: 3_520,
  deltaVsPlan: 120,
  crew: 6.2,
  crewTarget: 6.0,
  hourly: hourly([452, 461, 447, 438, 455, 469, 218]),
  targetPerHour: 440,
  currentHourIndex: 6,
}

export const shiftThroughputNegative: ShiftThroughputData = {
  ...shiftThroughputPositive,
  location: 'Packaging Line 3 West Mezzanine',
  produced: 2_390,
  deltaVsPlan: -230,
  crew: 4.8,
  hourly: hourly([431, 402, 447, 356, 389, 412, 153]),
}

// No crew target set (target 0): the crew value stays neutral.
export const shiftThroughputNoCrewTarget: ShiftThroughputData = {
  ...shiftThroughputPositive,
  crewTarget: 0,
}
