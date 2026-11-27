import type { LinePoint } from '../../components/data-viz/LineChart.vue'

export type OpenItemKind = 'problem' | 'breakdown' | 'data-sheet'

export interface OpenItem {
  id: string
  kind: OpenItemKind
  name: string
  minutesOpen: number
}

export interface OperationsData {
  location: string
  product: string
  unit: { singular: string; plural: string }
  /** Reliability shows breakdowns; Compliance shows pending data sheets. */
  reliability: boolean
  compliance: boolean
  items: OpenItem[]
  /** Units ahead (+) or behind (-) plan. */
  unitsVsPlan: number
  oee: number
  oeeTarget: number
  endsAt: Date
  trend: LinePoint[]
  targetRate: number
}
