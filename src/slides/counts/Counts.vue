<script setup lang="ts">
import { computed, ref } from 'vue'
import ChartCard from '../../components/card/ChartCard.vue'
import LineChart, { type PeriodBand } from '../../components/data-viz/LineChart.vue'
import RunStatusBadge from '../../components/status/RunStatusBadge.vue'
import { formatCount, formatDuration } from '../../utils/format'
import { useElementSize } from '../../utils/useElementSize'
import type { CountsData } from './types'

// Design plan (round 2)
//
// Question: is the line producing at a steady rate? (guide, kept)
// Answer (hero): the count rate line over the shift against the target rate, full body. Stops and
// slowdowns are marked on the line as tinted periods with an icon and their length, so the
// unsteady parts are what the eye finds first. The card title is the one-line answer: the unit,
// then the stops and slowdowns counted ("Cases per hour: 1 stop (20m), 1 slowdown").
//
// Must show, mapped:
// - Count rate over time: the line, one sample every 10 minutes.
// - Target rate: dashed target line, labeled at its right end.
// - Stops and slowdowns: negative bands (rate 0) and warning bands (below 80% of target), each with
//   status icon and duration; counted in the title.
//
// Not shown:
// - Current rate as a number (guide Claude idea) and units this shift (round 1): the line ends at
//   now, and a total answers "how many", not "how steady". A line stopped now shows a Stopped badge.
// - Stop minutes, stops and slowdowns as tiles (round 1): they are on the chart and in the title.
// - Area fill (current product): a solid block hides the shape the question is about.
//
// Layout options:
// a) Hero current rate over the chart (round 1): a single number cannot say "steady".
// b) Chart with a side list of stops: repeats the bands.
// c) Chart alone, full body, with marked periods. Chosen: steadiness is a pattern over time.
const props = defineProps<{ data: CountsData }>()
const d = computed(() => props.data)
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)

// A slowdown: running below 80% of the target rate. An assumption, logged in questions.md.
const SLOW_SHARE = 0.8
const SAMPLE_MIN = 10
const bands = computed<PeriodBand[]>(() => {
  const out: PeriodBand[] = []
  const kind = (v: number) => (v === 0 ? 'negative' : v < d.value.targetRate * SLOW_SHARE ? 'warning' : null)
  let i = 0
  const pts = d.value.trend
  while (i < pts.length) {
    const k = kind(pts[i].value)
    if (!k) {
      i++
      continue
    }
    let j = i
    while (j + 1 < pts.length && kind(pts[j + 1].value) === k) j++
    const mins = (j - i + 1) * SAMPLE_MIN
    out.push({ from: i, to: j, status: k, label: formatDuration(mins) })
    i = j + 1
  }
  return out
})
const stops = computed(() => bands.value.filter((b) => b.status === 'negative'))
const slows = computed(() => bands.value.filter((b) => b.status === 'warning'))
const stopMinutes = computed(() => stops.value.reduce((n, b) => n + (b.to - b.from + 1) * SAMPLE_MIN, 0))
const stoppedNow = computed(() => d.value.trend[d.value.trend.length - 1]?.value === 0)
const title = computed(() => {
  const parts: string[] = []
  if (stops.value.length)
    parts.push(`${stops.value.length} ${stops.value.length === 1 ? 'stop' : 'stops'} (${formatDuration(stopMinutes.value)})`)
  if (slows.value.length) parts.push(`${slows.value.length} ${slows.value.length === 1 ? 'slowdown' : 'slowdowns'}`)
  const answer = parts.length ? parts.join(', ') : 'no stops or slowdowns'
  return `${cap(d.value.unit.plural)} per hour: ${answer}`
})

const chartEl = ref<HTMLElement | null>(null)
const { width, height } = useElementSize(chartEl)
</script>

<template>
  <div class="rz-counts">
    <ChartCard :title="title">
      <template v-if="stoppedNow" #actions><RunStatusBadge state="stopped" /></template>
      <div ref="chartEl" class="chart-area">
        <LineChart
          v-if="width && height"
          :points="d.trend"
          :width="width"
          :height="height"
          :lines="[{ value: d.targetRate, label: 'Target' }]"
          :bands="bands"
          :format="formatCount"
        />
      </div>
    </ChartCard>
  </div>
</template>

<style scoped>
.rz-counts {
  position: absolute;
  inset: 0;
  padding: var(--rz-spacing-md) var(--rz-spacing-xl) var(--rz-spacing-xl);
  display: grid;
}
.chart-area {
  flex: 1;
  min-height: 0;
}
</style>
