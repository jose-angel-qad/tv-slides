export interface RunDashboardLocation {
  id: string
  location: string
  /** Undefined when the location has no active run. */
  run?: {
    product: string
    unit: { singular: string; plural: string }
    completed: number
    planned: number
    oee: number
    oeeTarget: number
    /** First-pass quality, percent. */
    quality: number
    qualityTarget: number
  }
}

export interface RunDashboardData {
  location: string
  locations: RunDashboardLocation[]
}
