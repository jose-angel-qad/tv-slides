<script setup lang="ts">
import { computed, ref } from 'vue'
import ChartCard from '../../components/card/ChartCard.vue'
import KpiTile from '../../components/card/KpiTile.vue'
import FactCard, { type Fact } from '../../components/card/FactCard.vue'
import HourlyBarChart from '../../components/data-viz/HourlyBarChart.vue'
import ChartLegendItem from '../../components/data-viz/ChartLegendItem.vue'
import type { FillStatus } from '../../components/status/status'
import { formatClock, formatCount, formatKpiCount, formatPercent, formatPercentTick, formatRate } from '../../utils/format'
import { useElementSize } from '../../utils/useElementSize'
import { evenGrid } from '../../components/data-viz/chartGeometry'
import type { DiscreteLocationData } from './types'

// Design plan (round 2)
//
// Question: how many units are finished, and is the line on pace? (guide, kept)
// Answer (hero): units finished this shift, "of" the plan, with the pace in the Status band
// ("9 ahead of plan"), the slide's one primary feedback.
//
// Must show, mapped:
// - Units finished: hero value.
// - Current OEE, above or below target: Fact card, "84.6%" with "Target 80%"; status only below target.
// - Cycle time and units per hour: one fact, "1:42" with "35.3 units/h" (the same speed two ways).
// - Quality and reworked units: one fact, "98.6%" with "3 reworked" (guide: one number, no pie).
// - Hourly counts: Hourly bar chart with the target per hour, the current hour hatched.
//
// Not shown:
// - OEE change ("+13.2%", current product): its baseline is unknown (questions.md).
// - Quality pie: the percent and the reworked count say it.
// - Separate tiles for OEE, cycle time and quality (round 1): three tiles left the hero 500 px wide
//   and read as a row of equals.
//
// Layout options:
// a) Hero plus three Stat tiles over the chart (round 1, Run throughput grid): the hero shrinks and
//    the supporting facts compete with it.
// b) Hero over the chart, facts as a strip under the hero: the facts lose their context lines.
// c) Hero and one Fact card over the chart. Chosen: the hero keeps its width, the three supporting
//    facts read as one group, and only an off-target fact draws attention.
const props = defineProps<{ data: DiscreteLocationData }>()
const d = computed(() => props.data)
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)

const pace = computed<{ status: FillStatus; label: string }>(() => {
  const n = d.value.deltaVsPlan
  const label = n > 0 ? `${formatCount(n)} ahead of plan` : n < 0 ? `${formatCount(-n)} behind plan` : 'On plan'
  return { status: d.value.status ?? (n < 0 ? 'negative' : 'positive'), label }
})
const facts = computed<Fact[]>(() => {
  const below = d.value.oee < d.value.oeeTarget
  return [
    {
      label: 'OEE',
      value: formatPercent(d.value.oee),
      detail: `Target ${formatPercentTick(d.value.oeeTarget)}`,
      status: below ? 'negative' : undefined,
      statusLabel: below ? 'Below target' : undefined,
    },
    { label: 'Cycle time', value: formatClock(d.value.cycleSeconds), detail: `${formatRate(d.value.unitsPerHour)} ${d.value.unit.plural}/h` },
    { label: 'Quality', value: formatPercent(d.value.quality), detail: `${formatCount(d.value.reworked)} reworked` },
  ]
})

const chartEl = ref<HTMLElement | null>(null)
const { width, height } = useElementSize(chartEl)
</script>

<template>
  <div class="rz-discrete-location">
    <KpiTile
      :title="`${cap(d.unit.plural)} finished this shift`"
      :subtitle="d.shift"
      :value="formatKpiCount(d.finished)"
      :unit="d.plannedTotal ? `of ${formatKpiCount(d.plannedTotal)}` : undefined"
      :band-status="pace.status"
      :band-text="pace.label"
    />
    <FactCard :facts="facts" />
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
/* Same rhythm as Run throughput: 380 px tile row, spacing/md gaps. The Fact card is 560 px wide:
   room for "98.6%  3 reworked" on one line at 44 px. */
.rz-discrete-location {
  position: absolute;
  inset: 0;
  padding: var(--rz-spacing-md) var(--rz-spacing-xl) var(--rz-spacing-xl);
  display: grid;
  grid-template-columns: minmax(0, 1fr) 560px;
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
