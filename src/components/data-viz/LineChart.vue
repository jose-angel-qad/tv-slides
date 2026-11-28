<script setup lang="ts">
import { computed } from 'vue'
import dangerousSvg from '@material-symbols/svg-600/outlined/dangerous-fill.svg?raw'
import warningSvg from '@material-symbols/svg-600/outlined/warning-fill.svg?raw'
import { AXIS_STROKE, TARGET_DASH, TARGET_STROKE } from './chartGeometry'
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
/**
 * A marked period, by point index (inclusive): stops (negative) and slowdowns (warning). Drawn as a
 * tinted band (status content at 14%, warning 22%) behind the line, with the status icon and a short label at
 * the top, so color is never the only signal.
 */
export interface PeriodBand {
  from: number
  to: number
  status: 'negative' | 'warning'
  /** Short text after the icon, for example a duration. Optional: a slowdown can be the icon alone. */
  label?: string
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
    /** Also flag points below the lowest line. Off for range charts, whose lowest line is R-bar. */
    flagLow?: boolean
    /** Label the x axis every n hours (time series) or every n points (`xLabel`). */
    xLabel?: (p: LinePoint, i: number) => string
    xEvery?: number
    /** Shade under the line (area chart). */
    area?: boolean
    bands?: PeriodBand[]
  }>(),
  { bands: () => [], lines: () => [], flagLow: true, zeroBased: true, showPoints: false, flagOutside: false, xEvery: 1, area: false, format: (n: number) => formatCount(n) },
)

const AXIS_W = 96
const TICK_ROW = 56
// TOP leaves room for band labels (36 px row) above the plot when bands are shown.
const TOP_PLAIN = 24
const TOP_BANDS = 64
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
const top = computed(() => (props.bands.length ? TOP_BANDS : TOP_PLAIN))
const plotH = computed(() => baseline.value - top.value)

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
const outside = (v: number) => props.flagOutside && (v > hiLine.value || (props.flagLow && v < loLine.value))

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
const warningPath = warningSvg.match(/ d="([^"]+)"/)?.[1] ?? ''
// Bands span half a sample on each side so a single sample still has width.
const step = computed(() => (props.points.length > 1 ? plotW.value / (props.points.length - 1) : plotW.value))
// Labels (icon, then optional text) center on their band and move right when they would touch the
// previous one, so adjacent bands (a stop, then a slow restart) stay readable. Text width estimate:
// 20 px per character at body-strong 28 (measured: "20m" is about 61 px).
const bandRects = computed(() => {
  let prevEnd = -Infinity
  return props.bands.map((b, k) => {
    const x0 = Math.max(plotX, x(b.from) - step.value / 2)
    const x1 = Math.min(plotX + plotW.value, x(b.to) + step.value / 2)
    const w = ICON + (b.label ? 8 + b.label.length * 20 : 0)
    const lx = Math.min(Math.max((x0 + x1) / 2 - w / 2, prevEnd + 24), plotX + plotW.value - w)
    prevEnd = lx + w
    return { k, x: x0, w: x1 - x0, lx, status: b.status, label: b.label }
  })
})
</script>

<template>
  <svg class="rz-line-chart" :width="props.width" :height="props.height" :viewBox="`0 0 ${props.width} ${props.height}`" role="img">
    <line :x1="plotX" :x2="plotX + plotW" :y1="baseline" :y2="baseline" stroke="var(--rz-color-data-axis)" :stroke-width="AXIS_STROKE" />
    <g v-for="t in ticks" :key="t">
      <line :x1="plotX" :x2="plotX + plotW" :y1="y(t)" :y2="y(t)" stroke="var(--rz-color-data-axis)" :stroke-width="AXIS_STROKE" />
      <text :x="plotX - 20" :y="y(t)" text-anchor="end" class="axis">{{ props.format(t) }}</text>
    </g>
    <text v-for="t in xTicks" :key="t.x" :x="t.x" :y="baseline + 36" text-anchor="middle" class="axis">{{ t.text }}</text>

    <g v-for="b in bandRects" :key="'b' + b.k">
      <rect :x="b.x" :y="top" :width="b.w" :height="baseline - top" :class="['band', b.status]" />
      <svg :x="b.lx" :y="top - 50" :width="ICON" :height="ICON" viewBox="0 -960 960 960" :class="['band-icon', b.status]" aria-hidden="true">
        <path :d="b.status === 'negative' ? iconPath : warningPath" />
      </svg>
      <text v-if="b.label" :x="b.lx + ICON + 8" :y="top - 34" :class="['band-label', b.status]">{{ b.label }}</text>
    </g>
    <path v-if="props.area" :d="areaPath" class="area" />
    <path :d="path" class="line" />

    <g v-for="l in refLabels" :key="l.label">
      <line :x1="plotX" :x2="plotX + plotW" :y1="y(l.value)" :y2="y(l.value)" stroke="var(--rz-color-text-secondary)" :stroke-width="TARGET_STROKE" :stroke-dasharray="TARGET_DASH" />
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
.band.negative {
  fill: color-mix(in srgb, var(--rz-color-status-negative-content) 14%, transparent);
}
.band.warning {
  /* Amber needs more tint than red to read as amber, not olive (Dark) or beige (Light). */
  fill: color-mix(in srgb, var(--rz-color-status-warning-content) 22%, transparent);
}
.band-icon.negative,
.band-label.negative {
  fill: var(--rz-color-status-negative-content);
}
.band-icon.warning,
.band-label.warning {
  fill: var(--rz-color-status-warning-content);
}
.band-label {
  font: var(--rz-tv-type-body-strong);
  dominant-baseline: central;
}
.flag-halo {
  fill: var(--rz-color-surface-default);
}
</style>
