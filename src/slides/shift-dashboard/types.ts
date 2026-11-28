import type { RunState } from '../../components/status/runState'

export interface ShiftDashboardLocation {
  id: string
  location: string
  /** Shift name as entered by the plant ("Shift 2", "2nd", "Night"). */
  shift: string
  oee: number
  oeeTarget: number
  /** Run state now (Run status badge). */
  state: RunState
  /** Downtime so far this shift, in minutes. */
  downtimeMinutes: number
  /** OEE for each of the last 12 hours, oldest first; the last one is the current hour. */
  hourlyOee: number[]
}

export interface ShiftDashboardData {
  /** Name of the area or slide set shown in the header. */
  location: string
  /** Shown when the locations need more than one page (6 per page). */
  page?: { index: number; count: number }
  locations: ShiftDashboardLocation[]
}
