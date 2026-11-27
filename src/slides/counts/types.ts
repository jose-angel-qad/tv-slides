import type { LinePoint } from '../../components/data-viz/LineChart.vue'
import type { FillStatus } from '../../components/status/status'

export interface CountsData {
  location: string
  shift: string
  unit: { singular: string; plural: string }
  /** Count rate (units per hour), sampled every 10 minutes. */
  trend: LinePoint[]
  targetRate: number
  /** Units per hour over the last 10 minutes. */
  currentRate: number
  producedThisShift: number
  stopMinutes: number
  stops: number
  slowdowns: number
  status?: FillStatus
}
