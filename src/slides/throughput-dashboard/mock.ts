import type { ThroughputDashboardData, ThroughputLocation } from './types'

const cases = { singular: 'case', plural: 'cases' }
const L = (id: string, location: string, produced: number, delta: number, hourly: number[], crew: number, crewTarget: number, target = 440): ThroughputLocation => ({
  id,
  location,
  unit: cases,
  produced,
  deltaVsPlan: delta,
  hourly,
  targetPerHour: target,
  crew,
  crewTarget,
})

export const throughputDashboardPositive: ThroughputDashboardData = {
  location: 'Packaging area',
  locations: [
    L('l1', 'Line 1', 2_740, 120, [452, 461, 447, 438, 455, 469, 218], 6.2, 6.0),
    L('l2', 'Line 2', 2_655, 35, [441, 448, 452, 445, 439, 450, 180], 5.0, 5.0),
    L('l3', 'Line 3', 3_120, 210, [512, 520, 508, 515, 530, 525, 240], 7.1, 7.0, 500),
    L('l4', 'Bottling Line 4', 1_980, 15, [330, 335, 328, 332, 340, 336, 99], 4.0, 0, 330),
  ],
}

export const throughputDashboardNegative: ThroughputDashboardData = {
  location: 'Packaging area',
  locations: [
    L('l1', 'Line 1', 2_740, 120, [452, 461, 447, 438, 455, 469, 218], 6.2, 6.0),
    L('l2', 'Packaging Line 3 West Mezzanine', 2_390, -230, [431, 402, 447, 356, 389, 412, 153], 4.8, 6.0),
    L('l3', 'Line 3', 2_870, -40, [512, 488, 495, 470, 505, 490, 201], 7.0, 7.0, 500),
    L('l4', 'Bottling Line 4', 1_640, -335, [301, 285, 330, 260, 270, 290, 60], 3.0, 4.0, 330),
  ],
}
