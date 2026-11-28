<script setup lang="ts">
import { computed } from 'vue'
import KpiTile from '../../components/card/KpiTile.vue'
import FactCard, { type Fact } from '../../components/card/FactCard.vue'
import FastCycleAssets from '../_shared/FastCycleAssets.vue'
import { averageBand, formatClock } from '../_shared/fastCycles'
import { formatCount, formatPercent, formatPercentTick } from '../../utils/format'
import type { ShiftFastCyclesData } from './types'

// Design plan (round 2)
//
// Question: is the shift on cycle time target? (guide, kept)
// Answer (hero): the shift's average cycle time against the target, gap in the Status band.
//
// Must show, mapped:
// - Shift units: Fact card, whole numbers (guide open question: 3915.18 becomes 3,915).
// - Yield and number of problems: one fact, "99.1%" with "2 problems".
// - OEE: Fact card with its target; status only below target.
// - Average time against target: hero.
// - Current cycle per asset: Bar list on the right with the target line; "Not reporting" in words.
//
// Not shown:
// - Colored dashes and red gradient bars (current product): no legend; status only when over target.
// - Empty bottom panel (current product).
//
// Layout options: same as Run (Fast cycles), the pair reads as one set. The Fact card replaces the
// run card because a shift has facts, not a progress bar.
const props = defineProps<{ data: ShiftFastCyclesData }>()
const d = computed(() => props.data)
const band = computed(() => averageBand(d.value.averageSeconds, d.value.targetSeconds))
const facts = computed<Fact[]>(() => {
  const below = d.value.oee < d.value.oeeTarget
  return [
    { label: 'Shift units', value: formatCount(d.value.shiftUnits), detail: d.value.unit.plural },
    {
      label: 'OEE',
      value: formatPercent(d.value.oee),
      detail: `Target ${formatPercentTick(d.value.oeeTarget)}`,
      status: below ? 'negative' : undefined,
      statusLabel: below ? 'Below target' : undefined,
    },
    { label: 'Yield', value: formatPercent(d.value.yieldPercent), detail: `${d.value.problems} ${d.value.problems === 1 ? 'problem' : 'problems'}` },
  ]
})
</script>

<template>
  <div class="rz-fast-cycles">
    <div class="left">
      <KpiTile
        title="Average cycle this shift"
        :subtitle="d.shift"
        :value="formatClock(d.averageSeconds)"
        :unit="`target ${formatClock(d.targetSeconds)}`"
        :band-status="band.status"
        :band-text="band.label"
      />
      <FactCard :facts="facts" />
    </div>
    <FastCycleAssets :assets="d.assets" :target-seconds="d.targetSeconds" />
  </div>
</template>

<style scoped>
.rz-fast-cycles {
  position: absolute;
  inset: 0;
  padding: var(--rz-spacing-md) var(--rz-spacing-xl) var(--rz-spacing-xl);
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: var(--rz-spacing-md);
}
.left {
  display: grid;
  grid-template-rows: 380px minmax(0, 1fr);
  gap: var(--rz-spacing-md);
  min-height: 0;
}
</style>
