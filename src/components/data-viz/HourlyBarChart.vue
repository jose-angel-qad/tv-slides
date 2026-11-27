<script setup lang="ts">
import { computed, onMounted, ref, useId } from 'vue'
import dangerousSvg from '@material-symbols/svg-600/outlined/dangerous-fill.svg?raw'
import { formatCount, formatHour } from '../../utils/format'

// One metric over the shift's hours, drawn 1:1 in canvas pixels.
// Visual language follows Tremor / shadcn bar charts: faint gridlines, y-axis ticks,
// rounded bar tops, quiet axis labels. Values sit above each bar with a halo so the
// target line never cuts through them. The current hour is filled with diagonal stripes.
// The target line is labeled at its right end ("Target / 440"), not in the legend.
// Below-target bars use status/negative/content, and their values carry the filled status icon
// (dangerous, octagon) so color is never the only signal. On-target bars use data/neutral; the
// in-progress hour is hatched data/neutral.

export interface HourPoint {
  hour: Date
  value: number
}

const props = withDefaults(
  defineProps<{
    points: HourPoint[]
    target?: number
    currentIndex?: number
    width: number
    height: number
    /** Formats values, ticks and the target. Defaults to whole counts; OEE passes one-decimal percent. */
    format?: (n: number) => string
    /** Formats y-axis ticks. Defaults to `format`. */
    tickFormat?: (n: number) => string
  }>(),
  { currentIndex: -1, format: (n: number) => formatCount(n) },
)
const fmt = (n: number) => props.format(n)

// The target line is labeled at its right end ("Target" over the value). The label column is
// sized to the target's digits, so there is no wasted space and larger targets (5,000) still fit.
const AXIS_W = 88 // y-axis labels
const TICK_ROW = 56 // x-axis labels
const TOP = 52 // room for value labels above the tallest bar
const RADIUS = 10
const LABEL_GAP = 16
const TICK_CENTER = 36 // axis line to the center of the x-axis labels (Figma: 34 px label box, top 19 px below the axis)
// Value label row: 36 px tall, 12 px above the bar (Figma uses 14, snapped to the 4 px grid).
const VALUE_ROW = 36
const VALUE_GAP = 12

const plotX = AXIS_W
const targetLabelW = computed(() => {
  if (props.target == null) return 0
  const digits = fmt(props.target).length
  return LABEL_GAP + Math.max(86, Math.ceil(digits * 18)) // "Target" at 28 px ~ 86 px; digits at 28 px ~ 17 px
})
const plotW = computed(() => props.width - AXIS_W - targetLabelW.value)
const baseline = computed(() => props.height - TICK_ROW)
const plotH = computed(() => baseline.value - TOP)

// Nice ticks: about 5 steps that cover the data and the target.
const ticks = computed(() => {
  const top = Math.max(...props.points.map((p) => p.value), props.target ?? 0)
  const raw = top / 5
  const mag = Math.pow(10, Math.floor(Math.log10(raw)))
  const step = [1, 2, 2.5, 5, 10].map((m) => m * mag).find((s) => s >= raw) ?? raw
  const n = Math.ceil(top / step)
  return Array.from({ length: n + 1 }, (_, i) => i * step)
})
const yMax = computed(() => ticks.value[ticks.value.length - 1])
// Label every other step (for example 100, 300, 500) so the axis stays quiet.
const labeledTicks = computed(() => ticks.value.filter((_, i) => i % 2 === 1))
// Label center follows the target line but stays inside the plot (edge cases: target near 0 or the top).
const labelY = computed(() =>
  props.target == null ? 0 : Math.min(Math.max(y(props.target), TOP), baseline.value - 24),
)
const stripeId = `rz-stripes-${useId()}`

// Status icon for below-target values: 36 px, 4 px before the value (Figma "Hourly bar", Below target).
const ICON = 36
const ICON_GAP = 4
const iconPath = dangerousSvg.match(/ d="([^"]+)"/)?.[1] ?? ''
// Value label width, measured with the real font so the icon + value pair stays centered on the bar.
const fontsReady = ref(0)
onMounted(() => document.fonts?.ready.then(() => fontsReady.value++))
let ctx: CanvasRenderingContext2D | null = null
function textWidth(text: string) {
  void fontsReady.value
  ctx ??= document.createElement('canvas').getContext('2d')
  if (!ctx) return text.length * 19
  ctx.font = `600 32px ${getComputedStyle(document.documentElement).getPropertyValue('--rz-font-family-display') || 'sans-serif'}`
  return ctx.measureText(text).width
}
const y = (v: number) => baseline.value - (v / yMax.value) * plotH.value

const slot = computed(() => plotW.value / props.points.length)
const barW = computed(() => Math.min(104, slot.value * 0.62))
const cx = (i: number) => plotX + i * slot.value + slot.value / 2

// Bar with rounded top corners only.
function barPath(x: number, top: number, w: number, bottom: number) {
  const r = Math.min(RADIUS, (bottom - top) / 2, w / 2)
  return `M${x},${bottom}V${top + r}Q${x},${top} ${x + r},${top}H${x + w - r}Q${x + w},${top} ${x + w},${top + r}V${bottom}Z`
}

