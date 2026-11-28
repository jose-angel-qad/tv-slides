<script setup lang="ts">
import { computed } from 'vue'
import ChartCard from '../../components/card/ChartCard.vue'
import LocationTable from '../../components/table/LocationTable.vue'
import MetricCell from '../../components/table/MetricCell.vue'
import ProgressBar from '../../components/data-display/ProgressBar.vue'
import RunStatusBadge from '../../components/status/RunStatusBadge.vue'
import type { RunState } from '../../components/status/runState'
import type { Status } from '../../components/status/status'
import { formatCount, formatDuration } from '../../utils/format'
import type { AssetState, CycleAsset, CyclesData } from './types'

// Design plan (round 2)
//
// Question: is each asset's cycle on time? (guide, kept)
// Answer (row hero): time left or overrun per asset, in a Metric cell right after the asset name
// ("14m left" over "of 45m"; "9m over" in the negative color with its icon). One row per asset.
//
// Must show, mapped:
// - Remaining time or overrun per asset: Metric cell.
// - Asset state (Active, Inactive, Overrun, Rejected, No product): Run status badge per row.
//   Overrun is a timing result, so an overrun asset shows Active with the negative Metric cell.
// - Run progress, completed of planned: the run card on the right, progress bar with "14 of 24 batches".
// - Average active and total cycle time: the run card, two facts under the bar.
// - Plus the cycle as a bar per asset (guide idea), hatched while running (an overrun asset is still
//   running, so its full bar stays hatched; the Metric cell carries the overrun status).
//
// Not shown:
// - Double rings and their legend (current product): a bar and a number need no legend.
// - Product image (current product): the name says it.
//
// Layout options:
// a) A card per asset in a grid (round 1 rings): times do not line up for comparison.
// b) Run strip on top, asset rows below: six assets and the strip do not fit the page height.
// c) Asset rows on the shared row layout, run card on the right. Chosen: times line up top to
//    bottom, and the run context sits beside them without taking row height.
const props = defineProps<{ data: CyclesData }>()
const d = computed(() => props.data)

const BADGE: Record<AssetState, { state: RunState; label?: string }> = {
  active: { state: 'running', label: 'Active' },
  overrun: { state: 'running', label: 'Active' },
  inactive: { state: 'inactive' },
  rejected: { state: 'breakdown', label: 'Rejected' },
  'no-product': { state: 'inactive', label: 'No product' },
}
const running = (a: CycleAsset) => a.state === 'active' || a.state === 'overrun'
function timing(a: CycleAsset): { value: string; status?: Status; label?: string } {
  if (!running(a) || a.elapsedSeconds == null) return { value: '–' }
  const left = a.cycleSeconds - a.elapsedSeconds
  if (left >= 0) return { value: `${formatDuration(Math.ceil(left / 60))} left` }
  return { value: `${formatDuration(Math.ceil(-left / 60))} over`, status: 'negative', label: 'Overrun' }
}
const rows = computed(() =>
  d.value.assets.slice(0, 6).map((a) => ({ id: a.id, location: a.name, asset: a })),
)
const columns = [
  { key: 'time', label: 'Cycle time', width: '260px' },
  { key: 'bar', label: '', width: 'minmax(0, 1fr)' },
  { key: 'state', label: 'State', width: '256px' },
]
</script>

<template>
  <div class="rz-cycles">
    <LocationTable :columns="columns" :rows="rows" location-width="minmax(0, 0.6fr)">
      <template #cell-time="{ row }">
        <MetricCell
          :value="timing((row as any).asset).value"
          :target="running((row as any).asset) ? `of ${formatDuration(Math.round((row as any).asset.cycleSeconds / 60))}` : undefined"
          :status="timing((row as any).asset).status"
          :label="timing((row as any).asset).label"
        />
      </template>
      <template #cell-bar="{ row }">
        <div v-if="running((row as any).asset)" class="bar">
          <ProgressBar
            size="sm"
            :value="running((row as any).asset) ? (row as any).asset.elapsedSeconds ?? 0 : 0"
            :max="(row as any).asset.cycleSeconds"
            :in-progress="running((row as any).asset)"
          />
        </div>
      </template>
      <template #cell-state="{ row }">
        <RunStatusBadge :state="BADGE[(row as any).asset.state as AssetState].state" :label="BADGE[(row as any).asset.state as AssetState].label" />
      </template>
    </LocationTable>

    <ChartCard class="run" :title="d.product">
      <div class="run-body">
        <ProgressBar
          :value="d.completed"
          :max="d.planned"
          label="Run"
          in-progress
          :value-text="`${formatCount(d.completed)} of ${formatCount(d.planned)} ${d.unit.plural}`"
        />
        <dl class="facts">
          <div>
            <dt>Active cycle average</dt>
            <dd>{{ formatDuration(Math.round(d.averageActiveSeconds / 60)) }}</dd>
          </div>
          <div>
            <dt>Total cycle average</dt>
            <dd>{{ formatDuration(Math.round(d.averageTotalSeconds / 60)) }}</dd>
          </div>
        </dl>
      </div>
    </ChartCard>
  </div>
</template>

<style scoped>
/* Asset rows on the left; the run card is 440 px wide on the right, from the first row down, as tall
   as its content (product, progress, averages). */
.rz-cycles {
  position: absolute;
  inset: 0;
  padding: var(--rz-spacing-md) var(--rz-spacing-xl) var(--rz-spacing-xl);
  display: grid;
  grid-template-columns: minmax(0, 1fr) 440px;
  gap: var(--rz-spacing-md);
}
.bar {
  width: 100%;
}
.run {
  /* Starts at the first row (under the column header line: 34 px line + 12 px gap), as tall as its content. */
  align-self: start;
  margin-top: calc(var(--rz-tv-line-height-2xs) + var(--rz-spacing-xs));
  min-height: 0;
}
.run-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: var(--rz-spacing-xl);
}
.facts {
  display: flex;
  flex-direction: column;
  gap: var(--rz-spacing-md);
  margin: 0;
}
.facts dt {
  font: var(--rz-tv-type-body);
  color: var(--rz-color-text-secondary);
}
.facts dd {
  /* Context, so it stays at the row hero's size (chart value), not above it. */
  margin: 0;
  font: var(--rz-tv-type-chart-value);
  color: var(--rz-color-text-primary);
}
</style>
