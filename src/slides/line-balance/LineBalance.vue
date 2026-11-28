<script setup lang="ts">
import { computed } from 'vue'
import ChartCard from '../../components/card/ChartCard.vue'
import StepFlowChart from '../../components/data-viz/StepFlowChart.vue'
import { formatCount } from '../../utils/format'
import type { LineBalanceData } from './types'

// Design plan (round 2)
//
// Question: where is work piling up? (guide, kept)
// Answer (hero): the WIP between steps drawn as bars, so the pile-up is the tallest mark on screen;
// the largest WIP has a raised value plate, and the card title says it in words ("Most work in
// process: 46 waiting before Assemble"). The WIP limit is a dashed line labeled "Limit 20"; above it
// the largest WIP is a bottleneck and turns negative with its icon.
//
// Must show, mapped:
// - Steps in process order: left to right.
// - Steps completed per step: "148 done" under each step name (context, not bars).
// - WIP between steps: one bar per gap with its value; named once, in the title.
// - The step with the most WIP: raised value plate and the card title.
//
// Not shown:
// - Rotated step names (current product): names are horizontal and wrap.
// - Bottleneck hero number and support tiles (round 1): the title and the pill say it.
//
// Layout options:
// a) Hero WIP number over the chart (round 1): the number without the flow does not say where.
// a2) Completed bars with WIP values between them (review round 1): the completed bars dominated,
//     so the answer was not the most prominent thing.
// b) A table of steps with WIP: loses the process picture.
// c) Flow chart alone, full body, with the answer as its title. Chosen: the place is the answer, and
//    the flow shows it in context.
const props = defineProps<{ data: LineBalanceData }>()
const d = computed(() => props.data)
const title = computed(() => {
  let best = -1
  let i = -1
  d.value.steps.slice(0, -1).forEach((s, k) => {
    if ((s.wipAfter ?? 0) > best) {
      best = s.wipAfter ?? 0
      i = k
    }
  })
  if (best <= 0) return 'Nothing waiting between steps'
  return `Most work in process: ${formatCount(best)} waiting before ${d.value.steps[i + 1].name}`
})
</script>

<template>
  <div class="rz-line-balance">
    <ChartCard :title="title">
      <StepFlowChart :steps="d.steps" :wip-limit="d.wipLimit" />
    </ChartCard>
  </div>
</template>

<style scoped>
.rz-line-balance {
  position: absolute;
  inset: 0;
  padding: var(--rz-spacing-md) var(--rz-spacing-xl) var(--rz-spacing-xl);
  display: grid;
}
</style>
