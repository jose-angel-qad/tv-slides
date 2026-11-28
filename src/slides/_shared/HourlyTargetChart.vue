<script setup lang="ts">
import { computed, ref } from 'vue'
import ChartCard from '../../components/card/ChartCard.vue'
import HourlyBarChart, { type HourPoint } from '../../components/data-viz/HourlyBarChart.vue'
import ChartLegendItem from '../../components/data-viz/ChartLegendItem.vue'
import { useElementSize } from '../../utils/useElementSize'

// Shared body of the "which hours met the target?" slides: Hourly OEE (pilot design), Hourly counts
// and Units/man hour. The hourly bar chart fills the slide body in one Chart card; the card title is
// the one-line answer ("5 of 6 hours on target"), led by the unit when the values do not show it
// ("Bottles per hour"). Finished hours only are counted: the current hour is in progress (INFO-17).
const props = defineProps<{
  hourly: HourPoint[]
  target: number
  currentIndex: number
  /** Leads the title when the values carry no unit, for example "Bottles per hour". */
  unitLabel?: string
  format?: (n: number) => string
  tickFormat?: (n: number) => string
  gridValues?: number[]
}>()

const finished = computed(() => props.hourly.filter((_, i) => i < props.currentIndex))
const onTarget = computed(() => finished.value.filter((p) => p.value >= props.target).length)
const title = computed(() => {
  const n = finished.value.length
  const count = n === 0 ? 'First hour in progress' : `${onTarget.value} of ${n} ${n === 1 ? 'hour' : 'hours'} on target`
  return props.unitLabel ? `${props.unitLabel}: ${n === 0 ? count.toLowerCase() : count}` : count
})

// Even gridlines when the slide passes none: about three nice steps up to the tallest bar or the
// target (the chart's own fallback labels every other step, which reads uneven: 500, 1,500).
const grid = computed(() => {
  if (props.gridValues) return props.gridValues
  const top = Math.max(...props.hourly.map((p) => p.value), props.target, 1)
  const raw = top / 3
  const mag = Math.pow(10, Math.floor(Math.log10(raw)))
  const step = [1, 2, 2.5, 5, 10].map((m) => m * mag).find((v) => v >= raw) ?? raw
  return Array.from({ length: Math.ceil(top / step) }, (_, i) => (i + 1) * step)
})

const chartEl = ref<HTMLElement | null>(null)
const { width, height } = useElementSize(chartEl)
</script>

<template>
  <div class="rz-hourly-target-chart">
    <ChartCard :title="title">
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
          :points="props.hourly"
          :target="props.target"
          :current-index="props.currentIndex"
          :width="width"
          :height="height"
          :format="props.format"
          :tick-format="props.tickFormat"
          :grid-values="grid"
        />
      </div>
    </ChartCard>
  </div>
</template>

<style scoped>
.rz-hourly-target-chart {
  position: absolute;
  inset: 0;
  padding: var(--rz-spacing-md) var(--rz-spacing-xl) var(--rz-spacing-xl);
  display: grid;
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
