import type { HourPoint } from '../../components/data-viz/HourlyBarChart.vue'

export interface HourlyOeeData {
  location: string
  /** Every hour of the shift, in order. Hours after the current one are drawn as empty slots (value ignored). */
  hourly: HourPoint[]
  /** OEE target per hour, in percent. */
  targetPerHour: number
  /** Index of the hour in progress. Finished hours come before it. */
  currentHourIndex: number
}
