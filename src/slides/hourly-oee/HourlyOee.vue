<script setup lang="ts">
import HourlyMetric from '../_shared/HourlyMetric.vue'
import type { HourlyOeeData } from './types'

// Question: which hours met the OEE target? The answer starts with the shift OEE (hero),
// then the hours on target and the chart. An hour above 100% is drawn as is.
defineProps<{ data: HourlyOeeData }>()
</script>

<template>
  <HourlyMetric :data="data" kind="percent" hero-title="OEE this shift" chart-title="OEE per hour" />
</template>
