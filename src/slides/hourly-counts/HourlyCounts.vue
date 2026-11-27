<script setup lang="ts">
import HourlyMetric from '../_shared/HourlyMetric.vue'
import type { HourlyCountsData } from './types'

// Question: which hours met the count target? Same template as Hourly OEE (design guide):
// the shift count is the hero, with the planned total and the gap to target in the Status band.
const props = defineProps<{ data: HourlyCountsData }>()
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)
</script>

<template>
  <HourlyMetric
    :data="props.data"
    kind="count"
    :hero-title="`${cap(props.data.unit.plural)} this shift`"
    :chart-title="`${cap(props.data.unit.plural)} per hour`"
    :planned-total="props.data.plannedTotal"
  />
</template>
