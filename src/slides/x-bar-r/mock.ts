import type { XBarRData } from './types'

const start = new Date(2026, 10, 18, 14).getTime()
const series = (values: number[]) => values.map((value, i) => ({ t: new Date(start + i * 1_200_000), value }))

const base = {
  location: 'Bottling Line 2',
  characteristic: 'Fill weight, 12 oz bottle',
  unit: 'oz',
  limits: { ucl: 12.15, center: 12.03, lcl: 11.91, usl: 12.4, lsl: 11.8, rUcl: 0.44, rBar: 0.21 },
  capabilityTarget: 1.33,
  decimals: 2,
}

export const xBarRPositive: XBarRData = {
  ...base,
  xbar: series([12.02, 12.05, 11.98, 12.01, 12.08, 12.04, 11.97, 12.03, 12.06, 12.04, 11.99, 12.02, 12.05, 12.01, 12.03, 12.0, 12.07, 12.02, 12.04, 12.03]),
  range: series([0.18, 0.22, 0.25, 0.19, 0.2, 0.24, 0.17, 0.21, 0.23, 0.19, 0.22, 0.18, 0.26, 0.2, 0.19, 0.23, 0.21, 0.18, 0.22, 0.2]),
  cp: 1.58,
  cpk: 1.46,
}

export const xBarRNegative: XBarRData = {
  ...base,
  location: 'Bottling Line 2 North Hall Extension',
  characteristic: 'Fill weight, 12 oz bottle, nozzle bank B',
  xbar: series([12.02, 12.05, 11.98, 12.06, 12.08, 12.11, 12.09, 12.13, 12.19, 12.12, 12.1, 12.14, 12.17, 12.12, 12.18, 12.11, 12.13, 12.16, 12.21, 12.14]),
  range: series([0.18, 0.22, 0.25, 0.29, 0.31, 0.27, 0.33, 0.36, 0.48, 0.3, 0.29, 0.34, 0.38, 0.31, 0.35, 0.32, 0.37, 0.39, 0.46, 0.34]),
  cp: 1.21,
  cpk: 0.84,
}
