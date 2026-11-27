export interface LeaderboardLocation {
  id: string
  location: string
  /** Points earned each finished hour this shift (4, 2, 1 or 0). */
  hourlyPoints: number[]
}

export interface LeaderboardData {
  location: string
  shift: string
  locations: LeaderboardLocation[]
}
