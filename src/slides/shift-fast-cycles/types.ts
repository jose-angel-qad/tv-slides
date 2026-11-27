import type { FastCycleAsset } from '../_shared/fastCycles'

export interface ShiftFastCyclesData {
  location: string
  shift: string
  unit: { singular: string; plural: string }
  shiftUnits: number
  /** First-pass yield, percent. */
  yieldPercent: number
  problems: number
  oee: number
  oeeTarget: number
  averageSeconds: number
  targetSeconds: number
  assets: FastCycleAsset[]
}
