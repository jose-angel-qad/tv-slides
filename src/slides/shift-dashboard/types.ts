export interface ShiftDashboardLocation {
  id: string
  location: string
  shift: string
  oee: number
  oeeTarget: number
  running: boolean
  downtimeMinutes: number
  /** OEE for each of the last 12 hours, oldest first; the last one is the current hour. */
  hourlyOee: number[]
}

export interface ShiftDashboardData {
  /** Name of the area or slide set shown in the header. */
  location: string
  page?: { index: number; count: number }
  locations: ShiftDashboardLocation[]
}
