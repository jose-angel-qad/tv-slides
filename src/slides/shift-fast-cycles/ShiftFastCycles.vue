<script setup lang="ts">
import { computed } from 'vue'
import T2ListSupport from '../../templates/T2ListSupport.vue'
import ChartCard from '../../components/card/ChartCard.vue'
import KpiTile from '../../components/card/KpiTile.vue'
import StatTile from '../../components/card/StatTile.vue'
import BarList from '../../components/data-viz/BarList.vue'
import ChartLegendItem from '../../components/data-viz/ChartLegendItem.vue'
import type { Status } from '../../components/status/status'
import { formatCount, formatPercent } from '../../utils/format'
import { assetRows, averageBand, barMax, formatClock } from '../_shared/fastCycles'
import type { ShiftFastCyclesData } from './types'

// Question: is the shift on cycle time target?
// Same layout as Run (Fast cycles): the asset list in the main card, the average cycle against
// target as the KPI, OEE with its target as support. Shift units, yield and problems are one
// context line in the card, formatted as whole numbers (audit: 3915.18).
const props = defineProps<{ data: ShiftFastCyclesData }>()
const d = computed(() => props.data)
const band = computed(() => averageBand(d.value.averageSeconds, d.value.targetSeconds))
const rows = computed(() => assetRows(d.value.assets, d.value.targetSeconds))
const oee = computed<{ status: Status; label: string }>(() =>
  d.value.oee >= d.value.oeeTarget
    ? { status: 'positive', label: `On target ${formatPercent(d.value.oeeTarget)}` }
    : { status: 'negative', label: `Below target ${formatPercent(d.value.oeeTarget)}` },
)
</script>

<template>
  <T2ListSupport>
    <template #main>
      <ChartCard title="Current cycle by asset">
        <template #actions>
          <ul class="legend">
            <ChartLegendItem type="on-target" label="On target" />
            <ChartLegendItem type="below-target" label="Over target" />
            <ChartLegendItem type="target" :label="`Target ${formatClock(d.targetSeconds)}`" />
          </ul>
        </template>
        <p class="context">
          {{ d.shift }} · {{ formatCount(d.shiftUnits) }} {{ d.unit.plural }} · yield {{ formatPercent(d.yieldPercent) }} ·
          {{ d.problems }} {{ d.problems === 1 ? 'problem' : 'problems' }}
        </p>
        <BarList :rows="rows" :target="d.targetSeconds" :max="barMax(d.assets, d.targetSeconds)" :label-width="420" />
      </ChartCard>
    </template>
    <template #support>
      <KpiTile
        title="Average cycle this shift"
        :subtitle="`Target ${formatClock(d.targetSeconds)}`"
        :value="formatClock(d.averageSeconds)"
        :band-status="band.status"
        :band-text="band.label"
      />
      <StatTile title="OEE" subtitle="This shift" :value="formatPercent(d.oee)" :status="oee.status" :status-text="oee.label" />
    </template>
  </T2ListSupport>
</template>

<style scoped>
.context {
  margin: 0 0 var(--rz-spacing-sm);
  font: var(--rz-tv-type-body);
  color: var(--rz-color-text-secondary);
}
.legend {
  display: flex;
  gap: var(--rz-spacing-lg);
  margin: 0;
  padding: 0;
  list-style: none;
}
</style>
