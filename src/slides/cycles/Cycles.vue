<script setup lang="ts">
import { computed } from 'vue'
import T2ListSupport from '../../templates/T2ListSupport.vue'
import ChartCard from '../../components/card/ChartCard.vue'
import KpiTile from '../../components/card/KpiTile.vue'
import StatTile from '../../components/card/StatTile.vue'
import BarList, { type BarListRow } from '../../components/data-viz/BarList.vue'
import ChartLegendItem from '../../components/data-viz/ChartLegendItem.vue'
import type { FillStatus, Status } from '../../components/status/status'
import { formatClock, formatCount } from '../../utils/format'
import type { AssetState, CyclesData } from './types'

// Question: is each asset's cycle on time?
// One bar per asset instead of the double ring, with its state written under the name (design
// guide idea), so no legend is needed. Bars share the planned cycle time as scale: an active cycle
// is hatched (in progress), an overrun is full and negative with its icon, a rejected cycle is a
// warning. The summary "assets on time" is the KPI with the Status band, at the top of the support
// column; run progress and average cycle times are support.
const props = defineProps<{ data: CyclesData }>()
const d = computed(() => props.data)

const STATE: Record<AssetState, string> = {
  active: 'Active',
  inactive: 'Inactive',
  overrun: 'Overrun',
  rejected: 'Rejected',
  'no-product': 'No product',
}
const rows = computed<BarListRow[]>(() =>
  d.value.assets.map((a) => {
    const el = a.elapsedSeconds ?? 0
    let status: Status | undefined
    let valueText = '-'
    if (a.state === 'active') valueText = `${formatClock(a.cycleSeconds - el)} left`
    if (a.state === 'overrun') {
      status = 'negative'
      valueText = `${formatClock(el - a.cycleSeconds)} over`
    }
    if (a.state === 'rejected') {
      status = 'warning'
      valueText = 'Rejected'
    }
    return {
      id: a.id,
      label: a.name,
      detail: STATE[a.state],
      value: a.state === 'active' || a.state === 'overrun' ? Math.min(el, a.cycleSeconds) : 0,
      valueText,
      status,
      inProgress: a.state === 'active',
    }
  }),
)
const cycle = computed(() => d.value.assets[0]?.cycleSeconds ?? 0)
const problems = computed(() => d.value.assets.filter((a) => a.state === 'overrun' || a.state === 'rejected').length)
const band = computed<{ status: FillStatus; label: string }>(() => {
  const over = d.value.assets.filter((a) => a.state === 'overrun').length
  const rej = d.value.assets.filter((a) => a.state === 'rejected').length
  if (!over && !rej) return { status: 'positive', label: 'All cycles on time' }
  return { status: over ? 'negative' : 'warning', label: `${over + rej} need attention` }
})
</script>

<template>
  <T2ListSupport>
    <template #main>
      <ChartCard :title="`Cycle progress by asset, planned cycle ${formatClock(cycle)}`">
        <template #actions>
          <ul class="legend">
            <ChartLegendItem type="in-progress" label="In progress" />
            <ChartLegendItem type="below-target" label="Overrun" />
          </ul>
        </template>
        <p class="product">{{ d.product }}</p>
        <BarList :rows="rows" :max="cycle" :label-width="320" />
      </ChartCard>
    </template>
    <template #support>
      <KpiTile
        title="Assets on time"
        :subtitle="`${d.assets.length} assets`"
        :value="String(d.assets.length - problems)"
        :unit="`of ${d.assets.length}`"
        :band-status="band.status"
        :band-text="band.label"
      />
      <StatTile
        :title="`${d.unit.plural.charAt(0).toUpperCase()}${d.unit.plural.slice(1)} completed`"
        :subtitle="`Average cycle ${formatClock(d.averageActiveSeconds)}`"
        :value="formatCount(d.completed)"
        :unit="`of ${formatCount(d.planned)}`"
        :show-status="false"
      />
    </template>
  </T2ListSupport>
</template>

<style scoped>
.product {
  margin: 0 0 var(--rz-spacing-md);
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
