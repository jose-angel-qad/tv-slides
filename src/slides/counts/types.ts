import type { LinePoint } from '../../components/data-viz/LineChart.vue'

export interface CountsData {
  location: string
  unit: { singular: string; plural: string }
  /** Count rate (units per hour), one sample every 10 minutes since the shift started; the last one is now. */
  trend: LinePoint[]
  targetRate: number
}
