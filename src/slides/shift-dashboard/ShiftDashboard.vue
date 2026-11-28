<script setup lang="ts">
import { computed } from 'vue'
import StatusValue from '../../components/status/StatusValue.vue'
import StatusIcon from '../../components/status/StatusIcon.vue'
import MiniHourlyBars from '../../components/data-viz/MiniHourlyBars.vue'
import { formatDuration, formatPercent, formatPercentTick } from '../../utils/format'
import type { ShiftDashboardData } from './types'

// Design plan (round 2)
//
// Question: how is each line's shift going, and is it running now?
// Answer (hero): shift OEE in each row, the largest value on the slide, with its status icon.
// Scanning down the OEE column answers "how is each line's shift going"; the Now column answers
// "is it running".
//
// Must show, mapped:
// - Shift name: second line under the location name (it can differ per location).
// - Shift OEE, above or below target: OEE column, status icon plus color (check or octagon).
// - Running or stopped: Now column. Stopped is the exception and the urgent half of the question,
//   so it is a pill in status/negative/fill with on-fill text and icon; it must not read like a
//   line that is only below target. Running keeps its status icon (A11Y-10) with no fill.
// - Downtime so far: Downtime column, in hours and minutes.
// - OEE for each of the last 12 hours: compact bars with the target line, below-target hours in
//   the negative color and the current hour hatched. When every row shares the target, the OEE
//   column header names it once ("OEE, target 80%"); the dashed line marks it in each row.
//
// Not shown:
// - Card title "Shift performance by location" (round 1): it repeats the slide title.
// - "11 of 11 on target" next to the bars (round 1): the bars already show it, and the text
//   squeezed the bars into a third of the column.
// - Legend (round 1): the bars follow the Hourly OEE chart language; the column header names them.
// - Per-row hour ticks (current product): one label per column is enough; the last bar is now.
// // - Side navigation buttons (current product): app control, not slide content.
//
// Layout options:
// a) One card with a table (round 1): a title nobody needs and rows squeezed to 72 px.
// b) A grid of location cards: each line reads as a unit, but OEE values do not line up, so
//    comparing lines takes longer.
// c) One row card per location, column headers on the sheet (no "Location" header: the names say it). Chosen: values line up top to bottom
//    for comparison (INFO-11, fixed order), each row is one card like the Run throughput tiles,
//    and rows are tall enough for a two-line name and readable bars. Six rows per page (INFO-09).
const props = defineProps<{ data: ShiftDashboardData }>()
const d = computed(() => props.data)
const rows = computed(() => d.value.locations.slice(0, 6))
// Every row's bars share one height (and so one scale), even when a long name makes its row taller.
// Fixed geometry: 120 px when up to four rows fill the page, 80 px for five or six.
const barsHeight = computed(() => (rows.value.length <= 4 ? 120 : 80))
// The target is named once in the column header when every row shares it; the dashed line shows it per row.
const sharedTarget = computed(() => {
  const t = rows.value.map((l) => l.oeeTarget)
  return t.length && t.every((v) => v === t[0]) ? t[0] : undefined
})
</script>

<template>
  <div class="rz-shift-dashboard" role="table">
    <div class="head" role="row">
      <span role="columnheader" aria-label="Location" />
      <span role="columnheader">{{ sharedTarget != null ? `OEE, target ${formatPercentTick(sharedTarget)}` : 'Shift OEE' }}</span>
      <span role="columnheader">Now</span>
      <span role="columnheader">Downtime</span>
      <span role="columnheader" class="hours-head">
        <span>Last 12 hours</span>
        <span v-if="d.page" class="page">Page {{ d.page.index }} of {{ d.page.count }}</span>
      </span>
    </div>
    <div v-for="l in rows" :key="l.id" class="row" role="row">
      <div class="location" role="cell">
        <span class="name">{{ l.location }}</span>
        <span class="shift">{{ l.shift }}</span>
      </div>
      <div role="cell">
        <StatusValue
          size="lg"
          :status="l.oee >= l.oeeTarget ? 'positive' : 'negative'"
          :label="l.oee >= l.oeeTarget ? 'On target' : 'Below target'"
          :text="formatPercent(l.oee)"
        />
      </div>
      <div role="cell">
        <StatusValue v-if="l.running" status="positive" text="Running" />
        <span v-else class="stopped"><StatusIcon status="negative" tone="on-fill" :size="32" />Stopped</span>
      </div>
      <div role="cell" class="value">{{ formatDuration(l.downtimeMinutes) }}</div>
      <div role="cell" class="hours">
        <MiniHourlyBars :values="l.hourlyOee" :target="l.oeeTarget" :current-index="l.hourlyOee.length - 1" :height="barsHeight" />
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Fixed geometry: rows share the page height between 112 px (six rows fit one page) and 184 px
   (fewer rows), and the hourly bars grow with them. Value columns are 240 / 220 / 160 px. */
.rz-shift-dashboard {
  position: absolute;
  inset: 0;
  padding: var(--rz-spacing-md) var(--rz-spacing-xl) var(--rz-spacing-xl);
  display: flex;
  flex-direction: column;
  gap: var(--rz-spacing-xs);
  --tracks: minmax(0, 1fr) 240px 220px 160px minmax(0, 1.6fr);
}
.head,
.row {
  display: grid;
  grid-template-columns: var(--tracks);
  align-items: center;
  column-gap: var(--rz-spacing-lg);
  padding: 0 var(--rz-spacing-xl);
}
.head {
  font: var(--rz-tv-type-body);
  color: var(--rz-color-text-secondary);
}
.hours-head {
  display: flex;
  justify-content: space-between;
  gap: var(--rz-spacing-md);
  white-space: nowrap;
}
.row {
  flex: 1 0 auto;
  min-height: 112px;
  max-height: 184px;
  padding-top: var(--rz-spacing-sm);
  padding-bottom: var(--rz-spacing-sm);
  border: 1px solid var(--rz-color-border-subtle);
  border-radius: var(--rz-radius-lg);
  background: var(--rz-gradient-surface-default);
  box-shadow: var(--rz-elevation-card);
}
.location {
  display: flex;
  flex-direction: column;
  min-width: 0;
}
.name {
  font: var(--rz-tv-type-card-title);
  color: var(--rz-color-text-primary);
}
.shift {
  font: var(--rz-tv-type-body);
  color: var(--rz-color-text-secondary);
}
.stopped {
  display: inline-flex;
  align-items: center;
  gap: var(--rz-spacing-2xs);
  padding: var(--rz-spacing-2xs) var(--rz-spacing-sm) var(--rz-spacing-2xs) var(--rz-spacing-xs);
  border-radius: var(--rz-radius-full);
  background: var(--rz-color-status-negative-fill);
  color: var(--rz-color-status-negative-on-fill);
  font: var(--rz-tv-type-status-band);
  white-space: nowrap;
}
.value {
  font: var(--rz-tv-type-chart-value);
  font-variant-numeric: var(--rz-tv-figures-table);
  color: var(--rz-color-text-primary);
}
.hours {
  min-width: 0;
}
</style>
