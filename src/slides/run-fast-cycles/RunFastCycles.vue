<script setup lang="ts">
import { computed } from 'vue'
import T2ListSupport from '../../templates/T2ListSupport.vue'
import ChartCard from '../../components/card/ChartCard.vue'
import KpiTile from '../../components/card/KpiTile.vue'
import StatTile from '../../components/card/StatTile.vue'
import BarList from '../../components/data-viz/BarList.vue'
import ChartLegendItem from '../../components/data-viz/ChartLegendItem.vue'
import { formatCount } from '../../utils/format'
import { assetRows, averageBand, barMax, formatClock } from '../_shared/fastCycles'
import type { RunFastCyclesData } from './types'

// Question: is the current run on cycle time target?
// Template T2, like Cycles: the asset list takes the main card (the empty panels of the current
// slide are gone and the space goes to the assets, design guide idea), one Bar list row per asset
// with its current cycle and a dashed target line. The average cycle against target is the KPI
// with the Status band at the top of the support column; run progress below it.
const props = defineProps<{ data: RunFastCyclesData }>()
const d = computed(() => props.data)
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)
const band = computed(() => averageBand(d.value.averageSeconds, d.value.targetSeconds))
const rows = computed(() => assetRows(d.value.assets, d.value.targetSeconds))
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
        <p class="product">{{ d.product }}</p>
        <BarList :rows="rows" :target="d.targetSeconds" :max="barMax(d.assets, d.targetSeconds)" :label-width="420" />
      </ChartCard>
    </template>
    <template #support>
      <KpiTile
        title="Average cycle this run"
        :subtitle="`Target ${formatClock(d.targetSeconds)}`"
        :value="formatClock(d.averageSeconds)"
        :band-status="band.status"
        :band-text="band.label"
      />
      <StatTile
        :title="`${cap(d.unit.plural)} completed`"
        :subtitle="`of ${formatCount(d.planned)} planned`"
        :value="formatCount(d.completed)"
        :show-status="false"
      />
    </template>
  </T2ListSupport>
</template>

<style scoped>
.product {
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
