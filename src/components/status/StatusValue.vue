<script setup lang="ts">
import StatusIcon from './StatusIcon.vue'
import { STATUS_CONTENT_COLOR, type Status } from './status'

// Inventory: "Trend indicator" / "Score cell" (Status). A value with its secondary status, for
// table cells and lists: the status icon, then the value. Warning and negative values take
// status/{status}/content; positive keeps text/primary (the icon carries the color), like the
// Status line. No fills (audit: tile fills carried meaning).
// size md: Geist SemiBold 32 (chart value). size lg: Geist Bold 44 (slide title role), for the
// one hero column of a multi-location table.
const props = withDefaults(defineProps<{ status?: Status; text: string; size?: 'md' | 'lg'; label?: string }>(), {
  size: 'md',
})
const color = () =>
  props.status === 'warning' || props.status === 'negative' ? STATUS_CONTENT_COLOR[props.status] : undefined
</script>

<template>
  <span class="rz-status-value" :class="props.size" :style="{ color: color() }">
    <StatusIcon v-if="props.status" :status="props.status" :size="props.size === 'lg' ? 40 : 32" :label="props.label" />
    <span class="text">{{ props.text }}</span>
  </span>
</template>

<style scoped>
.rz-status-value {
  display: inline-flex;
  align-items: center;
  gap: var(--rz-spacing-2xs);
  white-space: nowrap;
  color: var(--rz-color-text-primary);
  font: var(--rz-tv-type-chart-value);
  font-variant-numeric: var(--rz-tv-figures-table);
}
.lg {
  font: var(--rz-tv-type-slide-title);
  letter-spacing: var(--rz-tv-tracking-kpi-value);
  font-variant-numeric: var(--rz-tv-figures-table);
}
.text {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
