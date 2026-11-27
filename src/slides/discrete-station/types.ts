import type { HourPoint } from '../../components/data-viz/HourlyBarChart.vue'

export type StationState = 'working' | 'idle' | 'over'

export interface DiscreteStationData {
  location: string
  station: string
  state: StationState
  /** Seconds left in the step (working), idle seconds (idle), or seconds over (over). */
  timerSeconds: number
  stepTargetSeconds: number
  stepsCompleted: number
  averageStepSeconds: number
  quality: number
  problems: { id: string; name: string; minutes: number }[]
  hourly: HourPoint[]
  targetPerHour: number
  currentHourIndex: number
}
