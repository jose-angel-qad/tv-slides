import type { FlowStep } from '../../components/data-viz/StepFlowChart.vue'

export interface LineBalanceData {
  location: string
  shift: string
  unit: { singular: string; plural: string }
  /** Steps in process order. */
  steps: FlowStep[]
  /** WIP at or above this count marks a bottleneck (assumed threshold). */
  wipLimit: number
}
