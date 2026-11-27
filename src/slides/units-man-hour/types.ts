import type { HourlyMetricData } from '../_shared/hourlyMetric'

export interface UnitsManHourData extends HourlyMetricData {
  unit: { singular: string; plural: string }
}
