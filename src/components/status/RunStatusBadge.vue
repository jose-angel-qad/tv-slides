<script setup lang="ts">
import { computed } from 'vue'
import MaterialIcon from '../icon/MaterialIcon.vue'
import { RUN_STATE, type RunState } from './runState'
import { STATUS_CONTENT_COLOR, STATUS_SUBTLE_BORDER_COLOR, STATUS_SUBTLE_COLOR, type Status } from './status'

// Inventory: "Run status badge" (Status). A line's run state, the TV version of the Redzone app badge.
// Pill: full radius, color/status/{status}/subtle background, 1 px subtle-border, icon and label in
// the status content color (neutral: text/secondary). Label: Inter SemiBold 28 (body-strong), sentence case.
// Icons: Material Symbols Outlined, weight 600, filled. Every state has its own icon, so color is
// never the only signal (A11Y-10). Secondary feedback: it never replaces a main KPI's Status band.
// Fixed geometry: 32 px icon; padding 8 / 16 (12 before the icon) for a 52 px tall pill.
const props = defineProps<{
  state: RunState
  /** Replaces the default label, for example a duration ("Stopped 12m"). Keep it short. */
  label?: string
}>()
const s = computed(() => RUN_STATE[props.state])
</script>

<template>
  <span
    class="rz-run-status-badge"
    :style="{
      color: STATUS_CONTENT_COLOR[s.status],
      background: STATUS_SUBTLE_COLOR[s.status],
      borderColor: STATUS_SUBTLE_BORDER_COLOR[s.status],
    }"
  >
    <MaterialIcon :name="s.icon" :size="32" />
    <span class="label">{{ props.label ?? s.label }}</span>
  </span>
</template>

<style scoped>
.rz-run-status-badge {
  display: inline-flex;
  align-items: center;
  gap: var(--rz-spacing-2xs);
  padding: var(--rz-spacing-2xs) var(--rz-spacing-sm) var(--rz-spacing-2xs) var(--rz-spacing-xs);
  border: 1px solid;
  border-radius: var(--rz-radius-full);
  font: var(--rz-tv-type-body-strong);
  white-space: nowrap;
}
</style>
