import type { FillStatus } from '../../components/status/status'
import { formatClock } from '../../utils/format'

// Shared by Run (Fast cycles) and Shift (Fast cycles).
export interface FastCycleAsset {
  id: string
  name: string
  /** Current (last finished) cycle time in seconds. Undefined when the asset is not reporting. */
  cycleSeconds?: number
}

// Hero band for the average cycle time: faster or on target is positive.
export function averageBand(avg: number, target: number): { status: FillStatus; label: string } {
  const diff = Math.round(avg - target)
  if (diff <= 0) return { status: 'positive', label: diff < 0 ? `${-diff} s under target` : 'On target' }
  return { status: 'negative', label: `${diff} s over target` }
}

export const barMax = (assets: FastCycleAsset[], target: number) =>
  Math.max(target * 1.4, ...assets.map((a) => a.cycleSeconds ?? 0))
export { formatClock }
