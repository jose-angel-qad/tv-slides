<script setup lang="ts">
import { computed } from 'vue'
import ChartCard from '../../components/card/ChartCard.vue'
import BarList, { type BarListRow } from '../../components/data-viz/BarList.vue'
import { barMax, formatClock, type FastCycleAsset } from './fastCycles'

// Shared by Run (Fast cycles) and Shift (Fast cycles): the current cycle time per asset as a Bar list
// on one scale, with the target as a dashed line across every row, labeled once in the card header.
// Status economy: only an asset over target shows a status (icon and negative color); on-target
// assets stay neutral with no "On target" text. An asset with no cycle says "Not reporting".
const props = defineProps<{ assets: FastCycleAsset[]; targetSeconds: number }>()
const rows = computed<BarListRow[]>(() =>
  props.assets.map((a) => {
    if (a.cycleSeconds == null) return { id: a.id, label: a.name, detail: 'Not reporting', value: 0, valueText: '–', noData: true }
    const over = a.cycleSeconds > props.targetSeconds
    return {
      id: a.id,
      label: a.name,
      value: a.cycleSeconds,
      valueText: formatClock(a.cycleSeconds),
      status: over ? 'negative' : undefined,
    }
  }),
)
</script>

<template>
  <ChartCard title="Current cycle by asset">
    <template #actions>
      <span class="target"><span class="dash" aria-hidden="true" />Target {{ formatClock(props.targetSeconds) }}</span>
    </template>
    <div class="list">
      <BarList :rows="rows" :target="props.targetSeconds" :max="barMax(props.assets, props.targetSeconds)" :label-width="280" />
    </div>
  </ChartCard>
</template>

<style scoped>
/* The list keeps its fixed bar thickness and gap (chartGeometry) and sits centered in the card, so a
   short list does not leave all the empty space below it. */
.list {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.target {
  display: inline-flex;
  align-items: center;
  gap: var(--rz-spacing-2xs);
  font: var(--rz-tv-type-body);
  color: var(--rz-color-text-secondary);
}
/* Legend swatch for the dashed target line (chartGeometry: 3 px, dashed, text/secondary). */
.dash {
  width: var(--rz-space-32);
  border-top: 3px dashed var(--rz-color-text-secondary);
}
</style>
