import type { HourlyMetricData } from '../_shared/hourlyMetric'

export interface HourlyCountsData extends HourlyMetricData {
  unit: { singular: string; plural: string }
  /** Units planned for the whole shift ("of 3,520"). */
  plannedTotal?: number
}
