export interface MaintenanceLocation {
  id: string
  location: string
  /** Active issue, or undefined when the line runs normally. */
  issue?: { name: string; minutes: number }
  product?: string
  /** Counts. Meaning assumed, see questions.md: PM, WO, CL, OD. */
  pm: number
  wo: number
  cl: number
  od: number
}

export interface MaintenanceStatusData {
  location: string
  /** A count at or above its limit needs attention (assumed limits). */
  limits: { pm: number; wo: number; cl: number; od: number }
  locations: MaintenanceLocation[]
}
