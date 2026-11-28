export interface ScoreboardLocation {
  id: string
  location: string
  oee: number
  oeeTarget: number
  /** Minutes late (+) or early (-) at shift start. Undefined before the start is known. */
  startMinutes?: number
  /** Average changeover in minutes, with its target. Undefined when there was no changeover. */
  changeoverMinutes?: number
  changeoverTarget: number
  points: number
}

export interface ScoreboardData {
  location: string
  shift: string
  /** Shown when the locations need more than one page (6 per page). */
  page?: { index: number; count: number }
  locations: ScoreboardLocation[]
}
