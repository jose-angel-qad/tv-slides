<script setup lang="ts">
import HourlyMetric from '../_shared/HourlyMetric.vue'
import type { UnitsManHourData } from './types'

// Question: is labor productivity on target each hour? Same template as Hourly OEE:
// the shift average (units per man hour) is the hero, rates with one decimal (INFO-22).
const props = defineProps<{ data: UnitsManHourData }>()
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)
</script>

<template>
  <HourlyMetric
    :data="props.data"
    kind="rate"
    :hero-title="`${cap(props.data.unit.plural)} per man hour this shift`"
    :chart-title="`${cap(props.data.unit.plural)} per man hour, by hour`"
  />
</template>