const bars = computed(() =>
  props.points.map((p, i) => {
    const current = i === props.currentIndex
    const future = props.currentIndex >= 0 && i > props.currentIndex
    const below = !current && !future && props.target != null && p.value < props.target
    const x = cx(i) - barW.value / 2
    return {
      i,
      current,
      future,
      below,
      value: fmt(p.value),
      tick: current ? 'Now' : formatHour(p.hour),
      // Center of the value text: shifted right by half the icon when the icon is shown.
      valueX: below ? cx(i) + (ICON + ICON_GAP) / 2 : cx(i),
      iconX: below ? cx(i) - (ICON + ICON_GAP + textWidth(fmt(p.value))) / 2 : 0,
      d: barPath(x, y(p.value), barW.value, baseline.value),
      top: y(p.value),
    }
  }),
)
</script>

<template>
  <svg
    class="rz-bar-chart"
    :width="props.width"
    :height="props.height"
    :viewBox="`0 0 ${props.width} ${props.height}`"
    role="img"
  >
    <defs>
      <!-- In-progress fill: translucent data color with diagonal stripes -->
      <pattern :id="stripeId" patternUnits="userSpaceOnUse" width="16" height="16" patternTransform="rotate(45)">
        <rect width="16" height="16" fill="color-mix(in srgb, var(--rz-color-data-neutral) 22%, transparent)" />
        <rect width="6" height="16" fill="var(--rz-color-data-neutral)" />
      </pattern>
    </defs>

    <!-- Grid and y-axis -->
    <line :x1="plotX" :x2="plotX + plotW" :y1="baseline" :y2="baseline" stroke="var(--rz-color-data-axis)" stroke-width="2" />
    <g v-for="t in labeledTicks" :key="t">
      <line
        :x1="plotX"
        :x2="plotX + plotW"
        :y1="y(t)"
        :y2="y(t)"
        stroke="var(--rz-color-data-axis)"
        stroke-width="2"
      />
      <text :x="plotX - 20" :y="y(t)" text-anchor="end" class="axis">{{ (props.tickFormat ?? fmt)(t) }}</text>
    </g>

    <!-- Bars -->
    <g v-for="b in bars" :key="b.i">
      <template v-if="!b.future">
        <path
          v-if="!b.current"
          :d="b.d"
          :fill="b.below ? 'var(--rz-color-status-negative-content)' : 'var(--rz-color-data-neutral)'"
        />
        <path v-else :d="b.d" :fill="`url(#${stripeId})`" />
      </template>
      <text :x="cx(b.i)" :y="baseline + TICK_CENTER" text-anchor="middle" class="tick" :class="{ now: b.current }">
        {{ b.tick }}
      </text>
    </g>

    <!-- Target line -->
    <line
      v-if="props.target != null"
      :x1="plotX"
      :x2="plotX + plotW"
      :y1="y(props.target)"
      :y2="y(props.target)"
      stroke="var(--rz-color-text-secondary)"
      stroke-width="3"
      stroke-dasharray="12 8"
    />
    <g v-if="props.target != null" class="target-label">
      <text :x="plotX + plotW + LABEL_GAP" :y="labelY - 15" class="target-caption">Target</text>
      <text :x="plotX + plotW + LABEL_GAP" :y="labelY + 19" class="target-value">{{ fmt(props.target) }}</text>
    </g>

    <!-- Value labels, on top of everything with a surface-colored halo -->
    <g v-for="b in bars" :key="'v' + b.i">
      <svg
        v-if="b.below"
        :x="b.iconX"
        :y="b.top - VALUE_GAP - VALUE_ROW"
        :width="ICON"
        :height="ICON"
        viewBox="0 -960 960 960"
        class="value-icon"
        aria-hidden="true"
      >
        <path :d="iconPath" />
      </svg>
      <text
        v-if="!b.future"
        :x="b.valueX"
        :y="b.top - VALUE_GAP - VALUE_ROW / 2"
        text-anchor="middle"
        class="value"
        :class="{ negative: b.below, current: b.current }"
      >{{ b.value }}</text>
    </g>
  </svg>
</template>

<style scoped>
.rz-bar-chart {
  display: block;
  overflow: visible;
  font-family: var(--rz-font-family-text);
}
/* Text roles: axis, ticks and target caption are read (Inter); values are looked at (Geist). */
.axis,
.tick,
.target-caption {
  font: var(--rz-tv-type-body);
  fill: var(--rz-color-text-secondary);
}
.axis {
  dominant-baseline: central;
}
.tick {
  dominant-baseline: central;
}
.tick.now {
  font: var(--rz-tv-type-body-strong);
  fill: var(--rz-color-text-primary);
}
.target-caption,
.target-value {
  dominant-baseline: central;
}
.target-value {
  font: var(--rz-tv-type-chart-target-value);
  fill: var(--rz-color-text-primary);
}
.value {
  font: var(--rz-tv-type-chart-value);
  dominant-baseline: central;
  /* On-target and in-progress values stay quiet; below-target values get the negative color and icon. */
  fill: var(--rz-color-text-secondary);
  paint-order: stroke;
  stroke: var(--rz-color-surface-default);
  stroke-width: 10px;
  stroke-linejoin: round;
}
.value.negative {
  fill: var(--rz-color-status-negative-content);
}
.value-icon {
  fill: var(--rz-color-status-negative-content);
  overflow: visible;
}
</style>
