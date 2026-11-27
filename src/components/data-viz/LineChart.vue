<script setup lang="ts">
import { computed } from 'vue'
import dangerousSvg from '@material-symbols/svg-600/outlined/dangerous-fill.svg?raw'
import { formatCount, formatHour } from '../../utils/format'

// Inventory: "Count trend area chart" (Data viz). One metric over time, drawn 1:1 in canvas pixels,
// in the same language as the Hourly bar chart: faint gridlines, few y ticks, quiet axis labels,
// one data/neutral line. Reference lines (target, control and spec limits) are dashed
// text/secondary and labeled at their right end ("Target / 440", "UCL / 12.4"), INFO-16.
// Points outside the outermost reference lines can be flagged with the negative status icon
// (shape, not only color, A11Y-10). Counts start at zero (`zeroBased`); control charts do not.
export interface LinePoint {
  t: Date
  value: number
}
export interface RefLine {
  value: number
  label: string
}

const props = withDefaults(
  defineProps<{
    points: LinePoint[]
    width: number
    height: number
    lines?: RefLine[]
    format?: (n: number) => string
    zeroBased?: boolean
    showPoints?: boolean
    /** Flag points above the highest or below the lowest reference line. */
    flagOutside?: boolean
    /** Label the x axis every n hours (time series) or every n points (`xLabel`). */
    xLabel?: (p: LinePoint, i: number) => string
    xEvery?: number
    /** Shade under the line (area chart). */
    area?: boolean
  }>(),
  { lines: () => [], zeroBased: true, showPoints: false, flagOutside: false, xEvery: 1, area: false, format: (n: number) => formatCount(n) },
)

const AXIS_W = 96
const TICK_ROW = 56
const TOP = 24
const LABEL_GAP = 16
const ICON = 32

const labelW = computed(() => {
  if (!props.lines.length) return 0
  const longest = Math.max(...props.lines.map((l) => Math.max(l.label.length, props.format(l.value).length)))
  return LABEL_GAP + Math.max(72, longest * 18)
})
const plotX = AXIS_W
const plotW = computed(() => props.width - AXIS_W - labelW.value)
const baseline = computed(() => props.height - TICK_ROW)
const plotH = computed(() => baseline.value - TOP)

const domain = computed(() => {
  const vals = [...props.points.map((p) => p.value), ...props.lines.map((l) => l.value)]
  let lo = Math.min(...vals)
  let hi = Math.max(...vals)
  if (props.zeroBased) lo = Math.min(0, lo)
  const pad = (hi - lo) * 0.08 || 1
  if (!props.zeroBased) lo -= pad
  hi += pad
  return { lo, hi }
})
// About 4 nice ticks.
const ticks = computed(() => {
  const { lo, hi } = domain.value
  const raw = (hi - lo) / 4
  const mag = Math.pow(10, Math.floor(Math.log10(raw)))
  const step = [1, 2, 2.5, 5, 10].map((m) => m * mag).find((s) => s >= raw) ?? raw
  const out: number[] = []
  for (let v = Math.ceil(lo / step) * step; v <= hi + 1e-9; v += step) out.push(Number(v.toFixed(6)))
  return out
})
const y = (v: number) => baseline.value - ((v - domain.value.lo) / (domain.value.hi - domain.value.lo)) * plotH.value
const x = (i: number) => plotX + (props.points.length < 2 ? plotW.value / 2 : (i / (props.points.length - 1)) * plotW.value)

const path = computed(() => props.points.map((p, i) => `${i ? 'L' : 'M'}${x(i)},${y(p.value)}`).join(''))
const areaPath = computed(() =>
  props.points.length ? `${path.value}L${x(props.points.length - 1)},${baseline.value}L${x(0)},${baseline.value}Z` : '',
)
const hiLine = computed(() => (props.lines.length ? Math.max(...props.lines.map((l) => l.value)) : Infinity))
const loLine = computed(() => (props.lines.length ? Math.min(...props.lines.map((l) => l.value)) : -Infinity))
const outside = (v: number) => props.flagOutside && (v > hiLine.value || v < loLine.value)

