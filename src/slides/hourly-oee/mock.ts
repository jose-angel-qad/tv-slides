import type { HourlyOeeData } from './types'

const at = (h: number) => new Date(2026, 10, 18, h)
// An 8-hour shift from 2 p.m. Hours after the current one have no value yet.
const shift = (values: number[]) =>
  Array.from({ length: 8 }, (_, i) => ({ hour: at(14 + i), value: values[i] ?? 0 }))

// Positive: most hours on target, one hour above 100% (handoff scenario), partial current hour.
export const hourlyOeePositive: HourlyOeeData = {
  location: 'Line 1',
  hourly: shift([86.4, 88.1, 79.2, 90.5, 87.3, 101.2, 64.8]),
  targetPerHour: 85,
  currentHourIndex: 6,
}

// Negative: most hours below target, with a long location name in the header.
export const hourlyOeeNegative: HourlyOeeData = {
  location: 'Packaging Line 3 West Mezzanine',
  hourly: shift([82.1, 71.4, 86.0, 63.9, 77.5, 80.2, 41.3]),
  targetPerHour: 85,
  currentHourIndex: 6,
}
