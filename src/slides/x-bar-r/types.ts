import type { LinePoint } from '../../components/data-viz/LineChart.vue'

export interface XBarRData {
  location: string
  characteristic: string
  unit: string
  /** Subgroup means and ranges, oldest first. */
  xbar: LinePoint[]
  range: LinePoint[]
  limits: { ucl: number; center: number; lcl: number; usl: number; lsl: number; rUcl: number; rBar: number }
  cp: number
  cpk: number
  /** Minimum capability (assumed 1.33). */
  capabilityTarget: number
  decimals: number
}
