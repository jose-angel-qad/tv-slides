import type { SpcDashboardData } from './types'

export const spcDashboardPositive: SpcDashboardData = {
  location: 'Quality lab',
  capabilityTarget: 1.33,
  characteristics: [
    { id: 'c1', location: 'Bottling Line 2, fill weight', unit: 'oz', decimals: 2, latest: 12.03, lcl: 11.91, ucl: 12.15, pointsOutside: 0, cpk: 1.46 },
    { id: 'c2', location: 'Bottling Line 2, cap torque', unit: 'in-lb', decimals: 1, latest: 18.4, lcl: 16.8, ucl: 20.2, pointsOutside: 0, cpk: 1.52 },
    { id: 'c3', location: 'Line 1, seal temperature', unit: '°F', decimals: 0, latest: 352, lcl: 340, ucl: 364, pointsOutside: 0, cpk: 1.38 },
    { id: 'c4', location: 'Line 3, pouch length', unit: 'mm', decimals: 1, latest: 182.1, lcl: 180.6, ucl: 183.4, pointsOutside: 0, cpk: 1.61 },
  ],
}

export const spcDashboardNegative: SpcDashboardData = {
  ...spcDashboardPositive,
  characteristics: [
    { id: 'c1', location: 'Bottling Line 2 North Hall Extension, fill weight nozzle bank B', unit: 'oz', decimals: 2, latest: 12.21, lcl: 11.91, ucl: 12.15, pointsOutside: 7, cpk: 0.84 },
    { id: 'c2', location: 'Bottling Line 2, cap torque', unit: 'in-lb', decimals: 1, latest: 18.4, lcl: 16.8, ucl: 20.2, pointsOutside: 0, cpk: 1.52 },
    { id: 'c3', location: 'Line 1, seal temperature', unit: '°F', decimals: 0, latest: 338, lcl: 340, ucl: 364, pointsOutside: 2, cpk: 1.12 },
    { id: 'c4', location: 'Line 3, pouch length', unit: 'mm', decimals: 1, latest: 182.1, lcl: 180.6, ucl: 183.4, pointsOutside: 0, cpk: 1.61 },
  ],
}
