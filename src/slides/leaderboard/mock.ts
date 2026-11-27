import type { LeaderboardData } from './types'

export const leaderboardPositive: LeaderboardData = {
  location: 'Packaging area',
  shift: 'Shift 2',
  locations: [
    { id: 'l1', location: 'Line 1', hourlyPoints: [4, 2, 4, 4, 2, 4] },
    { id: 'l2', location: 'Line 2', hourlyPoints: [2, 2, 1, 4, 2, 2] },
    { id: 'l3', location: 'Packaging Line 3 West Mezzanine', hourlyPoints: [1, 0, 2, 2, 1, 2] },
    { id: 'l4', location: 'Bottling Line 4', hourlyPoints: [4, 4, 2, 2, 4, 2] },
    { id: 'l5', location: 'Line 5', hourlyPoints: [0, 1, 0, 2, 1, 0] },
    { id: 'l6', location: 'Line 8', hourlyPoints: [4, 4, 4, 2, 4, 4] },
  ],
}

// Tie for first place.
export const leaderboardNegative: LeaderboardData = {
  ...leaderboardPositive,
  locations: [
    { id: 'l1', location: 'Line 1', hourlyPoints: [4, 2, 4, 4, 2, 4] },
    { id: 'l2', location: 'Line 2', hourlyPoints: [2, 2, 1, 0, 0, 1] },
    { id: 'l4', location: 'Bottling Line 4', hourlyPoints: [4, 4, 2, 2, 4, 4] },
    { id: 'l5', location: 'Line 5', hourlyPoints: [0, 0, 0, 1, 0, 0] },
  ],
}

// Start of the shift: everyone at 0.
export const leaderboardStart: LeaderboardData = {
  ...leaderboardPositive,
  locations: leaderboardPositive.locations.map((l) => ({ ...l, hourlyPoints: [] })),
}
