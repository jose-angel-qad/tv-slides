<script setup lang="ts">
import { computed } from 'vue'
import MaterialIcon, { type MaterialIconName } from '../icon/MaterialIcon.vue'
import { STATUS_CONTENT_COLOR, STATUS_ON_FILL_COLOR, type Status } from './status'

// Inventory: "Status icon" (Status). Filled Material Symbols, weight 600. Color is never the only signal:
// positive = check_circle, warning = warning (triangle), negative = dangerous (octagon), neutral = remove (dash).
// tone="content" (default) colors it with color/status/{status}/content for use on surfaces;
// tone="on-fill" uses color/status/{status}/on-fill, only inside a Status band.
const props = withDefaults(
  defineProps<{ status: Status; size?: number; label?: string; tone?: 'content' | 'on-fill' }>(),
  { size: 36, tone: 'content' },
)

const ICON: Record<Status, MaterialIconName> = {
  positive: 'check_circle_fill',
  warning: 'warning_fill',
  negative: 'dangerous_fill',
  neutral: 'remove',
}

const color = computed(() =>
  props.tone === 'on-fill' && props.status !== 'neutral'
    ? STATUS_ON_FILL_COLOR[props.status]
    : STATUS_CONTENT_COLOR[props.status],
)
</script>

<template>
  <MaterialIcon
    class="rz-status-icon"
    :name="ICON[props.status]"
    :size="props.size"
    :label="props.label"
    :style="{ color }"
  />
</template>
