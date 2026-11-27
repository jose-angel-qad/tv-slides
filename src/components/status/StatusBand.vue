<script setup lang="ts">
import StatusIcon from './StatusIcon.vue'
import { STATUS_FILL_COLOR, STATUS_ON_FILL_COLOR, type FillStatus } from './status'

// Inventory: "Status band" (Status). Full-width feedback for the primary KPI only, always visible.
// Fixed 76 px tall (same as the Stat tile footer, so band text and badges share one center line).
// Background color/status/{status}/fill; text and icon color/status/{status}/on-fill.
const props = defineProps<{ status: FillStatus; text: string }>()
</script>

<template>
  <div
    class="rz-status-band"
    :style="{ background: STATUS_FILL_COLOR[props.status], color: STATUS_ON_FILL_COLOR[props.status] }"
  >
    <StatusIcon :status="props.status" tone="on-fill" :size="40" />
    <span class="text">{{ props.text }}</span>
  </div>
</template>

<style scoped>
.rz-status-band {
  flex: none;
  display: flex;
  align-items: center;
  gap: var(--rz-spacing-xs);
  width: 100%;
  height: 76px;
  padding: 0 var(--rz-spacing-xl);
  font: var(--rz-tv-type-status-band);
  white-space: nowrap;
}
.text {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
