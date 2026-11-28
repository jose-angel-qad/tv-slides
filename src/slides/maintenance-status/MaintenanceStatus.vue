<script setup lang="ts">
import { computed } from 'vue'
import LocationTable from '../../components/table/LocationTable.vue'
import RunStatusBadge from '../../components/status/RunStatusBadge.vue'
import StatusValue from '../../components/status/StatusValue.vue'
import { formatCount, formatDuration } from '../../utils/format'
import type { MaintenanceLocation, MaintenanceStatusData } from './types'

// Design plan (round 2). Proposal: the slide is not in the Knowledge Base; built from the captures
// and the design guide.
//
// Question: which lines need maintenance attention now? (guide, kept)
// Answer (row hero): what each line is doing now, right after the name: a Run status badge
// (Breakdown with how long it has been down, or Running) on a raised cell with the issue or the
// running product as its second line. Lines with an active issue read first because their badge is
// the only negative one.
//
// Must show, mapped:
// - Current status per line (active issue with its duration, or the running product): the hero cell.
// - PM, WO, CL and OD counts, spelled out (guide idea; meanings assumed, questions.md): Preventive
//   due, Work orders, Checklist items, Overdue.
// - Which counts need attention: a count at or above its limit shows the negative icon and color;
//   the others stay neutral.
//
// Not shown:
// - Abbreviated headers without a legend (current product).
// - Maintenance status bar colors without labels.
//
// Layout options:
// a) A titled table in one card (round 1): five dense columns.
// b) A card per line with the counts as tiles: counts do not line up.
// c) Shared row layout, status hero first, four count columns right aligned. Chosen.
const props = defineProps<{ data: MaintenanceStatusData }>()
const d = computed(() => props.data)
const rows = computed(() => d.value.locations.slice(0, 6).map((l) => ({ ...l })))
const COUNTS = [
  { key: 'pm', label: 'Preventive due' },
  { key: 'wo', label: 'Work orders' },
  { key: 'cl', label: 'Checklist items' },
  { key: 'od', label: 'Overdue' },
] as const
const columns = [
  { key: 'now', label: 'Now', width: 'minmax(0, 1.6fr)' },
  ...COUNTS.map((c) => ({ key: c.key, label: c.label, width: '200px', align: 'end' as const })),
]
const L = (r: unknown) => r as MaintenanceLocation
const over = (l: MaintenanceLocation, k: (typeof COUNTS)[number]['key']) => l[k] >= d.value.limits[k]
</script>

<template>
  <div class="rz-maintenance">
    <LocationTable :columns="columns" :rows="rows" location-width="minmax(0, 0.8fr)">
      <template #cell-now="{ row }">
        <div class="now">
          <RunStatusBadge v-if="L(row).issue" state="breakdown" :label="`Breakdown ${formatDuration(L(row).issue!.minutes)}`" />
          <RunStatusBadge v-else state="running" />
          <span class="detail">{{ L(row).issue?.name ?? L(row).product }}</span>
        </div>
      </template>
      <template v-for="c in COUNTS" :key="c.key" #[`cell-${c.key}`]="{ row }">
        <StatusValue v-if="over(L(row), c.key)" status="negative" label="Needs attention" :text="formatCount(L(row)[c.key])" />
        <span v-else>{{ formatCount(L(row)[c.key]) }}</span>
      </template>
    </LocationTable>
  </div>
</template>

<style scoped>
.rz-maintenance {
  position: absolute;
  inset: 0;
  padding: var(--rz-spacing-md) var(--rz-spacing-xl) var(--rz-spacing-xl);
}
/* The hero cell: raised container like the Metric cell, badge on top, issue or product below. */
.now {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--rz-spacing-2xs);
  width: 100%;
  min-width: 0;
  padding: var(--rz-spacing-xs) var(--rz-spacing-sm);
  border-radius: var(--rz-radius-md);
  background: var(--rz-color-surface-raised);
}
.detail {
  font: var(--rz-tv-type-body);
  color: var(--rz-color-text-secondary);
}
</style>
