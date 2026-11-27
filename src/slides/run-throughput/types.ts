import type { HourPoint } from '../../components/data-viz/HourlyBarChart.vue'
import type { FillStatus, Status } from '../../components/status/status'

export interface RunThroughputData {
  location: string
  sku: string
  product: string
  unit: { singular: string; plural: string }
  updatedAt: Date
  /** Units produced in the current run. */
  produced: number
  /** Units planned for the whole run; shown after the value ("of 22,900"). */
  plannedTotal?: number
  /** Units ahead (+) or behind (-) plan. */
  deltaVsPlan: number
  /**
   * Status band for the pace. Optional: the slide's thresholds are not defined yet, so stories pass
   * it explicitly. Without it: ahead or on plan is positive, behind is negative.
   */
  paceStatus?: FillStatus
  endsAt: Date
  /** Planned end of the run. Assumed field; drives the Estimated finish status. */
  plannedEndAt?: Date
  /** Estimated finish status. Optional, same reason as paceStatus. Without it: late by more than 5 min is warning. */
  finishStatus?: Status
  remainingMinutes: number
  crew: number
  crewTarget: number
  hourly: HourPoint[]
  targetPerHour: number
  currentHourIndex: number
}
