<script setup lang="ts">
import StatusIcon from '../status/StatusIcon.vue'
import { STATUS_CONTENT_COLOR, type Status } from '../status/status'

// Inventory: "Metric cell" (Table). The row hero of a multiple location table: the one value that
// answers the slide's question, in a compact container instead of a larger font (pilot review).
// surface/raised, radius/md. Line 1: the row's only status icon (32 px) and the value in Geist
// SemiBold 32 (chart value, tabular figures). Line 2: its target in Inter 28 (body), text/secondary.
// Warning and negative values take status/{status}/content; positive keeps text/primary (the icon
// carries the color), like the Status value. It fills its column, so cells line up as one column.
// Place it right after the location name. Other cells in the row stay plain text.
const props = defineProps<{
  value: string
  /** Second line, for example "Target 80%". */
  target?: string
  status?: Status
  /** Accessible status name, for example "Below target". */
  label?: string
}>()
const color = () =>
  props.status === 'warning' || props.status === 'negative' ? STATUS_CONTENT_COLOR[props.status] : undefined
</script>

<template>
  <div class="rz-metric-cell">
    <span class="value" :style="{ color: color() }">
      <StatusIcon v-if="props.status" :status="props.status" :size="32" :label="props.label" />
      <span>{{ props.value }}</span>
    </span>
    <span v-if="props.target" class="target">{{ props.target }}</span>
  </div>
</template>

<style scoped>
.rz-metric-cell {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  min-width: 0;
  padding: var(--rz-spacing-xs) var(--rz-spacing-sm);
  border-radius: var(--rz-radius-md);
  background: var(--rz-color-surface-raised);
}
.value {
  display: inline-flex;
  align-items: center;
  gap: var(--rz-spacing-2xs);
  white-space: nowrap;
  font: var(--rz-tv-type-chart-value);
  font-variant-numeric: var(--rz-tv-figures-table);
  color: var(--rz-color-text-primary);
}
.target {
  font: var(--rz-tv-type-body);
  font-variant-numeric: var(--rz-tv-figures-table);
  color: var(--rz-color-text-secondary);
  white-space: nowrap;
}
</style>
