import type { HourPoint } from '../../components/data-viz/HourlyBarChart.vue'
import type { FillStatus } from '../../components/status/status'

// Data shared by the hourly metric slides (Hourly OEE, Hourly counts, Units/man hour).
export interface HourlyMetricData {
  location: string
  /** Shift name as entered ("Shift 2"). */
  shift: string
  shiftStart: Date
  shiftEnd: Date
  hourly: HourPoint[]
  targetPerHour: number
  currentHourIndex: number
  /** The hero value for the shift: OEE (%), total count, or average rate. */
  shiftValue: number
  /** Gap to target for the hero, in the metric's unit. Positive is above target or ahead. */
  shiftGap: number
  /** Optional override; without it a gap of 0 or more is positive, below is negative. */
  status?: FillStatus
}

export type HourlyMetricKind = 'percent' | 'count' | 'rate'
