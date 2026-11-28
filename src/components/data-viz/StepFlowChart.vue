<script setup lang="ts">
import { computed, ref } from 'vue'
import StatusIcon from '../status/StatusIcon.vue'
import { formatCount } from '../../utils/format'
import { useElementSize } from '../../utils/useElementSize'
import { AXIS_STROKE, TARGET_DASH, TARGET_STROKE, barWidth, vBarPath } from './chartGeometry'

// Inventory: "Line balance chart" (Data viz). Where work piles up between steps.
// Steps in process order, left to right, each as a label column under the axis: step name (wraps,
// never rotated, audit) and its steps completed ("148 done"). Between two steps, the WIP waiting
// for the next step is a vertical bar on one shared scale from zero, with its value above it.
// So the bars are the pile-up (the slide's question) and the completed counts are context.
// The largest WIP gets a surface/raised plate behind its value. The WIP limit is a dashed
// text/secondary line labeled at its right end ("Limit 20"), like a target line. When the largest WIP
// is at or above `wipLimit` it is a bottleneck: bar and value in status/negative/content with the
// negative status icon (secondary feedback).
// Geometry from chartGeometry: each step and each gap is one slot; WIP bars are 62% of their slot
// up to 104 px, radius min(10, bar x 0.15), data/axis baseline, one continuous line.
export interface FlowStep {
  id: string
  name: string
  completed: number
  /** Units waiting between this step and the next one. */
  wipAfter?: number
}

const props = defineProps<{ steps: FlowStep[]; wipLimit?: number }>()

const gaps = computed(() => props.steps.slice(0, -1).map((s, i) => ({ id: s.id, i, wip: s.wipAfter ?? 0 })))
const most = computed(() => gaps.value.reduce((m, g) => (g.wip > m.wip ? g : m), { id: '', i: -1, wip: 0 }))
const bottleneck = computed(() => (props.wipLimit != null && most.value.wip >= props.wipLimit ? most.value.id : ''))
const max = computed(() => Math.max(...gaps.value.map((g) => g.wip), props.wipLimit ?? 0, 1))

// One SVG plot for the bars; HTML for the labels, so names wrap.
const plotEl = ref<HTMLElement | null>(null)
const { width, height } = useElementSize(plotEl)
// Columns alternate step, gap, step...: 2n - 1 slots of equal width.
const slots = computed(() => props.steps.length * 2 - 1)
const slot = computed(() => (width.value || 1) / slots.value)
// Room above the tallest bar for its value plate.
const TOP = 96
const base = computed(() => height.value - AXIS_STROKE / 2)
const y = (v: number) => base.value - (v / max.value) * (base.value - TOP)
const bars = computed(() =>
  gaps.value.map((g) => {
    const cx = (g.i * 2 + 1.5) * slot.value
    // A WIP bar's slot is the pitch between two step centers (two columns), so its width matches the
    // other bar charts: 62% of that slot, up to 104 px.
    const w = barWidth(slot.value * 2)
    const top = Math.min(y(g.wip), base.value - 4)
    return { ...g, cx, top, d: vBarPath(cx - w / 2, top, w, base.value) }
  }),
)
</script>

<template>
  <div class="rz-step-flow" :style="{ '--slots': slots }">
    <div ref="plotEl" class="plot">
      <svg v-if="width && height" :width="width" :height="height" :viewBox="`0 0 ${width} ${height}`" aria-hidden="true">
        <path
          v-for="b in bars"
          :key="b.id"
          :d="b.d"
          :fill="b.id === bottleneck ? 'var(--rz-color-status-negative-content)' : 'var(--rz-color-data-neutral)'"
        />
        <line :x1="0" :x2="width" :y1="base" :y2="base" stroke="var(--rz-color-data-axis)" :stroke-width="AXIS_STROKE" />
        <line
          v-if="props.wipLimit != null"
          :x1="0"
          :x2="width"
          :y1="y(props.wipLimit)"
          :y2="y(props.wipLimit)"
          stroke="var(--rz-color-text-secondary)"
          :stroke-width="TARGET_STROKE"
          :stroke-dasharray="TARGET_DASH"
        />
      </svg>
      <template v-if="props.wipLimit != null">
        <div class="limit-label" :style="{ top: `${y(props.wipLimit)}px` }">Limit {{ formatCount(props.wipLimit) }}</div>
      </template>
      <div
        v-for="b in bars"
        :key="'v' + b.id"
        class="wip"
        :class="{ most: b.id === most.id && b.wip > 0, bottleneck: b.id === bottleneck }"
        :style="{ left: `${b.cx}px`, top: `${b.top}px` }"
      >
        <span class="wip-value">
          <StatusIcon v-if="b.id === bottleneck" status="negative" :size="36" label="Bottleneck" />
          {{ formatCount(b.wip) }}
        </span>
      </div>
    </div>
    <div class="labels">
      <div v-for="(s, i) in props.steps" :key="s.id" class="step" :style="{ gridColumn: `${i * 2 + 1} / span 1` }">
        <span class="name">{{ s.name }}</span>
        <span class="done">{{ formatCount(s.completed) }} done</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.rz-step-flow {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  gap: var(--rz-spacing-sm);
}
.plot {
  position: relative;
  flex: 1;
  min-height: 0;
}
.plot svg {
  display: block;
  overflow: visible;
}
.wip {
  position: absolute;
  transform: translate(-50%, -100%);
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  padding-bottom: var(--rz-spacing-xs);
  white-space: nowrap;
}
.wip-value {
  display: inline-flex;
  align-items: center;
  gap: var(--rz-spacing-2xs);
  font: var(--rz-tv-type-chart-value);
  color: var(--rz-color-text-primary);
}
.wip.most .wip-value {
  /* The answer: larger value on a raised plate. */
  padding: var(--rz-spacing-2xs) var(--rz-spacing-sm);
  border-radius: var(--rz-radius-md);
  background: var(--rz-color-surface-raised);
  font: var(--rz-tv-type-kpi-primary-unit);
}
.limit-label {
  position: absolute;
  right: 0;
  transform: translateY(-100%);
  padding-bottom: var(--rz-spacing-3xs);
  font: var(--rz-tv-type-body);
  color: var(--rz-color-text-secondary);
}
.wip.bottleneck .wip-value {
  color: var(--rz-color-status-negative-content);
}
.labels {
  display: grid;
  grid-template-columns: repeat(var(--slots), minmax(0, 1fr));
}
/* A step label may use its own slot plus half of each neighboring gap, so long names wrap to two
   lines instead of four. */
.step {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 calc(-50% + var(--rz-spacing-xs));
  text-align: center;
}
.step:first-child {
  margin-left: 0;
}
.step:last-child {
  margin-right: 0;
}
.name {
  font: var(--rz-tv-type-body-strong);
  color: var(--rz-color-text-primary);
}
.done {
  font: var(--rz-tv-type-body);
  color: var(--rz-color-text-secondary);
}
</style>
