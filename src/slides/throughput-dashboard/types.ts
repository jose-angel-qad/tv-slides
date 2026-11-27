export interface ThroughputLocation {
  id: string
  location: string
  unit: { singular: string; plural: string }
  produced: number
  /** Units ahead (+) or behind (-) the plan to date. */
  deltaVsPlan: number
  hourly: number[]
  targetPerHour: number
  crew: number
  /** 0 means no crew target. */
  crewTarget: number
}

export interface ThroughputDashboardData {
  location: string
  page?: { index: number; count: number }
  locations: ThroughputLocation[]
}
