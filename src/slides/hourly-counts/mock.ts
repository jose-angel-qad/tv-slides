import type { HourlyCountsData } from './types'

const at = (h: number) => new Date(2026, 10, 18, h)
const hourly = (values: number[]) => values.map((value, i) => ({ hour: at(13 + i), value }))

export const hourlyCountsPositive: HourlyCountsData = {
  location: 'Bottling Line 2',
  shift: 'Shift 2',
  shiftStart: at(13),
  shiftEnd: at(21),
  unit: { singular: 'bottle', plural: 'bottles' },
  hourly: hourly([1_240, 1_315, 1_288, 1_190, 1_302, 1_276, 1_334, 410]),
  targetPerHour: 1_250,
  currentHourIndex: 7,
  plannedTotal: 10_000,
  shiftValue: 9_355,
  shiftGap: 105,
}

export const hourlyCountsNegative: HourlyCountsData = {
  ...hourlyCountsPositive,
  location: 'Bottling Line 2 North Hall Extension',
  hourly: hourly([1_180, 1_022, 1_264, 845, 1_105, 1_198, 960, 302]),
  shiftValue: 7_876,
  shiftGap: -1_374,
}
