<script setup lang="ts">
import { computed } from 'vue'
import ChartCard from '../../components/card/ChartCard.vue'
import KpiTile from '../../components/card/KpiTile.vue'
import StatTile from '../../components/card/StatTile.vue'
import ProgressBar from '../../components/data-display/ProgressBar.vue'
import RunStatusBadge from '../../components/status/RunStatusBadge.vue'
import StatusIcon from '../../components/status/StatusIcon.vue'
import type { FillStatus, Status } from '../../components/status/status'
import { formatCount, formatDuration, formatKpiCount, formatTime, formatTimeParts } from '../../utils/format'
import type { RunSpeedData } from './types'

// Design plan (round 2)
//
// Question: is the run ahead or behind, and when will it finish? (guide, kept)
// Answer: two parts, so two values. Hero: units ahead or behind pace, with the slide's one primary
// feedback in the Status band. Next to it: the estimated finish.
//
// Must show, mapped:
// - Units ahead or behind pace: hero value, band "Ahead of pace" or "Behind pace".
// - ETA: Estimated finish tile, planned finish as its subtitle; status only when late or stopped.
// - Completed of planned: a large progress bar with the pace marker, the race track as a bar
//   (guide idea). The gap between the fill and the marker shows ahead or behind.
// - Current speed against pace: a second large bar on its own scale, the pace speed as its marker;
//   neutral unless below pace; a stopped line shows the Stopped badge there instead of 0.
// - Product: the progress card title (SKU and name, wraps, never cut).
//
// Not shown:
// - Run started time, run average, unplanned downtime, planned rate and "on schedule rate"
//   (current product): they explain the pace but do not answer the question.
// - Race track cars and flag: the bar and the marker say the same with less decoding.
// - Running badge: a run state shows only when the line is stopped (on the speed row), since a
//   running line is the normal case of this slide.
//
// Layout options:
// a) Three tiles in a row (round 1, Run throughput row): speed as a tile made it filler next to the bar.
// b) One progress view full screen with the numbers on it: the ETA and the gap become small labels.
// c) Hero and ETA tile on top, a progress card below with two bars: completed against the pace
//    count, and speed against the pace speed. Chosen: the two answers lead at KPI size, and the two
//    bars show why, read the same way (fill against marker).
const props = defineProps<{ data: RunSpeedData }>()
const d = computed(() => props.data)

const gap = computed(() => d.value.produced - d.value.paceTarget)
const band = computed<{ status: FillStatus; label: string }>(() => {
  const g = gap.value
  return {
    status: d.value.status ?? (g < 0 ? 'negative' : 'positive'),
    label: g > 0 ? 'Ahead of pace' : g < 0 ? 'Behind pace' : 'On pace',
  }
})

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)
const stopped = computed(() => !d.value.endsAt)
const eta = computed(() => (d.value.endsAt ? formatTimeParts(d.value.endsAt) : { time: 'No ETA', period: '' }))
// Early or on time stays neutral; late is a warning; no estimate while stopped is a warning.
const finish = computed<{ status?: Status; label: string }>(() => {
  // Stopped: the Stopped badge on the speed row says why; the footer keeps the planned finish.
  if (!d.value.endsAt) return { status: undefined, label: `Planned ${formatTime(d.value.plannedEndAt)}` }
  const late = Math.round((d.value.endsAt.getTime() - d.value.plannedEndAt.getTime()) / 60_000)
  if (late > 5) return { status: 'warning', label: `${formatDuration(late)} late` }
  return { status: undefined, label: late < -5 ? `${formatDuration(-late)} early` : 'On schedule' }
})
const belowPace = computed(() => !stopped.value && d.value.currentRate < d.value.paceRate)
// Speed scale: fixed at 125% of the pace speed (the marker sits at 80%), so the bar length means the
// same on every run; a faster speed fills to the end.
const speedMax = computed(() => d.value.paceRate * 1.25)
const productLine = computed(() =>
  d.value.product.startsWith(d.value.sku) ? d.value.product : `${d.value.sku} · ${d.value.product}`,
)
</script>

<template>
  <div class="rz-run-speed">
    <KpiTile
      :title="gap >= 0 ? `${cap(d.unit.plural)} ahead of pace` : `${cap(d.unit.plural)} behind pace`"
      :value="formatKpiCount(Math.abs(gap))"
      :unit="d.unit.plural"
      :band-status="band.status"
      :band-text="band.label"
    />
    <StatTile
      title="Estimated finish"
      :subtitle="stopped ? undefined : `Planned ${formatTime(d.plannedEndAt)}`"
      :value="eta.time"
      :unit="eta.period"
      :status="finish.status"
      :status-text="finish.label"
    />
    <ChartCard class="progress-card" :title="productLine">
      <div class="progress">
        <ProgressBar
          size="lg"
          :value="d.produced"
          :max="d.plannedTotal"
          label="Completed"
          :value-text="`${formatCount(d.produced)} of ${formatCount(d.plannedTotal)} ${d.unit.plural}`"
          :marker="d.paceTarget"
          :marker-label="`Pace ${formatCount(d.paceTarget)}`"
        />
        <ProgressBar
          size="lg"
          :value="d.currentRate"
          :max="speedMax"
          label="Speed"
          :marker="d.paceRate"
        >
          <template #value>
            <RunStatusBadge v-if="stopped" state="stopped" />
            <template v-else>
              <StatusIcon v-if="belowPace" status="negative" :size="32" label="Below pace" />
              <span :class="{ negative: belowPace }">{{ formatCount(d.currentRate) }} {{ d.unit.plural }}/h</span>
            </template>
            <span class="pace">Pace {{ formatCount(d.paceRate) }}/h</span>
          </template>
        </ProgressBar>
      </div>
    </ChartCard>
  </div>
</template>

<style scoped>
/* Same rhythm as Run throughput: 380 px tile row, 430 px support tile, spacing/md gaps. */
.rz-run-speed {
  position: absolute;
  inset: 0;
  padding: var(--rz-spacing-md) var(--rz-spacing-xl) var(--rz-spacing-xl);
  display: grid;
  grid-template-columns: minmax(0, 1fr) 430px;
  grid-template-rows: 380px minmax(0, 1fr);
  gap: var(--rz-spacing-md);
}
.progress-card {
  grid-column: 1 / -1;
  min-height: 0;
}
.progress {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: var(--rz-spacing-sm);
}
.negative {
  color: var(--rz-color-status-negative-content);
}
.pace {
  margin-left: var(--rz-spacing-xs);
  font: var(--rz-tv-type-body);
  color: var(--rz-color-text-secondary);
}
</style>
