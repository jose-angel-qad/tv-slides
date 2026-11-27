import type { ShiftDashboardData, ShiftDashboardLocation } from './types'

const loc = (id: string, location: string, oee: number, running: boolean, downtime: number, hourly: number[]): ShiftDashboardLocation => ({
  id,
  location,
  shift: 'Shift 2',
  oee,
  oeeTarget: 80,
  running,
  downtimeMinutes: downtime,
  hourlyOee: hourly,
})

export const shiftDashboardPositive: ShiftDashboardData = {
  location: 'Packaging area',
  locations: [
    loc('l1', 'Line 1', 86.4, true, 14, [84, 88, 86, 90, 82, 87, 85, 89, 86, 88, 84, 41]),
    loc('l2', 'Line 2', 83.1, true, 22, [80, 82, 85, 79, 84, 86, 83, 81, 85, 84, 82, 38]),
    loc('l3', 'Line 3', 88.9, true, 9, [87, 90, 89, 91, 88, 86, 90, 89, 92, 88, 90, 45]),
    loc('l4', 'Bottling Line 4', 81.5, true, 27, [79, 83, 81, 84, 80, 82, 85, 78, 83, 82, 81, 36]),
  ],
}

export const shiftDashboardNegative: ShiftDashboardData = {
  location: 'Packaging area',
  page: { index: 1, count: 2 },
  locations: [
    loc('l1', 'Line 1', 86.4, true, 14, [84, 88, 86, 90, 82, 87, 85, 89, 86, 88, 84, 41]),
    loc('l2', 'Line 2', 64.2, false, 96, [80, 72, 65, 58, 70, 62, 55, 68, 61, 59, 64, 12]),
    loc('l3', 'Packaging Line 3 West Mezzanine', 71.8, true, 58, [76, 70, 82, 68, 74, 66, 79, 71, 73, 69, 75, 30]),
    loc('l4', 'Bottling Line 4', 81.5, true, 27, [79, 83, 81, 84, 80, 82, 85, 78, 83, 82, 81, 36]),
    loc('l5', 'Line 5', 52.6, false, 143, [61, 55, 48, 60, 52, 44, 57, 50, 49, 53, 51, 5]),
    loc('l6', 'Line 6', 84.0, true, 18, [82, 85, 84, 86, 83, 85, 82, 87, 84, 86, 83, 40]),
    loc('l7', 'Line 7', 79.3, true, 35, [81, 78, 80, 77, 82, 79, 76, 80, 79, 81, 78, 33]),
    loc('l8', 'Line 8', 90.2, true, 7, [89, 91, 90, 92, 88, 91, 90, 93, 89, 90, 91, 44]),
  ],
}
