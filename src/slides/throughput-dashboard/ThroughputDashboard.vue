<script setup lang="ts">
import { computed } from 'vue'
import LocationTable from '../../components/table/LocationTable.vue'
import MetricCell from '../../components/table/MetricCell.vue'
import MiniHourlyBars from '../../components/data-viz/MiniHourlyBars.vue'
import StatusValue from '../../components/status/StatusValue.vue'
import { formatCount, formatRate } from '../../utils/format'
import type { ThroughputDashboardData, ThroughputLocation } from './types'

// Design plan (round 2)
//
// Question: how many units has each line made versus plan? (guide, kept)
// Answer (row hero): units produced in a Metric cell right after the location, with the gap to plan
// as its second line ("230 behind plan") and the row's one status icon (behind plan is negative).
//
// Must show, mapped:
// - Units produced, with the unit: Metric cell value; the unit is in the column header.
// - Amount ahead or behind plan: Metric cell second line and status.
// - Units per hour, by hour: Mini hourly bars on the shared geometry, the current hour hatched (in
//   progress, not low: guide idea), target line, widest column.
// - Crew size against target: plain "6.2 of 6.0"; a status only when the crew is short; "No target"
//   when the target is 0.
//
// Not shown:
// - One card per location with a KPI tile (round 1): values did not line up for comparison.
// - Orange tiles (current product): meaning unknown (questions.md).
//
// Layout options:
// a) Location cards in a grid (round 1): comparison across lines is slow.
// b) One table per metric: splits each line across the screen.
// c) Shared row layout: one row card per line, columns on one grid. Chosen: units line up top to
//    bottom, and the hourly bars get the widest column.
const props = defineProps<{ data: ThroughputDashboardData }>()
const d = computed(() => props.data)
const rows = computed(() => d.value.locations.slice(0, 6).map((l) => ({ ...l })))
const unit = computed(() => d.value.locations[0]?.unit.plural ?? 'units')
const barsHeight = computed(() => (rows.value.length <= 4 ? 120 : 80))
const columns = computed(() => [
  { key: 'produced', label: `${unit.value.charAt(0).toUpperCase()}${unit.value.slice(1)} this shift`, width: '300px' },
  { key: 'hourly', label: 'Per hour', width: 'minmax(0, 1.6fr)' },
  { key: 'crew', label: 'Crew', width: '240px' },
])
const gap = (l: ThroughputLocation) =>
  l.deltaVsPlan > 0 ? `${formatCount(l.deltaVsPlan)} ahead of plan` : l.deltaVsPlan < 0 ? `${formatCount(-l.deltaVsPlan)} behind plan` : 'On plan'
const L = (r: unknown) => r as ThroughputLocation
</script>

<template>
  <div class="rz-throughput-dashboard">
    <LocationTable :columns="columns" :rows="rows">
      <template #head-hourly>
        <span class="hours-head">
          <span>Per hour</span>
          <span v-if="d.page">Page {{ d.page.index }} of {{ d.page.count }}</span>
        </span>
      </template>
      <template #cell-produced="{ row }">
        <MetricCell
          :value="formatCount(L(row).produced)"
          :target="gap(L(row))"
          :status="L(row).deltaVsPlan < 0 ? 'negative' : 'positive'"
          :label="L(row).deltaVsPlan < 0 ? 'Behind plan' : 'On or ahead of plan'"
        />
      </template>
      <template #cell-hourly="{ row }">
        <MiniHourlyBars :values="L(row).hourly" :target="L(row).targetPerHour" :current-index="L(row).hourly.length - 1" :height="barsHeight" />
      </template>
      <template #cell-crew="{ row }">
        <span v-if="L(row).crewTarget <= 0" class="crew">{{ formatRate(L(row).crew) }} <span class="sub">no target</span></span>
        <StatusValue
          v-else-if="L(row).crew < L(row).crewTarget"
          status="negative"
          label="Crew short"
          :text="`${formatRate(L(row).crew)} of ${formatRate(L(row).crewTarget)}`"
        />
        <span v-else class="crew">{{ formatRate(L(row).crew) }} <span class="sub">of {{ formatRate(L(row).crewTarget) }}</span></span>
      </template>
    </LocationTable>
  </div>
</template>

<style scoped>
.rz-throughput-dashboard {
  position: absolute;
  inset: 0;
  padding: var(--rz-spacing-md) var(--rz-spacing-xl) var(--rz-spacing-xl);
}
.hours-head {
  display: flex;
  justify-content: space-between;
  gap: var(--rz-spacing-md);
}
.crew {
  white-space: nowrap;
}
.sub {
  font: var(--rz-tv-type-body);
  color: var(--rz-color-text-secondary);
}
</style>
