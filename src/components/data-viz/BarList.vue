<script setup lang="ts">
import { computed } from 'vue'
import StatusIcon from '../status/StatusIcon.vue'
import type { Status } from '../status/status'

// Inventory: "Pareto row" / "Current Leader bar" (Data viz). One shared component for ranked or
// ordered horizontal bars: Pareto problems, Leaderboard points, top problems, cycles per asset.
// Each row: label (wraps to two lines, never cut, INFO-23) with an optional detail line, a bar on
// one shared scale that starts at zero, and the value at the end, outside the bar (design guide).
// Bars use data/neutral. A row with warning or negative status colors its bar and value with
// status/{status}/content and shows the status icon (secondary feedback, A11Y-10).
// In-progress rows are hatched, like the current hour. An optional target draws one dashed
// text/secondary line across every row (label it in the card legend, INFO-16).
// Fixed geometry: bar 32 px tall; label column width from the `labelWidth` prop (default 520).
export interface BarListRow {
  id: string
  label: string
  /** Second line under the label: problem type, product, state. */
  detail?: string
  value: number
  valueText: string
  status?: Status
  inProgress?: boolean
}

const props = withDefaults(
  defineProps<{ rows: BarListRow[]; max?: number; target?: number; labelWidth?: number }>(),
  { labelWidth: 520 },
)
const max = computed(() => props.max ?? Math.max(...props.rows.map((r) => r.value), props.target ?? 0, 1))
const pct = (n: number) => `${Math.max(0, Math.min(100, (n / max.value) * 100))}%`
const attention = (s?: Status) => s === 'warning' || s === 'negative'
</script>

<template>
  <ul class="rz-bar-list" :style="{ '--label-w': `${props.labelWidth}px` }">
    <li v-for="r in props.rows" :key="r.id" class="row">
      <div class="labels">
        <span class="label">{{ r.label }}</span>
        <span v-if="r.detail" class="detail">{{ r.detail }}</span>
      </div>
      <div class="track">
        <div
          class="bar"
          :class="[{ hatched: r.inProgress }, attention(r.status) ? r.status : '']"
          :style="{ width: pct(r.value) }"
        />
        <div v-if="props.target != null" class="target" :style="{ left: pct(props.target) }" />
      </div>
      <div class="value" :class="attention(r.status) ? r.status : ''">
        <StatusIcon v-if="attention(r.status)" :status="r.status!" :size="36" />
        <span>{{ r.valueText }}</span>
      </div>
    </li>
  </ul>
</template>

<style scoped>
.rz-bar-list {
  display: flex;
  flex-direction: column;
  gap: var(--rz-spacing-md);
  margin: 0;
  padding: 0;
  list-style: none;
}
.row {
  display: grid;
  grid-template-columns: var(--label-w) minmax(0, 1fr) auto;
  align-items: center;
  gap: var(--rz-spacing-lg);
}
.labels {
  display: flex;
  flex-direction: column;
  min-width: 0;
}
.label {
  font: var(--rz-tv-type-body-strong);
  color: var(--rz-color-text-primary);
}
.detail {
  font: var(--rz-tv-type-body);
  color: var(--rz-color-text-secondary);
}
.track {
  position: relative;
  height: 32px;
}
.bar {
  height: 100%;
  min-width: 4px;
  border-radius: 0 var(--rz-radius-sm) var(--rz-radius-sm) 0;
  background: var(--rz-color-data-neutral);
}
.bar.warning {
  background: var(--rz-color-status-warning-content);
}
.bar.negative {
  background: var(--rz-color-status-negative-content);
}
.bar.hatched {
  background: repeating-linear-gradient(
    -45deg,
    var(--rz-color-data-neutral) 0 6px,
    color-mix(in srgb, var(--rz-color-data-neutral) 22%, transparent) 6px 12px
  );
}
.target {
  position: absolute;
  top: calc(-1 * var(--rz-spacing-xs));
  bottom: calc(-1 * var(--rz-spacing-xs));
  width: 0;
  border-left: 3px dashed var(--rz-color-text-secondary);
}
.value {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: var(--rz-spacing-3xs);
  min-width: 120px;
  font: var(--rz-tv-type-chart-value);
  color: var(--rz-color-text-primary);
  white-space: nowrap;
}
.value.warning {
  color: var(--rz-color-status-warning-content);
}
.value.negative {
  color: var(--rz-color-status-negative-content);
}
</style>
