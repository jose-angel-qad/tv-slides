<script setup lang="ts">
import { computed, ref } from 'vue'
import ChartCard from '../../components/card/ChartCard.vue'
import HourlyBarChart from '../../components/data-viz/HourlyBarChart.vue'
import ChartLegendItem from '../../components/data-viz/ChartLegendItem.vue'
import { formatPercent, formatPercentTick } from '../../utils/format'
import { useElementSize } from '../../utils/useElementSize'
import type { HourlyOeeData } from './types'

// Design plan (round 2)
//
// Question: which hours met the OEE target?
// Answer (hero): the hourly OEE bar chart. It fills the slide body; each bar is one hour of the shift.
//
// Must show, mapped:
// - OEE per hour: one bar per hour with its value as a direct label.
// - Target: the dashed target line, labeled at its right end ("Target 85.0%").
// - Hours above and below target: bar color plus the status icon on below-target values, and the
//   card title counts them ("4 of 6 hours on target"), which is the one-line answer to the question.
// - Current hour shown as in progress: hatched bar with the "Now" tick; it is left out of the count.
//
// Not shown:
// - Shift OEE as a large number (design guide Claude idea): it answers "how is the shift going",
//   not "which hours". Logged in questions.md.
// - Hours on target and current hour tiles (round 1): the count is in the title, the current hour is in the chart.
// - Chart title "OEE per hour": repeats the slide title in the header.
// - Shift name and times: the hour ticks already show the shift's span.
// - Side navigation buttons (current product): they are an app control, not slide content.
//
// Layout options:
// a) Hero number on top, chart below (round 1, Run throughput grid): splits attention between two answers.
// b) Chart with a side column of per-hour results: repeats the bar labels.
// c) Chart alone, full body, with the answer count as its title. Chosen: the question is a pattern
//    over time, so the chart is the answer and gets all the room. Future hours of the shift stay as
//    empty slots so the viewer sees how much of the shift is left.
const props = defineProps<{ data: HourlyOeeData }>()
const d = computed(() => props.data)

// Finished hours only: the current hour is still in progress (INFO-17).
const finished = computed(() => d.value.hourly.filter((_, i) => i < d.value.currentHourIndex))
const onTarget = computed(() => finished.value.filter((p) => p.value >= d.value.targetPerHour).length)
const summary = computed(() => {
  const n = finished.value.length
  if (n === 0) return 'First hour in progress'
  return `${onTarget.value} of ${n} ${n === 1 ? 'hour' : 'hours'} on target`
})

const chartEl = ref<HTMLElement | null>(null)
const { width, height } = useElementSize(chartEl)
</script>

<template>
  <div class="rz-hourly-oee">
    <ChartCard :title="summary">
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
          :format="formatPercent"
          :tick-format="formatPercentTick"
          :grid-values="[50, 100]"
        />
      </div>
    </ChartCard>
  </div>
</template>

<style scoped>
.rz-hourly-oee {
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
