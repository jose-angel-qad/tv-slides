import type { HourPoint } from '../../components/data-viz/HourlyBarChart.vue'
import type { FillStatus } from '../../components/status/status'

export interface ShiftThroughputData {
  location: string
  /** Shift name as entered ("Shift 2"). */
  shift: string
  shiftStart: Date
  shiftEnd: Date
  unit: { singular: string; plural: string }
  /** Units produced so far this shift. */
  produced: number
  /** Units planned for the whole shift ("of 3,520"). */
  plannedTotal?: number
  /** Units ahead (+) or behind (-) the plan to date. */
  deltaVsPlan: number
  /** Optional override; without it ahead or on plan is positive, behind is negative. */
  paceStatus?: FillStatus
  crew: number
  crewTarget: number
  hourly: HourPoint[]
  targetPerHour: number
  currentHourIndex: number
}
