<script setup lang="ts">
import { computed } from 'vue'
import LocationTable from '../../components/table/LocationTable.vue'
import MetricCell from '../../components/table/MetricCell.vue'
import ProgressBar from '../../components/data-display/ProgressBar.vue'
import RunStatusBadge from '../../components/status/RunStatusBadge.vue'
import { formatCount, formatDuration, formatTime } from '../../utils/format'
import type { StreamLocation, UpDownStreamData } from './types'

// Design plan (round 2)
//
// Question: will the lines feeding this area finish on time? (guide, kept)
// Answer (row hero): minutes ahead or behind schedule in a Metric cell after the location, with the
// ETA as its second line ("21m behind" over "ETA 11:41 PM"). Behind is negative with its icon;
// ahead or on time stays neutral (status economy). Rows in process flow order, upstream first
// (guide idea), so a late upstream line explains the lines below it.
//
// Must show, mapped:
// - Product and run progress: product name over a progress bar with completed of planned.
// - Running or stopped: Run status badge.
// - Minutes ahead or behind: Metric cell. Positive values mean ahead (assumption, questions.md).
// - ETA: Metric cell second line; "No ETA" when the line is stopped.
//
// Not shown:
// - Product type icon (current product).
//
// Layout options:
// a) A titled table in one card (round 1): rows squeezed, names on three lines.
// b) A flow diagram with arrows between lines: pretty, but the schedule values do not line up.
// c) Shared row layout in flow order. Chosen: the schedule column compares top to bottom.
const props = defineProps<{ data: UpDownStreamData }>()
const d = computed(() => props.data)
const rows = computed(() => d.value.locations.slice(0, 6).map((l) => ({ ...l })))
const columns = [
  { key: 'schedule', label: 'Schedule', width: '300px' },
  { key: 'run', label: 'Run', width: 'minmax(0, 1.6fr)' },
  { key: 'state', label: 'Now', width: '240px' },
]
const L = (r: unknown) => r as StreamLocation
const schedule = (l: StreamLocation) =>
  l.scheduleMinutes > 0 ? `${formatDuration(l.scheduleMinutes)} ahead` : l.scheduleMinutes < 0 ? `${formatDuration(-l.scheduleMinutes)} behind` : 'On time'
const eta = (l: StreamLocation) => (l.endsAt ? `ETA ${formatTime(l.endsAt)}` : 'No ETA')
</script>

<template>
  <div class="rz-up-down-stream">
    <LocationTable :columns="columns" :rows="rows" location-width="minmax(0, 0.8fr)">
      <template #cell-schedule="{ row }">
        <MetricCell
          :value="schedule(L(row))"
          :target="eta(L(row))"
          :status="L(row).scheduleMinutes < 0 ? 'negative' : undefined"
          :label="L(row).scheduleMinutes < 0 ? 'Behind schedule' : undefined"
        />
      </template>
      <template #cell-run="{ row }">
        <div class="run">
          <span class="line">
            <span class="name">{{ L(row).product }}</span>
            <span class="count">{{ formatCount(L(row).completed) }} of {{ formatCount(L(row).planned) }} {{ L(row).unit.plural }}</span>
          </span>
          <ProgressBar size="sm" :value="L(row).completed" :max="L(row).planned" :in-progress="L(row).running" />
        </div>
      </template>
      <template #cell-state="{ row }">
        <RunStatusBadge :state="L(row).running ? 'running' : 'stopped'" />
      </template>
    </LocationTable>
  </div>
</template>

<style scoped>
.rz-up-down-stream {
  position: absolute;
  inset: 0;
  padding: var(--rz-spacing-md) var(--rz-spacing-xl) var(--rz-spacing-xl);
}
.run {
  display: flex;
  flex-direction: column;
  gap: var(--rz-spacing-2xs);
  width: 100%;
  min-width: 0;
}
.line {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: var(--rz-spacing-md);
}
.name {
  min-width: 0;
  font: var(--rz-tv-type-body-strong);
  color: var(--rz-color-text-primary);
}
.count {
  flex: none;
  font: var(--rz-tv-type-body);
  color: var(--rz-color-text-secondary);
}
</style>
