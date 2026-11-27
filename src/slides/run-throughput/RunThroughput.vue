<script setup lang="ts">
import { computed, ref } from 'vue'
import T3HeroSupport from '../../templates/T3HeroSupport.vue'
import ChartCard from '../../components/card/ChartCard.vue'
import KpiTile from '../../components/card/KpiTile.vue'
import StatTile from '../../components/card/StatTile.vue'
import CrewSizeIndicator from '../../components/data-display/CrewSizeIndicator.vue'
import HourlyBarChart from '../../components/data-viz/HourlyBarChart.vue'
import ChartLegendItem from '../../components/data-viz/ChartLegendItem.vue'
import type { FillStatus, Status } from '../../components/status/status'
import { formatCount, formatDuration, formatKpiCount, formatTimeParts } from '../../utils/format'
import { useElementSize } from '../../utils/useElementSize'
import type { RunThroughputData } from './types'

// Question: is the current run on pace with the plan?
// Primary KPI (cases produced) uses the Status band; secondary KPIs use the Status line badge.
const props = defineProps<{ data: RunThroughputData }>()
const d = computed(() => props.data)
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)

const pace = computed<{ status: FillStatus; label: string }>(() => {
  const n = d.value.deltaVsPlan
  const label = n > 0 ? `${formatCount(n)} ahead of plan` : n < 0 ? `${formatCount(-n)} behind plan` : 'On plan'
  return { status: d.value.paceStatus ?? (n < 0 ? 'negative' : 'positive'), label }
})

// Product names often start with the SKU ("466DHR GOLD PACKS..."); do not repeat it.
const productLine = computed(() =>
  d.value.product.startsWith(d.value.sku) ? d.value.product : `${d.value.sku} · ${d.value.product}`,
)

const eta = computed(() => formatTimeParts(d.value.endsAt))
// Estimated finish versus planned end. Within 5 minutes reads "On schedule".
const finish = computed<{ status?: Status; label: string }>(() => {
  const planned = d.value.plannedEndAt
  if (!planned) return { label: '' }
  const late = Math.round((d.value.endsAt.getTime() - planned.getTime()) / 60_000)
  if (late <= 5) return { status: d.value.finishStatus ?? 'positive', label: 'On schedule' }
  return { status: d.value.finishStatus ?? 'warning', label: `${formatDuration(late)} late` }
})

const chartEl = ref<HTMLElement | null>(null)
const { width, height } = useElementSize(chartEl)
</script>

<template>
  <T3HeroSupport>
    <template #hero>
      <KpiTile
        :title="`${cap(d.unit.plural)} produced this run`"
        :subtitle="productLine"
        :value="formatKpiCount(d.produced)"
        :unit="d.plannedTotal ? `of ${formatKpiCount(d.plannedTotal)}` : undefined"
        :band-status="pace.status"
        :band-text="pace.label"
      />
    </template>

    <template #support>
      <StatTile
        title="Estimated finish"
        :value="eta.time"
        :unit="eta.period"
        :subtitle="`${formatDuration(d.remainingMinutes)} left`"
        :status="finish.status"
        :status-text="finish.label"
      />
      <CrewSizeIndicator :crew="d.crew" :target="d.crewTarget" />
    </template>

    <template #chart>
      <ChartCard :title="`${cap(d.unit.plural)} per hour`">
        <template #actions>
          <ul class="legend">
            <ChartLegendItem type="on-target" label="On target" />
            <ChartLegendItem type="below-target" label="Below target" />
            <ChartLegendItem type="in-progress" label="In progress" />
          </ul>
        </template>
        <div ref="chartEl" class="chart-area">
          <HourlyBarChart
            v-if="width && height"
            :points="d.hourly"
            :target="d.targetPerHour"
            :current-index="d.currentHourIndex"
            :width="width"
            :height="height"
          />
        </div>
      </ChartCard>
    </template>
  </T3HeroSupport>
</template>

<style scoped>
.chart-area {
  flex: 1;
  min-height: 0;
}
.legend {
  display: flex;
  gap: var(--rz-spacing-lg);
  margin: 0;
  padding: 0;
  list-style: none;
}
</style>
