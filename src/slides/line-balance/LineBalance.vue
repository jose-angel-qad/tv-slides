<script setup lang="ts">
import { computed } from 'vue'
import T3HeroSupport from '../../templates/T3HeroSupport.vue'
import ChartCard from '../../components/card/ChartCard.vue'
import KpiTile from '../../components/card/KpiTile.vue'
import StatTile from '../../components/card/StatTile.vue'
import StepFlowChart from '../../components/data-viz/StepFlowChart.vue'
import type { FillStatus } from '../../components/status/status'
import { formatCount } from '../../utils/format'
import type { LineBalanceData } from './types'

// Question: where is work piling up?
// Hero: the largest WIP and the step it waits for, with the Status band (bottleneck or flowing).
// Support: units finished at the last step and total WIP (neutral). The chart shows the steps in
// process order with labeled WIP between them; the bottleneck carries the secondary status.
const props = defineProps<{ data: LineBalanceData }>()
const d = computed(() => props.data)
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)

const worst = computed(() => {
  const idx = d.value.steps
    .slice(0, -1)
    .reduce((best, s, i, arr) => ((s.wipAfter ?? 0) > (arr[best].wipAfter ?? 0) ? i : best), 0)
  return { wip: d.value.steps[idx].wipAfter ?? 0, next: d.value.steps[idx + 1]?.name ?? '' }
})
const band = computed<{ status: FillStatus; label: string }>(() =>
  worst.value.wip >= d.value.wipLimit
    ? { status: 'negative', label: `Bottleneck at ${worst.value.next}` }
    : { status: 'positive', label: `Work is flowing, all WIP under ${formatCount(d.value.wipLimit)}` },
)
const totalWip = computed(() => d.value.steps.reduce((s, x) => s + (x.wipAfter ?? 0), 0))
const finished = computed(() => d.value.steps[d.value.steps.length - 1]?.completed ?? 0)
</script>

<template>
  <T3HeroSupport>
    <template #hero>
      <KpiTile
        title="Most work waiting"
        :subtitle="`Before ${worst.next}`"
        :value="formatCount(worst.wip)"
        :unit="worst.wip === 1 ? d.unit.singular : d.unit.plural"
        :band-status="band.status"
        :band-text="band.label"
      />
    </template>
    <template #support>
      <StatTile :title="`${cap(d.unit.plural)} finished`" :subtitle="`${d.shift}, last step`" :value="formatCount(finished)" :show-status="false" />
      <StatTile title="Total WIP" :subtitle="`Between ${d.steps.length} steps`" :value="formatCount(totalWip)" :unit="d.unit.plural" :show-status="false" />
    </template>
    <template #chart>
      <ChartCard title="Steps completed and WIP, in process order">
        <StepFlowChart :steps="d.steps" :wip-limit="d.wipLimit" />
      </ChartCard>
    </template>
  </T3HeroSupport>
</template>
