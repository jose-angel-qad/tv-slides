<script setup lang="ts">
import StatusIcon from './StatusIcon.vue'
import { STATUS_CONTENT_COLOR, type Status } from './status'

// Inventory: "Status line" (Status), the badge on secondary KPIs (Stat tile footer). Icon + text, one line.
// Positive keeps the text secondary (the icon carries the color); warning and negative color the
// whole line with color/status/{status}/content so a problem is impossible to miss.
// The primary KPI never uses this; it uses the Status band.
const props = defineProps<{ status?: Status; text: string }>()
const color = () =>
  props.status === 'warning' || props.status === 'negative' ? STATUS_CONTENT_COLOR[props.status] : undefined
</script>

<template>
  <span class="rz-status-line" :style="{ color: color() }">
    <StatusIcon v-if="props.status" :status="props.status" :size="36" />
    <span class="text">{{ props.text }}</span>
  </span>
</template>

<style scoped>
.rz-status-line {
  display: inline-flex;
  align-items: center;
  gap: var(--rz-spacing-2xs);
  max-width: 100%;
  font: var(--rz-tv-type-status-line);
  color: var(--rz-color-text-secondary);
  white-space: nowrap;
}
.text {
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
