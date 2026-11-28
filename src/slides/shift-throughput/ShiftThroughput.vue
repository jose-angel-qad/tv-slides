<script setup lang="ts">
import { computed, ref } from 'vue'
import ChartCard from '../../components/card/ChartCard.vue'
import KpiTile from '../../components/card/KpiTile.vue'
import StatTile from '../../components/card/StatTile.vue'
import CrewSizeIndicator from '../../components/data-display/CrewSizeIndicator.vue'
import HourlyBarChart from '../../components/data-viz/HourlyBarChart.vue'
import ChartLegendItem from '../../components/data-viz/ChartLegendItem.vue'
import type { FillStatus } from '../../components/status/status'
import { formatCount, formatKpiCount, formatRate, formatTime } from '../../utils/format'
import { useElementSize } from '../../utils/useElementSize'
import { evenGrid } from '../../components/data-viz/chartGeometry'
import type { ShiftThroughputData } from './types'

// Design plan (round 2)
//
// Question: how many units has this shift made versus plan? (guide, kept)
// Answer (hero): units produced this shift, "of" the shift plan, with the gap to plan in the
// Status band (the slide's one primary feedback, INFO-05).
//
// Must show, mapped:
// - Shift name: hero subtitle with the shift span ("Shift 2 · 2:00 PM to 10:00 PM").
// - Units produced and gap to plan: hero value and Status band.
// - Crew size against target: Crew size indicator, quiet (neutral when on target, negative below).
// - Units per hour: Hourly bar chart with the target line and the current hour hatched.
//
// Not shown:
// - "Average per hour" tile (round 1): the chart already shows every hour against the target.
// - "Current shift" tile (current product): the shift name sits in the hero subtitle.
// - Estimated finish (Run throughput): a shift ends at a fixed time.
//
// Layout options:
// a) Run throughput's hero plus two support tiles: the second tile would be filler.
// b) Hero number alone over the chart, crew in the hero subtitle: crew against target needs its own
//    status when it is short, which a subtitle cannot carry.
// c) Hero and one crew tile over the chart. Chosen: the question and data are Run throughput's
//    without the ETA, so the same form answers it best; dropping the ETA gives the hero the width.
const props = defineProps<{ data: ShiftThroughputData }>()
const d = computed(() => props.data)
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)

const pace = computed<{ status: FillStatus; label: string }>(() => {
  const n = d.value.deltaVsPlan
  const label = n > 0 ? `${formatCount(n)} ahead of plan` : n < 0 ? `${formatCount(-n)} behind plan` : 'On plan'
  return { status: d.value.paceStatus ?? (n < 0 ? 'negative' : 'positive'), label }
})

const chartEl = ref<HTMLElement | null>(null)
const { width, height } = useElementSize(chartEl)
</script>

<template>
  <div class="rz-shift-throughput">
    <KpiTile
      class="hero"
      :title="`${cap(d.unit.plural)} produced this shift`"
      :subtitle="`${d.shift} · ${formatTime(d.shiftStart)} to ${formatTime(d.shiftEnd)}`"
      :value="formatKpiCount(d.produced)"
      :unit="d.plannedTotal ? `of ${formatKpiCount(d.plannedTotal)}` : undefined"
      :band-status="pace.status"
      :band-text="pace.label"
    />
    <CrewSizeIndicator v-if="d.crewTarget > 0" class="crew" quiet :crew="d.crew" :target="d.crewTarget" />
    <StatTile v-else class="crew" title="Average crew" subtitle="No crew target" :value="formatRate(d.crew)" unit="people" :show-status="false" />
    <ChartCard class="chart" :title="`${cap(d.unit.plural)} per hour`">
      <template #actions>
        <ul class="legend">
          <ChartLegendItem type="on-target" label="On target" />
          <ChartLegendItem type="below-target" label="Below target" />
          <ChartLegendItem type="in-progress" label="In progress" />
        </ul>
      </template>
      <div ref="chartEl" class="chart-area">
        <HourlyBarChart
          v-if="width && height"
          :points="d.hourly"
          :target="d.targetPerHour"
          :current-index="d.currentHourIndex"
          :width="width"
          :height="height"
          :grid-values="evenGrid(Math.max(...d.hourly.map((p) => p.value), d.targetPerHour))"
        />
      </div>
    </ChartCard>
  </div>
</template>

<style scoped>
/* Same rhythm as Run throughput: 380 px tile row, 430 px support tile, spacing/md gaps. */
.rz-shift-throughput {
  position: absolute;
  inset: 0;
  padding: var(--rz-spacing-md) var(--rz-spacing-xl) var(--rz-spacing-xl);
  display: grid;
  grid-template-columns: minmax(0, 1fr) 430px;
  grid-template-rows: 380px minmax(0, 1fr);
  gap: var(--rz-spacing-md);
}
.chart {
  grid-column: 1 / -1;
  min-height: 0;
}
.chart-area {
  flex: 1;
  min-height: 0;
}
.legend {
  display: flex;
  gap: var(--rz-spacing-lg);
  margin: 0;
  padding: 0;
  list-style: none;
}
</style>