const xTicks = computed(() =>
  props.points
    .map((p, i) => ({ i, p }))
    .filter(({ p, i }) => (props.xLabel ? i % props.xEvery === 0 : p.t.getMinutes() === 0 && p.t.getHours() % props.xEvery === 0))
    .map(({ p, i }) => ({ x: x(i), text: props.xLabel ? props.xLabel(p, i) : formatHour(p.t) })),
)
// Reference labels are spread apart so close lines (target and UCL) do not overlap.
const refLabels = computed(() => {
  const sorted = [...props.lines].sort((a, b) => b.value - a.value).map((l) => ({ ...l, cy: y(l.value) }))
  for (let i = 1; i < sorted.length; i++) sorted[i].cy = Math.max(sorted[i].cy, sorted[i - 1].cy + 64)
  return sorted
})
const iconPath = dangerousSvg.match(/ d="([^"]+)"/)?.[1] ?? ''
</script>

<template>
  <svg class="rz-line-chart" :width="props.width" :height="props.height" :viewBox="`0 0 ${props.width} ${props.height}`" role="img">
    <line :x1="plotX" :x2="plotX + plotW" :y1="baseline" :y2="baseline" stroke="var(--rz-color-data-axis)" stroke-width="2" />
    <g v-for="t in ticks" :key="t">
      <line :x1="plotX" :x2="plotX + plotW" :y1="y(t)" :y2="y(t)" stroke="var(--rz-color-data-axis)" stroke-width="2" />
      <text :x="plotX - 20" :y="y(t)" text-anchor="end" class="axis">{{ props.format(t) }}</text>
    </g>
    <text v-for="t in xTicks" :key="t.x" :x="t.x" :y="baseline + 36" text-anchor="middle" class="axis">{{ t.text }}</text>

    <path v-if="props.area" :d="areaPath" class="area" />
    <path :d="path" class="line" />

    <g v-for="l in refLabels" :key="l.label">
      <line :x1="plotX" :x2="plotX + plotW" :y1="y(l.value)" :y2="y(l.value)" stroke="var(--rz-color-text-secondary)" stroke-width="3" stroke-dasharray="12 8" />
      <text :x="plotX + plotW + LABEL_GAP" :y="l.cy - 15" class="ref-caption">{{ l.label }}</text>
      <text :x="plotX + plotW + LABEL_GAP" :y="l.cy + 19" class="ref-value">{{ props.format(l.value) }}</text>
    </g>

    <template v-if="props.showPoints || props.flagOutside">
      <g v-for="(p, i) in props.points" :key="i">
        <svg
          v-if="outside(p.value)"
          :x="x(i) - ICON / 2"
          :y="y(p.value) - ICON / 2"
          :width="ICON"
          :height="ICON"
          viewBox="0 -960 960 960"
          class="flag"
          aria-hidden="true"
        >
          <circle cx="480" cy="-480" r="420" class="flag-halo" />
          <path :d="iconPath" />
        </svg>
        <circle v-else-if="props.showPoints" :cx="x(i)" :cy="y(p.value)" r="8" class="dot" />
      </g>
    </template>
  </svg>
</template>

<style scoped>
.rz-line-chart {
  display: block;
  overflow: visible;
}
.axis,
.ref-caption {
  font: var(--rz-tv-type-body);
  fill: var(--rz-color-text-secondary);
  dominant-baseline: central;
}
.ref-value {
  font: var(--rz-tv-type-chart-target-value);
  fill: var(--rz-color-text-primary);
  dominant-baseline: central;
}
.line {
  fill: none;
  stroke: var(--rz-color-data-neutral);
  stroke-width: 4;
  stroke-linejoin: round;
  stroke-linecap: round;
}
.area {
  fill: color-mix(in srgb, var(--rz-color-data-neutral) 16%, transparent);
}
.dot {
  fill: var(--rz-color-data-neutral);
  stroke: var(--rz-color-surface-default);
  stroke-width: 3;
}
.flag {
  fill: var(--rz-color-status-negative-content);
  overflow: visible;
}
.flag-halo {
  fill: var(--rz-color-surface-default);
}
</style>
