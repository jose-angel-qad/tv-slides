<script setup lang="ts">
import { computed, ref } from 'vue'
import ChartCard from '../../components/card/ChartCard.vue'
import KpiTile from '../../components/card/KpiTile.vue'
import FactCard, { type Fact } from '../../components/card/FactCard.vue'
import BarList, { type BarListRow } from '../../components/data-viz/BarList.vue'
import HourlyBarChart from '../../components/data-viz/HourlyBarChart.vue'
import { evenGrid } from '../../components/data-viz/chartGeometry'
import type { FillStatus } from '../../components/status/status'
import { formatClock, formatCount, formatDuration, formatPercent } from '../../utils/format'
import { useElementSize } from '../../utils/useElementSize'
import type { DiscreteStationData } from './types'

// Design plan (round 2)
//
// Question: is this station keeping pace? (guide, kept)
// Answer (hero): the station's state and timer (guide idea: lead with the state, the first thing an
// operator needs). The timer is the value ("2:14 left in this step", "6:32 idle", "1:12 over by"), the
// state is the Status band, the slide's one primary feedback: Working (positive), Idle (warning),
// Over step time (negative).
//
// Must show, mapped:
// - Station state and timer: hero tile.
// - Steps completed: Fact card.
// - Average step time against target: Fact card, status only when over target.
// - Quality yield: Fact card, neutral (no target).
// - Top problems: Bar list, three rows, time lost.
// - Steps per hour: Hourly bar chart with the target per hour.
//
// Not shown:
// - Quality circle (current product): the percent says it.
// - Run status badge: the state already is the hero's Status band; a badge would repeat it.
// - Rework count: no value in the data for a station (questions.md).
//
// Layout options:
// a) Steps completed as the hero (current product): it does not say whether the station keeps pace now.
// b) Hero plus three Stat tiles (round 1): the hero shrinks and four tiles compete.
// c) Hero state and timer with a Fact card, then the hourly chart and top problems side by side.
//    Chosen: the state leads, the facts read as one group, and the chart keeps most of the width.
const props = defineProps<{ data: DiscreteStationData }>()
const d = computed(() => props.data)

const hero = computed<{ title: string; unit: string; status: FillStatus; band: string }>(() => {
  switch (d.value.state) {
    case 'idle':
      return { title: 'Idle for', unit: '', status: 'warning', band: 'Idle' }
    case 'over':
      return { title: 'Over by', unit: '', status: 'negative', band: 'Over step time' }
    default:
      return { title: 'Time left in this step', unit: '', status: 'positive', band: 'Working' }
  }
})
const facts = computed<Fact[]>(() => {
  const slow = d.value.averageStepSeconds > d.value.stepTargetSeconds
  return [
    { label: 'Steps completed', value: formatCount(d.value.stepsCompleted), detail: 'this shift' },
    {
      label: 'Average step time',
      value: formatClock(d.value.averageStepSeconds),
      detail: `Target ${formatClock(d.value.stepTargetSeconds)}`,
      status: slow ? 'negative' : undefined,
      statusLabel: slow ? 'Over target' : undefined,
    },
    { label: 'Quality yield', value: formatPercent(d.value.quality) },
  ]
})
const problems = computed<BarListRow[]>(() =>
  d.value.problems.slice(0, 3).map((p) => ({ id: p.id, label: p.name, value: p.minutes, valueText: formatDuration(p.minutes) })),
)

const chartEl = ref<HTMLElement | null>(null)
const { width, height } = useElementSize(chartEl)
</script>

<template>
  <div class="rz-discrete-station">
    <KpiTile
      :title="hero.title"
      :subtitle="d.station"
      :value="formatClock(d.timerSeconds)"
      :band-status="hero.status"
      :band-text="hero.band"
    />
    <FactCard :facts="facts" />
    <ChartCard title="Steps per hour">
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
    <ChartCard title="Top problems">
      <BarList :rows="problems" :label-width="300" />
    </ChartCard>
  </div>
</template>

<style scoped>
/* Same rhythm as Run throughput: 380 px tile row, spacing/md gaps. Fact card and Top problems share
   the 640 px right column. */
.rz-discrete-station {
  position: absolute;
  inset: 0;
  padding: var(--rz-spacing-md) var(--rz-spacing-xl) var(--rz-spacing-xl);
  display: grid;
  grid-template-columns: minmax(0, 1fr) 640px;
  grid-template-rows: 380px minmax(0, 1fr);
  gap: var(--rz-spacing-md);
}
.chart-area {
  flex: 1;
  min-height: 0;
}
</style>
