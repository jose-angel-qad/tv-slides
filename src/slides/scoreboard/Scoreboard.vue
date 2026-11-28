<script setup lang="ts">
import { computed } from 'vue'
import LocationTable from '../../components/table/LocationTable.vue'
import MetricCell from '../../components/table/MetricCell.vue'
import StatusValue from '../../components/status/StatusValue.vue'
import { formatCount, formatDuration, formatPercent, formatPercentTick } from '../../utils/format'
import type { ScoreboardData, ScoreboardLocation } from './types'

// Design plan (round 2)
//
// Question: which lines are on track this shift? (guide, kept)
// Answer (row hero): shift OEE in a Metric cell after the location, with its target and the row's
// one status icon. Every location, always in the same order (INFO-11), six per page.
//
// Must show, mapped:
// - Every location in the same order: rows, page indicator when more than six.
// - Shift OEE above or below target: Metric cell.
// - Start result: "On time", "6m late" or "2m early"; a status only when late.
// - Changeover result: average minutes against the target; a status only when over target.
// - Victory Points: plain number, last column.
// - A metric with no value yet: a dash (guide handoff scenario).
//
// Not shown, assumption (questions.md): ramp up, power hour, huddles and SKUs. Nine columns do not
// read from across the floor (guide Claude idea); the four kept are the ones the question needs.
// The counts sparkline (no scale) and the trophy icon are dropped.
//
// Layout options:
// a) Nine-column grid (current product): unreadable at distance.
// b) Location cards: values do not line up.
// c) Shared row layout with four columns. Chosen: OEE compares top to bottom.
const props = defineProps<{ data: ScoreboardData }>()
const d = computed(() => props.data)
const rows = computed(() => d.value.locations.slice(0, 6).map((l) => ({ ...l })))
const columns = computed(() => [
  { key: 'oee', label: `${d.value.shift} OEE`, width: '280px' },
  { key: 'start', label: 'Start', width: 'minmax(0, 1fr)' },
  { key: 'changeover', label: 'Changeover', width: 'minmax(0, 1fr)' },
  { key: 'points', label: 'Points', width: '200px', align: 'end' as const },
])
const L = (r: unknown) => r as ScoreboardLocation
const start = (m?: number) => (m == null ? '–' : m > 0 ? `${formatDuration(m)} late` : m < 0 ? `${formatDuration(-m)} early` : 'On time')
</script>

<template>
  <div class="rz-scoreboard">
    <LocationTable :columns="columns" :rows="rows">
      <template #head-points>
        <span class="points-head">
          <span v-if="d.page">Page {{ d.page.index }} of {{ d.page.count }}</span>
          <span>Points</span>
        </span>
      </template>
      <template #cell-oee="{ row }">
        <MetricCell
          :value="formatPercent(L(row).oee)"
          :target="`Target ${formatPercentTick(L(row).oeeTarget)}`"
          :status="L(row).oee >= L(row).oeeTarget ? 'positive' : 'negative'"
          :label="L(row).oee >= L(row).oeeTarget ? 'On target' : 'Below target'"
        />
      </template>
      <template #cell-start="{ row }">
        <StatusValue v-if="(L(row).startMinutes ?? 0) > 0" status="negative" label="Late start" :text="start(L(row).startMinutes)" />
        <span v-else>{{ start(L(row).startMinutes) }}</span>
      </template>
      <template #cell-changeover="{ row }">
        <span v-if="L(row).changeoverMinutes == null">–</span>
        <span v-else class="co">
          <StatusValue
            v-if="L(row).changeoverMinutes! > L(row).changeoverTarget"
            status="negative"
            label="Over target"
            :text="formatDuration(L(row).changeoverMinutes!)"
          />
          <span v-else>{{ formatDuration(L(row).changeoverMinutes!) }}</span>
          <span class="sub">target {{ formatDuration(L(row).changeoverTarget) }}</span>
        </span>
      </template>
      <template #cell-points="{ row }">{{ formatCount(L(row).points) }}</template>
    </LocationTable>
  </div>
</template>

<style scoped>
.rz-scoreboard {
  position: absolute;
  inset: 0;
  padding: var(--rz-spacing-md) var(--rz-spacing-xl) var(--rz-spacing-xl);
}
.points-head {
  display: flex;
  justify-content: flex-end;
  gap: var(--rz-spacing-lg);
}
.co {
  display: inline-flex;
  align-items: baseline;
  gap: var(--rz-spacing-xs);
  white-space: nowrap;
}
.sub {
  font: var(--rz-tv-type-body);
  color: var(--rz-color-text-secondary);
}
</style>
