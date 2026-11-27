import type { FastCycleAsset } from '../_shared/fastCycles'

export interface RunFastCyclesData {
  location: string
  product: string
  unit: { singular: string; plural: string }
  completed: number
  planned: number
  averageSeconds: number
  targetSeconds: number
  assets: FastCycleAsset[]
}
