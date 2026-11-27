import type { HourPoint } from '../../components/data-viz/HourlyBarChart.vue'
import type { FillStatus } from '../../components/status/status'

export interface DiscreteLocationData {
  location: string
  shift: string
  unit: { singular: string; plural: string }
  finished: number
  plannedTotal?: number
  /** Units ahead (+) or behind (-) the plan to date. */
  deltaVsPlan: number
  status?: FillStatus
  oee: number
  oeeTarget: number
  /** Average cycle time in seconds. */
  cycleSeconds: number
  unitsPerHour: number
  /** First-pass quality, percent. */
  quality: number
  reworked: number
  hourly: HourPoint[]
  targetPerHour: number
  currentHourIndex: number
}
