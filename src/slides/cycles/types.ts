export type AssetState = 'active' | 'inactive' | 'overrun' | 'rejected' | 'no-product'

export interface CycleAsset {
  id: string
  name: string
  state: AssetState
  /** Seconds since the cycle started (active, overrun). */
  elapsedSeconds?: number
  /** Planned cycle time in seconds. */
  cycleSeconds: number
}

export interface CyclesData {
  location: string
  product: string
  unit: { singular: string; plural: string }
  completed: number
  planned: number
  averageActiveSeconds: number
  averageTotalSeconds: number
  assets: CycleAsset[]
}
