<script setup lang="ts">
import { computed, ref, useId } from 'vue'
import { useElementSize } from '../../utils/useElementSize'
import {
  AXIS_STROKE,
  HATCH_PERIOD,
  HATCH_STRIPE,
  HATCH_TINT,
  TARGET_DASH,
  TARGET_STROKE,
  barWidth,
  vBarPath,
} from './chartGeometry'

// Inventory: "Mini hourly bar chart" (Data viz). Compact hourly bars for a table cell or a
// location card: no axis or value labels. The slide names what it shows (a column header such as
// "Last 12 hours", or a text summary such as "8 of 12 on target"). Same geometry and marks as the
// Hourly bar chart (chartGeometry): bar 62% of its slot, radius min(10, bar x 0.15), data/neutral
// bars, below-target bars in status/negative/content, the current hour hatched, a dashed
// text/secondary target line and a data/axis baseline. Bars start at zero.
// Fixed geometry: the current hour keeps at least 8 px so a stopped line's hatch stays visible.
const props = withDefaults(
  defineProps<{ values: number[]; target?: number; currentIndex?: number; height?: number }>(),
  { currentIndex: -1, height: 56 },
)
const el = ref<HTMLElement | null>(null)
const { width } = useElementSize(el)
const stripeId = `rz-mini-stripes-${useId()}`

// Headroom above the tallest bar or the target line, so the line never sits on the top edge.
const max = computed(() => Math.max(...props.values, props.target ?? 0, 1) * 1.08)
const base = computed(() => props.height - AXIS_STROKE / 2)
const y = (v: number) => base.value - (v / max.value) * base.value
const slot = computed(() => (width.value || 1) / Math.max(props.values.length, 1))
const bars = computed(() =>
  props.values.map((v, i) => {
    const current = i === props.currentIndex
    const w = barWidth(slot.value)
    const x = i * slot.value + (slot.value - w) / 2
    const top = current ? Math.min(y(v), base.value - 8) : Math.min(y(v), base.value - 2)
    return {
      i,
      d: vBarPath(x, top, w, base.value),
      fill: current
        ? `url(#${stripeId})`
        : props.target != null && v < props.target
          ? 'var(--rz-color-status-negative-content)'
          : 'var(--rz-color-data-neutral)',
    }
  }),
)
</script>

<template>
  <div ref="el" class="rz-mini-bars" :style="{ height: `${props.height}px` }" aria-hidden="true">
    <svg v-if="width" :width="width" :height="props.height" :viewBox="`0 0 ${width} ${props.height}`">
      <defs>
        <pattern :id="stripeId" patternUnits="userSpaceOnUse" :width="HATCH_PERIOD" :height="HATCH_PERIOD" patternTransform="rotate(45)">
          <rect :width="HATCH_PERIOD" :height="HATCH_PERIOD" :fill="`color-mix(in srgb, var(--rz-color-data-neutral) ${HATCH_TINT}%, transparent)`" />
          <rect :width="HATCH_STRIPE" :height="HATCH_PERIOD" fill="var(--rz-color-data-neutral)" />
        </pattern>
      </defs>
      <path v-for="b in bars" :key="b.i" :d="b.d" :fill="b.fill" />
      <line :x1="0" :x2="width" :y1="base" :y2="base" stroke="var(--rz-color-data-axis)" :stroke-width="AXIS_STROKE" />
      <line
        v-if="props.target != null"
        :x1="0"
        :x2="width"
        :y1="y(props.target)"
        :y2="y(props.target)"
        stroke="var(--rz-color-text-secondary)"
        :stroke-width="TARGET_STROKE"
        :stroke-dasharray="TARGET_DASH"
      />
    </svg>
  </div>
</template>

<style scoped>
.rz-mini-bars {
  position: relative;
  width: 100%;
  min-width: 0;
}
.rz-mini-bars svg {
  display: block;
  overflow: visible;
}
</style>
