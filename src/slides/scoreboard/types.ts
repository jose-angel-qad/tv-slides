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
  locations: ScoreboardLocation[]
}
