<script setup lang="ts">
import { computed, ref } from 'vue'
import T3HeroSupport from '../../templates/T3HeroSupport.vue'
import ChartCard from '../../components/card/ChartCard.vue'
import KpiTile from '../../components/card/KpiTile.vue'
import StatTile from '../../components/card/StatTile.vue'
import BarList from '../../components/data-viz/BarList.vue'
import HourlyBarChart from '../../components/data-viz/HourlyBarChart.vue'
import type { FillStatus, Status } from '../../components/status/status'
import { formatClock, formatCount, formatDuration, formatPercent } from '../../utils/format'
import { useElementSize } from '../../utils/useElementSize'
import type { DiscreteStationData } from './types'

// Question: is this station keeping pace? It leads with the station state and its timer
// (design guide idea): working (time left), idle (idle for) or over the step time target.
// Support: steps completed this shift and average step time against target (Status line).
// The chart row splits in two: top problems (Bar list) and steps per hour (Hourly bar chart).
const props = defineProps<{ data: DiscreteStationData }>()
const d = computed(() => props.data)

const hero = computed<{ title: string; status: FillStatus; band: string }>(() => {
  const target = formatClock(d.value.stepTargetSeconds)
  if (d.value.state === 'idle') return { title: 'Idle for', status: 'warning', band: 'Station idle, no step in progress' }
  if (d.value.state === 'over') return { title: 'Over step time by', status: 'negative', band: `Over the step time target ${target}` }
  return { title: 'Step time left', status: 'positive', band: `On pace, step target ${target}` }
})
const avg = computed<{ status: Status; label: string }>(() =>
  d.value.averageStepSeconds <= d.value.stepTargetSeconds
    ? { status: 'positive', label: `On target ${formatClock(d.value.stepTargetSeconds)}` }
    : { status: 'negative', label: `Above target ${formatClock(d.value.stepTargetSeconds)}` },
)
const problemRows = computed(() =>
  d.value.problems.map((p) => ({ id: p.id, label: p.name, value: p.minutes, valueText: formatDuration(p.minutes) })),
)

const chartEl = ref<HTMLElement | null>(null)
const { width, height } = useElementSize(chartEl)
</script>

<template>
  <T3HeroSupport>
    <template #hero>
      <KpiTile
        :title="hero.title"
        :subtitle="d.station"
        :value="formatClock(d.timerSeconds)"
        :unit="d.state === 'working' ? `of ${formatClock(d.stepTargetSeconds)}` : undefined"
        :band-status="hero.status"
        :band-text="hero.band"
      />
    </template>
    <template #support>
      <StatTile
        title="Steps completed"
        :subtitle="`This shift · quality ${formatPercent(d.quality)}`"
        :value="formatCount(d.stepsCompleted)"
        :show-status="false"
      />
      <StatTile
        title="Average step time"
        subtitle="This shift"
        :value="formatClock(d.averageStepSeconds)"
        :status="avg.status"
        :status-text="avg.label"
      />
    </template>
    <template #chart>
      <div class="charts">
        <ChartCard title="Top problems">
          <BarList :rows="problemRows" :label-width="300" />
        </ChartCard>
        <ChartCard title="Steps per hour">
          <div ref="chartEl" class="chart-area">
            <HourlyBarChart
              v-if="width && height"
              :points="d.hourly"
              :target="d.targetPerHour"
              :current-index="d.currentHourIndex"
              :width="width"
              :height="height"
            />
          </div>
        </ChartCard>
      </div>
    </template>
  </T3HeroSupport>
</template>

<style scoped>
.charts {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: var(--rz-spacing-md);
  min-height: 0;
}
.chart-area {
  flex: 1;
  min-height: 0;
}
</style>
