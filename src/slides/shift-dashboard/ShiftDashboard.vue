<script setup lang="ts">
import { computed } from 'vue'
import LocationTable from '../../components/table/LocationTable.vue'
import MetricCell from '../../components/table/MetricCell.vue'
import RunStatusBadge from '../../components/status/RunStatusBadge.vue'
import MiniHourlyBars from '../../components/data-viz/MiniHourlyBars.vue'
import { formatDuration, formatPercent, formatPercentTick } from '../../utils/format'
import type { ShiftDashboardData } from './types'

// Design plan (round 2, pilot feedback applied)
//
// Question: how is each line's shift going, and is it running now?
// Answer (row hero): shift OEE, in a Metric cell right after the location name, with its target as
// the second line and the row's one status icon. Hierarchy comes from the container, not from a
// larger font (pilot review). Scanning down the OEE column answers "how is each line's shift going";
// the Now column answers "is it running".
//
// Must show, mapped:
// - Shift name: in the OEE column header for the common shift ("Shift 2 OEE"); a row on another
//   shift names its own shift as a detail line under the location name.
// - Shift OEE, above or below target: the Metric cell (status icon plus color, target on line 2).
// - Running or stopped: Now column, Run status badge (Running, Stopped, Breakdown, Changeover and the
//   other run states, each with its own icon).
// - Downtime so far: plain, neutral text (no target, so no status).
// - OEE for each of the last 12 hours: Mini hourly bars with the shared chart geometry, target line,
//   below-target hours in the negative color and the current hour hatched.
//
// Not shown:
// - Card title, legend and "11 of 11 on target" (round 1): they repeat the title or the bars.
// - Per-row hour ticks and side navigation (current product): one column header is enough.
// - Status on downtime and on Running beyond the badge: one status per row, on the hero.
//
// Layout options:
// a) One card with a table (round 1): rows squeezed, a title nobody needs.
// b) A grid of location cards: values do not line up, comparing lines takes longer.
// c) Shared Location table: headers on the sheet, one row card per location, columns on one grid.
//    Chosen: OEE values line up for comparison (INFO-11), rows fill the page between 112 and
//    184 px, six rows per page (INFO-09).
const props = defineProps<{ data: ShiftDashboardData }>()
const d = computed(() => props.data)
// The most common shift on the page goes in the OEE header; only rows on another shift repeat theirs.
const commonShift = computed(() => {
  const count = new Map<string, number>()
  d.value.locations.slice(0, 6).forEach((l) => count.set(l.shift, (count.get(l.shift) ?? 0) + 1))
  return [...count.entries()].sort((a, b) => b[1] - a[1])[0]?.[0]
})
const rows = computed(() =>
  d.value.locations.slice(0, 6).map((l) => ({ ...l, detail: l.shift === commonShift.value ? undefined : l.shift })),
)
// Every row's bars share one height (and so one scale). Fixed geometry: 120 px up to four rows,
// 80 px for five or six.
const barsHeight = computed(() => (rows.value.length <= 4 ? 120 : 80))
const columns = computed(() => [
  { key: 'oee', label: commonShift.value ? `${commonShift.value} OEE` : 'Shift OEE', width: '260px' },
  { key: 'state', label: 'Now', width: '264px' },
  { key: 'downtime', label: 'Downtime', width: '168px', align: 'end' as const },
  { key: 'hours', label: 'Last 12 hours', width: 'minmax(0, 1.5fr)' },
])
const onTarget = (oee: number, target: number) => oee >= target
</script>

<template>
  <div class="rz-shift-dashboard">
    <LocationTable :columns="columns" :rows="rows">
      <template #head-hours>
        <span class="hours-head">
          <span>Last 12 hours</span>
          <span v-if="d.page">Page {{ d.page.index }} of {{ d.page.count }}</span>
        </span>
      </template>
      <template #cell-oee="{ row }">
        <MetricCell
          :value="formatPercent(row.oee as number)"
          :target="`Target ${formatPercentTick(row.oeeTarget as number)}`"
          :status="onTarget(row.oee as number, row.oeeTarget as number) ? 'positive' : 'negative'"
          :label="onTarget(row.oee as number, row.oeeTarget as number) ? 'On target' : 'Below target'"
        />
      </template>
      <template #cell-state="{ row }">
        <RunStatusBadge :state="(row as any).state" />
      </template>
      <template #cell-downtime="{ row }">{{ formatDuration(row.downtimeMinutes as number) }}</template>
      <template #cell-hours="{ row }">
        <MiniHourlyBars
          :values="row.hourlyOee as number[]"
          :target="row.oeeTarget as number"
          :current-index="(row.hourlyOee as number[]).length - 1"
          :height="barsHeight"
        />
      </template>
    </LocationTable>
  </div>
</template>

<style scoped>
.rz-shift-dashboard {
  position: absolute;
  inset: 0;
  padding: var(--rz-spacing-md) var(--rz-spacing-xl) var(--rz-spacing-xl);
}
.hours-head {
  display: flex;
  justify-content: space-between;
  gap: var(--rz-spacing-md);
}
</style>
