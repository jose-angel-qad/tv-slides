<script setup lang="ts">
import { computed } from 'vue'
import StatTile from '../card/StatTile.vue'
import type { Status } from '../status/status'
import { formatRate } from '../../utils/format'

// Inventory: "Crew size indicator" (Data display). Wraps Stat tile: average crew versus the target crew.
// Title "Average crew", value with the unit "people". Variants:
//   on target    -> positive, "On target 6.2"
//   above target -> positive, "Above target 6.2"
//   below target -> negative (octagon, line in negative/content), "Below target 6.2"
const props = defineProps<{ crew: number; target: number }>()

const state = computed<{ status: Status; label: string }>(() => {
  const diff = Math.round((props.crew - props.target) * 10) / 10
  const t = formatRate(props.target)
  if (diff === 0) return { status: 'positive', label: `On target ${t}` }
  if (diff > 0) return { status: 'positive', label: `Above target ${t}` }
  return { status: 'negative', label: `Below target ${t}` }
})
</script>

<template>
  <StatTile
    title="Average crew"
    :value="formatRate(props.crew)"
    :unit="props.crew === 1 ? 'person' : 'people'"
    :status="state.status"
    :status-text="state.label"
  />
</template>
