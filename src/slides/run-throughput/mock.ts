import type { RunThroughputData } from './types'

const at = (h: number, m = 0) => new Date(2026, 10, 18, h, m)

// Sample data for the Figma final slides (TV Component library, section "Thursday 26 Nov - final").
// The three states only show how success, warning and error look. Their statuses are set
// explicitly; they are not real thresholds for this slide.
const values = [453, 459, 446, 441, 402, 442, 454, 408, 446, 154]

export const runThroughputSuccess: RunThroughputData = {
  location: 'Line 1',
  sku: '466DHR',
  product: '466DHR GOLD PACKS 11 OZ 12 CS',
  unit: { singular: 'case', plural: 'cases' },
  updatedAt: at(20, 20),
  produced: 19_230,
  plannedTotal: 22_900,
  deltaVsPlan: 6,
  paceStatus: 'positive',
  endsAt: at(28, 42),
  plannedEndAt: at(28, 42),
  finishStatus: 'positive',
  remainingMinutes: 8 * 60 + 22,
  crew: 6.2,
  crewTarget: 6.2,
  hourly: values.map((value, i) => ({ hour: at(11 + i), value })),
  targetPerHour: 440,
  currentHourIndex: values.length - 1,
}

export const runThroughputWarning: RunThroughputData = {
  ...runThroughputSuccess,
  produced: 19_130,
  deltaVsPlan: -100,
  paceStatus: 'warning',
  endsAt: at(28, 56),
  finishStatus: 'warning',
  remainingMinutes: 8 * 60 + 36,
}

export const runThroughputError: RunThroughputData = {
  ...runThroughputSuccess,
  produced: 18_970,
  deltaVsPlan: -260,
  paceStatus: 'negative',
  endsAt: at(29, 17),
  finishStatus: 'negative',
  remainingMinutes: 8 * 60 + 57,
  crew: 4.8,
}

// Edge case: a value in the millions steps the KPI value down so it fits the tile.
export const runThroughputMillions: RunThroughputData = {
  ...runThroughputSuccess,
  produced: 12_345_678,
  plannedTotal: 14_600_000,
}
