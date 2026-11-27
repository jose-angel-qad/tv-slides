<script setup lang="ts">
import { computed } from 'vue'
import StatusIcon from '../status/StatusIcon.vue'
import { formatCount } from '../../utils/format'

// Inventory: "Line balance chart" (Data viz). Steps in process order, left to right: one vertical
// bar per step (steps completed, data/neutral, starts at zero, value above), the step name under
// it in horizontal text that wraps to two lines (audit: names were rotated), and the WIP between
// two steps as a labeled value ("12 WIP"), not an unlabeled triangle.
// The bottleneck (the largest WIP at or above `wipLimit`) shows the negative status icon and
// status/negative/content (secondary feedback; the slide's KPI carries the primary one).
// Fixed geometry: WIP column 112 px, bar width 62% of its column up to 120 px.
export interface FlowStep {
  id: string
  name: string
  completed: number
  /** Units waiting between this step and the next one. */
  wipAfter?: number
}

const props = defineProps<{ steps: FlowStep[]; wipLimit?: number }>()
const max = computed(() => Math.max(...props.steps.map((s) => s.completed), 1))
const bottleneck = computed(() => {
  let best = -1
  let id = ''
  props.steps.slice(0, -1).forEach((s) => {
    if ((s.wipAfter ?? 0) > best) {
      best = s.wipAfter ?? 0
      id = s.id
    }
  })
  return props.wipLimit != null && best >= props.wipLimit ? id : ''
})
const columns = computed(() => props.steps.map((_, i) => (i < props.steps.length - 1 ? 'minmax(0, 1fr) 112px' : 'minmax(0, 1fr)')).join(' '))
</script>

<template>
  <div class="rz-step-flow" :style="{ gridTemplateColumns: columns }">
    <template v-for="(s, i) in props.steps" :key="s.id">
      <div class="plot" :style="{ gridColumn: i * 2 + 1 }">
        <div class="bar-area">
          <div class="bar" :style="{ height: `${(s.completed / max) * 100}%` }">
            <span class="value">{{ formatCount(s.completed) }}</span>
          </div>
        </div>
      </div>
      <span class="name" :style="{ gridColumn: i * 2 + 1 }">{{ s.name }}</span>
      <div
        v-if="i < props.steps.length - 1"
        class="wip"
        :class="{ bottleneck: s.id === bottleneck }"
        :style="{ gridColumn: i * 2 + 2 }"
      >
        <StatusIcon v-if="s.id === bottleneck" status="negative" :size="36" />
        <span class="wip-value">{{ formatCount(s.wipAfter ?? 0) }}</span>
        <span class="wip-label">WIP</span>
      </div>
    </template>
  </div>
</template>

<style scoped>
.rz-step-flow {
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-rows: minmax(0, 1fr) auto;
  column-gap: 0;
  row-gap: var(--rz-spacing-sm);
}
.plot {
  grid-row: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
  /* Room for the value label above the tallest bar. */
  padding-top: calc(var(--rz-tv-line-height-xs) + var(--rz-spacing-xs));
  border-bottom: 2px solid var(--rz-color-data-axis);
}
.bar-area {
  flex: 1;
  min-height: 0;
  display: flex;
  justify-content: center;
  align-items: flex-end;
}
.value {
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  padding-bottom: var(--rz-spacing-xs);
  font: var(--rz-tv-type-chart-value);
  color: var(--rz-color-text-secondary);
}
.bar {
  position: relative;
  width: 62%;
  max-width: 120px;
  min-height: 4px;
  border-radius: var(--rz-radius-sm) var(--rz-radius-sm) 0 0;
  background: var(--rz-color-data-neutral);
}
.name {
  grid-row: 2;
  text-align: center;
  font: var(--rz-tv-type-body-strong);
  color: var(--rz-color-text-primary);
}
.wip {
  grid-row: 1;
  align-self: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--rz-spacing-3xs);
  color: var(--rz-color-text-primary);
}
.wip-value {
  font: var(--rz-tv-type-chart-value);
}
.wip-label {
  font: var(--rz-tv-type-body);
  color: var(--rz-color-text-secondary);
}
.wip.bottleneck,
.wip.bottleneck .wip-label {
  color: var(--rz-color-status-negative-content);
}
</style>
