import type { RunState } from '../../components/status/runState'
import type { ShiftDashboardData, ShiftDashboardLocation } from './types'

const loc = (
  id: string,
  location: string,
  shift: string,
  oee: number,
  state: RunState,
  downtime: number,
  hourly: number[],
): ShiftDashboardLocation => ({ id, location, shift, oee, oeeTarget: 80, state, downtimeMinutes: downtime, hourlyOee: hourly })

// Positive: every line on target and running.
export const shiftDashboardPositive: ShiftDashboardData = {
  location: 'Packaging area',
  locations: [
    loc('l1', 'Line 1', 'Shift 2', 86.4, 'running', 14, [84, 88, 86, 90, 82, 87, 85, 89, 86, 88, 84, 41]),
    loc('l2', 'Line 2', 'Shift 2', 83.1, 'running', 22, [80, 82, 85, 79, 84, 86, 83, 81, 85, 84, 82, 38]),
    loc('l3', 'Line 3', 'Shift 2', 88.9, 'running', 9, [87, 90, 89, 91, 88, 86, 90, 89, 92, 88, 90, 45]),
    loc('l4', 'Bottling Line 4', 'Shift 2', 81.5, 'running', 27, [79, 83, 81, 84, 80, 82, 85, 78, 83, 82, 81, 36]),
  ],
}

// Negative: a full page of 6 (page 1 of 2), a stopped line, a breakdown, a changeover, a long location
// name and a long shift name (so the shift shows per row).
export const shiftDashboardNegative: ShiftDashboardData = {
  location: 'Packaging area',
  page: { index: 1, count: 2 },
  locations: [
    loc('l1', 'Line 1', 'Shift 2', 86.4, 'running', 14, [84, 88, 86, 90, 82, 87, 85, 89, 86, 88, 84, 41]),
    loc('l2', 'Line 2', 'Shift 2', 64.2, 'stopped', 96, [80, 72, 65, 58, 70, 62, 55, 68, 61, 59, 64, 12]),
    loc('l3', 'Packaging Line 3 West Mezzanine', 'Second shift, weekend crew', 71.8, 'running', 58, [76, 70, 82, 68, 74, 66, 79, 71, 73, 69, 75, 30]),
    loc('l4', 'Bottling Line 4', 'Shift 2', 81.5, 'changeover', 27, [79, 83, 81, 84, 80, 82, 85, 78, 83, 82, 81, 36]),
    loc('l5', 'Line 5', 'Shift 2', 52.6, 'breakdown', 143, [61, 55, 48, 60, 52, 44, 57, 50, 49, 53, 51, 5]),
    loc('l6', 'Line 6', 'Shift 2', 84.0, 'running', 0, [82, 85, 84, 86, 83, 85, 82, 87, 84, 86, 83, 40]),
  ],
}
