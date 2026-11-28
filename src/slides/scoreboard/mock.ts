import type { ScoreboardData, ScoreboardLocation } from './types'

const L = (id: string, location: string, oee: number, start: number | undefined, co: number | undefined, points: number): ScoreboardLocation => ({
  id,
  location,
  oee,
  oeeTarget: 80,
  startMinutes: start,
  changeoverMinutes: co,
  changeoverTarget: 30,
  points,
})

export const scoreboardPositive: ScoreboardData = {
  location: 'Packaging area',
  shift: 'Shift 2',
  locations: [
    L('l1', 'Line 1', 86.4, 0, 24, 21),
    L('l2', 'Line 2', 83.1, -2, 28, 17),
    L('l3', 'Line 3', 88.9, 0, undefined, 24),
    L('l4', 'Bottling Line 4', 81.5, 1, 26, 14),
    L('l5', 'Line 5', 84.0, 0, 22, 19),
  ],
}

// Page 1 of 2 (six rows per page), lines below target, a late start, slow changeovers, no values yet.
export const scoreboardNegative: ScoreboardData = {
  location: 'Packaging area',
  shift: 'Shift 2',
  page: { index: 1, count: 2 },
  locations: [
    L('l1', 'Line 1', 86.4, 0, 24, 21),
    L('l2', 'Line 2', 64.2, 12, 47, 4),
    L('l3', 'Packaging Line 3 West Mezzanine', 71.8, 6, 38, 8),
    L('l4', 'Bottling Line 4', 81.5, 1, undefined, 14),
    L('l5', 'Line 5', 52.6, 25, 61, 0),
    L('l6', 'Line 6', 84.0, undefined, 26, 18),
    L('l7', 'Line 7', 79.3, 3, 31, 11),
    L('l8', 'Line 8', 90.2, 0, 19, 26),
  ],
}
