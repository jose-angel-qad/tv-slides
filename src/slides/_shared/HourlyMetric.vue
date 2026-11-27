<script setup lang="ts">
import { computed, ref } from 'vue'
import T3HeroSupport from '../../templates/T3HeroSupport.vue'
import ChartCard from '../../components/card/ChartCard.vue'
import KpiTile from '../../components/card/KpiTile.vue'
import StatTile from '../../components/card/StatTile.vue'
import HourlyBarChart from '../../components/data-viz/HourlyBarChart.vue'
import ChartLegendItem from '../../components/data-viz/ChartLegendItem.vue'
import type { FillStatus } from '../../components/status/status'
import {
  formatCount,
  formatHour,
  formatKpiCount,
  formatPercent,
  formatPercentTick,
  formatRate,
  formatTime,
} from '../../utils/format'
import { useElementSize } from '../../utils/useElementSize'
import type { HourlyMetricData, HourlyMetricKind } from './hourlyMetric'

// Shared body of the hourly metric slides: Hourly OEE, Hourly counts and Units/man hour.
// Same template as Run throughput (T3): the shift value is the hero with the Status band,
// two neutral support tiles (hours on target, current hour) and the hourly bar chart.
// The support tiles have no target of their own, so they stay neutral (INFO-03, INFO-05).
const props = defineProps<{
  data: HourlyMetricData
  kind: HourlyMetricKind
  heroTitle: string
  chartTitle: string
  /** Unit after the value, for counts and rates ("cases", "cases per man hour"). */
  unit?: string
  /** Planned total for counts ("of 3,520"). */
  plannedTotal?: number
}>()
const d = computed(() => props.data)

const fmt = (n: number) =>
  props.kind === 'percent' ? formatPercent(n) : props.kind === 'rate' ? formatRate(n) : formatCount(n)
const tickFmt = (n: number) => (props.kind === 'percent' ? formatPercentTick(n) : formatCount(n))

const band = computed<{ status: FillStatus; label: string }>(() => {
  const g = d.value.shiftGap
  const abs = Math.abs(g)
  let label: string
  if (props.kind === 'percent') label = g === 0 ? 'On target' : `${formatRate(abs)} pts ${g > 0 ? 'above' : 'below'} target`
  else if (props.kind === 'count') label = g === 0 ? 'On target' : `${formatCount(abs)} ${g > 0 ? 'ahead of' : 'behind'} target`
  else label = g === 0 ? 'On target' : `${formatRate(abs)} ${g > 0 ? 'above' : 'below'} target`
  return { status: d.value.status ?? (g < 0 ? 'negative' : 'positive'), label }
})

const heroValue = computed(() =>
  props.kind === 'count' ? formatKpiCount(d.value.shiftValue) : fmt(d.value.shiftValue),
)
const heroUnit = computed(() => {
  if (props.kind === 'count' && props.plannedTotal) return `of ${formatKpiCount(props.plannedTotal)}`
  return props.kind === 'percent' ? undefined : props.unit
})

// Finished hours only: the current hour is still in progress (INFO-17).
const finished = computed(() => d.value.hourly.filter((_, i) => i < d.value.currentHourIndex))
const hoursOnTarget = computed(() => finished.value.filter((p) => p.value >= d.value.targetPerHour).length)
const current = computed(() => d.value.hourly[d.value.currentHourIndex])

const chartEl = ref<HTMLElement | null>(null)
const { width, height } = useElementSize(chartEl)
</script>

<template>
  <T3HeroSupport>
    <template #hero>
      <KpiTile
        :title="props.heroTitle"
        :subtitle="`${d.shift} · ${formatTime(d.shiftStart)} to ${formatTime(d.shiftEnd)}`"
        :value="heroValue"
        :unit="heroUnit"
        :band-status="band.status"
        :band-text="band.label"
      />
    </template>

    <template #support>
      <StatTile
        title="Hours on target"
        subtitle="Finished hours"
        :value="String(hoursOnTarget)"
        :unit="`of ${finished.length}`"
        :show-status="false"
      />
      <StatTile
        v-if="current"
        title="Current hour"
        :subtitle="`${formatHour(current.hour)}, in progress`"
        :value="fmt(current.value)"
        :show-status="false"
      />
    </template>

    <template #chart>
      <ChartCard :title="props.chartTitle">
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
            :format="fmt"
            :tick-format="tickFmt"
          />
        </div>
      </ChartCard>
    </template>
  </T3HeroSupport>
</template>

<style scoped>
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
