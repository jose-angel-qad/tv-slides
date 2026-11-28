<script setup lang="ts">
import { computed } from 'vue'
import ChartCard from '../../components/card/ChartCard.vue'
import KpiTile from '../../components/card/KpiTile.vue'
import ProgressBar from '../../components/data-display/ProgressBar.vue'
import FastCycleAssets from '../_shared/FastCycleAssets.vue'
import { averageBand, formatClock } from '../_shared/fastCycles'
import { formatCount } from '../../utils/format'
import type { RunFastCyclesData } from './types'

// Design plan (round 2)
//
// Question: is the current run on cycle time target? (guide, kept)
// Answer (hero): the run's average cycle time against the target, with the gap in the Status band
// ("3 s under target"), the slide's one primary feedback.
//
// Must show, mapped:
// - Product: title of the run card (wraps, never cut).
// - Average time against target: hero value, "target 0:45" as its unit, band.
// - Current cycle time and status per asset: Bar list on the right, target as a dashed line, status
//   only on assets over target.
// - Completed of planned: progress bar in the run card.
//
// Not shown:
// - "Avg. to target" (current product): its meaning is unclear (questions.md); the band gives the gap.
// - Colored dashes under each bar and the green count badge: no legend, meaning unknown.
// - Empty panels (current product): the space goes to the assets (guide idea).
//
// Layout options:
// a) Hero and run card on top, assets below (Run throughput grid): six assets do not fit the lower card.
// b) Assets only, with the average in the title: the run's answer turns into small text.
// c) Hero and run card stacked on the left, assets full height on the right. Chosen: the answer
//    leads, and every asset gets a full row.
const props = defineProps<{ data: RunFastCyclesData }>()
const d = computed(() => props.data)
const band = computed(() => averageBand(d.value.averageSeconds, d.value.targetSeconds))
</script>

<template>
  <div class="rz-fast-cycles">
    <div class="left">
      <KpiTile
        title="Average cycle this run"
        :value="formatClock(d.averageSeconds)"
        :unit="`target ${formatClock(d.targetSeconds)}`"
        :band-status="band.status"
        :band-text="band.label"
      />
      <ChartCard class="run" :title="d.product">
        <div class="run-body">
          <ProgressBar
            :value="d.completed"
            :max="d.planned"
            label="Completed"
            :value-text="`${formatCount(d.completed)} of ${formatCount(d.planned)} ${d.unit.plural}`"
          />
        </div>
      </ChartCard>
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
.run {
  min-height: 0;
}
.run-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
