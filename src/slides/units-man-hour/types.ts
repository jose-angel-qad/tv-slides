import type { HourPoint } from '../../components/data-viz/HourlyBarChart.vue'

export interface UnitsManHourData {
  location: string
  unit: { singular: string; plural: string }
  /** Every hour of the shift, in order. Hours after the current one are drawn as empty slots. */
  hourly: HourPoint[]
  /** Units per man hour target, per hour. */
  targetPerHour: number
  /** Index of the hour in progress. Finished hours come before it. */
  currentHourIndex: number
}
