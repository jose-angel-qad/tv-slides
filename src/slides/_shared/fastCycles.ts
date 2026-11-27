import type { BarListRow } from '../../components/data-viz/BarList.vue'
import type { FillStatus } from '../../components/status/status'
import { formatClock } from '../../utils/format'

// Shared by Run (Fast cycles) and Shift (Fast cycles).
export interface FastCycleAsset {
  id: string
  name: string
  /** Current (last finished) cycle time in seconds. Undefined when the asset is not reporting. */
  cycleSeconds?: number
}

// One Bar list row per asset: current cycle against the target (dashed line across rows).
// Over target is negative with its icon; an asset with no cycle says so in words.
export function assetRows(assets: FastCycleAsset[], targetSeconds: number): BarListRow[] {
  return assets.map((a) => {
    if (a.cycleSeconds == null) return { id: a.id, label: a.name, detail: 'Not reporting', value: 0, valueText: '-' }
    const over = a.cycleSeconds > targetSeconds
    return {
      id: a.id,
      label: a.name,
      detail: over ? 'Over target' : 'On target',
      value: a.cycleSeconds,
      valueText: formatClock(a.cycleSeconds),
      status: over ? 'negative' : undefined,
    }
  })
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
