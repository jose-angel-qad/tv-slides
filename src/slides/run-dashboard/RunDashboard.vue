<script setup lang="ts">
import { computed } from 'vue'
import LocationTable from '../../components/table/LocationTable.vue'
import MetricCell from '../../components/table/MetricCell.vue'
import ProgressBar from '../../components/data-display/ProgressBar.vue'
import RunStatusBadge from '../../components/status/RunStatusBadge.vue'
import StatusValue from '../../components/status/StatusValue.vue'
import { formatCount, formatPercent } from '../../utils/format'
import type { RunDashboardData, RunDashboardLocation } from './types'

// Design plan (round 2)
//
// Question: how far along is each run, and is quality OK? (guide, kept)
// Answer (row hero): percent of the run done, in a Metric cell after the location, with completed of
// planned as its second line ("15,400 of 22,900 cases"). A finished run shows "Done" with the
// positive icon. Quality is the second half of the question: its own column, a status only when it
// is below target.
//
// Must show, mapped:
// - Run OEE, above or below target: plain value, negative status only when below target.
// - Product code and name: above the run's progress bar, wraps, never cut.
// - Completed of planned, with the unit: Metric cell second line and the progress bar.
// - Quality status: first-pass quality percent, negative status only when below target (guide idea:
//   one clear value instead of the circle and badge).
// - No active run: the Inactive badge "No active run" in place of the bar.
//
// Not shown:
// - Quality circle and number badge (current product): meaning unclear (questions.md).
// - Product type icon.
//
// Layout options:
// a) A titled table in one card (round 1): rows squeezed, product names wrapped to three lines.
// b) A card per run: progress does not line up across lines.
// c) Shared row layout, progress hero after the name, product with its bar in the widest column.
//    Chosen: progress compares top to bottom, product names get room.
const props = defineProps<{ data: RunDashboardData }>()
const d = computed(() => props.data)
const rows = computed(() => d.value.locations.slice(0, 6).map((l) => ({ ...l })))
const columns = [
  { key: 'done', label: 'Run done', width: '360px' },
  { key: 'product', label: 'Product', width: 'minmax(0, 1.6fr)' },
  { key: 'oee', label: 'OEE', width: '200px' },
  { key: 'quality', label: 'Quality', width: '200px' },
]
const L = (r: unknown) => r as RunDashboardLocation
const pct = (l: RunDashboardLocation) => (l.run ? Math.floor((l.run.completed / l.run.planned) * 100) : 0)
</script>

<template>
  <div class="rz-run-dashboard">
    <LocationTable :columns="columns" :rows="rows" location-width="minmax(0, 0.8fr)">
      <template #cell-done="{ row }">
        <MetricCell
          v-if="L(row).run && L(row).run!.completed >= L(row).run!.planned"
          value="Done"
          :target="`${formatCount(L(row).run!.planned)} ${L(row).run!.unit.plural}`"
          status="positive"
          label="Run complete"
        />
        <MetricCell
          v-else-if="L(row).run"
          :value="`${pct(L(row))}%`"
          :target="`${formatCount(L(row).run!.completed)} of ${formatCount(L(row).run!.planned)} ${L(row).run!.unit.plural}`"
        />
        <MetricCell v-else value="–" />
      </template>
      <template #cell-product="{ row }">
        <div v-if="L(row).run" class="product">
          <span class="name">{{ L(row).run!.product }}</span>
          <ProgressBar size="sm" :value="L(row).run!.completed" :max="L(row).run!.planned" :in-progress="L(row).run!.completed < L(row).run!.planned" />
        </div>
        <RunStatusBadge v-else state="inactive" label="No active run" />
      </template>
      <template #cell-oee="{ row }">
        <template v-if="L(row).run">
          <StatusValue v-if="L(row).run!.oee < L(row).run!.oeeTarget" status="negative" label="Below target" :text="formatPercent(L(row).run!.oee)" />
          <span v-else>{{ formatPercent(L(row).run!.oee) }}</span>
        </template>
      </template>
      <template #cell-quality="{ row }">
        <template v-if="L(row).run">
          <StatusValue v-if="L(row).run!.quality < L(row).run!.qualityTarget" status="negative" label="Below target" :text="formatPercent(L(row).run!.quality)" />
          <span v-else>{{ formatPercent(L(row).run!.quality) }}</span>
        </template>
      </template>
    </LocationTable>
  </div>
</template>

<style scoped>
.rz-run-dashboard {
  position: absolute;
  inset: 0;
  padding: var(--rz-spacing-md) var(--rz-spacing-xl) var(--rz-spacing-xl);
}
.product {
  display: flex;
  flex-direction: column;
  gap: var(--rz-spacing-2xs);
  width: 100%;
  min-width: 0;
}
.name {
  font: var(--rz-tv-type-body-strong);
  color: var(--rz-color-text-primary);
}
</style>
