export interface SpcCharacteristic {
  id: string
  /** Location and characteristic, as entered: "Bottling Line 2, fill weight". */
  location: string
  unit: string
  decimals: number
  latest: number
  lcl: number
  ucl: number
  /** Points outside the control limits in the last 20 subgroups. */
  pointsOutside: number
  cpk: number
}

export interface SpcDashboardData {
  location: string
  capabilityTarget: number
  characteristics: SpcCharacteristic[]
}
