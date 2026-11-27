import type { FillStatus } from '../../components/status/status'

export interface RunSpeedData {
  location: string
  sku: string
  product: string
  unit: { singular: string; plural: string }
  startedAt: Date
  produced: number
  plannedTotal: number
  /** Units the run should have made by now at the planned rate. */
  paceTarget: number
  /** Estimated finish at the current speed. Undefined when it cannot be estimated (stopped). */
  endsAt?: Date
  plannedEndAt: Date
  /** Units per hour over the last 15 minutes. */
  currentRate: number
  /** Planned units per hour. */
  paceRate: number
  unplannedDowntimeMinutes: number
  /** Optional override; without it ahead or on pace is positive, behind is negative. */
  status?: FillStatus
}
