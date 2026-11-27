import type { HourlyOeeData } from './types'

const at = (h: number) => new Date(2026, 10, 18, h)
const hourly = (values: number[]) => values.map((value, i) => ({ hour: at(14 + i), value }))

export const hourlyOeePositive: HourlyOeeData = {
  location: 'Line 1',
  shift: 'Shift 2',
  shiftStart: at(14),
  shiftEnd: at(22),
  hourly: hourly([86.4, 88.1, 79.2, 90.5, 87.3, 101.2, 64.8]),
  targetPerHour: 85,
  currentHourIndex: 6,
  shiftValue: 87.8,
  shiftGap: 2.8,
}

export const hourlyOeeNegative: HourlyOeeData = {
  ...hourlyOeePositive,
  location: 'Packaging Line 3 West Mezzanine',
  hourly: hourly([82.1, 71.4, 86.0, 63.9, 77.5, 80.2, 41.3]),
  shiftValue: 76.9,
  shiftGap: -8.1,
}
