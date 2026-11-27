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
import { formatCount, formatKpiCount, formatRate, formatTime } from '../../utils/format'
import { useElementSize } from '../../utils/useElementSize'
import type { ShiftThroughputData } from './types'

// Question: how many units has this shift made versus plan?
// Same template and components as Run throughput. The ETA tile becomes the average rate, since a
// shift ends at a fixed time. Primary KPI (units produced) uses the Status band.
const props = defineProps<{ data: ShiftThroughputData }>()
const d = computed(() => props.data)
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)

const pace = computed<{ status: FillStatus; label: string }>(() => {
  const n = d.value.deltaVsPlan
  const label = n > 0 ? `${formatCount(n)} ahead of plan` : n < 0 ? `${formatCount(-n)} behind plan` : 'On plan'
  return { status: d.value.paceStatus ?? (n < 0 ? 'negative' : 'positive'), label }
})

// Average of the finished hours; the in-progress hour would pull it down.
const rate = computed(() => {
  const done = d.value.hourly.filter((_, i) => i < d.value.currentHourIndex)
  const avg = done.length ? done.reduce((s, p) => s + p.value, 0) / done.length : 0
  const status: Status = avg >= d.value.targetPerHour ? 'positive' : 'negative'
  const label = `${avg >= d.value.targetPerHour ? 'On target' : 'Below target'} ${formatCount(d.value.targetPerHour)}`
  return { value: formatCount(avg), status, label }
})

const chartEl = ref<HTMLElement | null>(null)
const { width, height } = useElementSize(chartEl)
</script>

<template>
  <T3HeroSupport>
    <template #hero>
      <KpiTile
        :title="`${cap(d.unit.plural)} produced this shift`"
        :subtitle="`${d.shift} · ${formatTime(d.shiftStart)} to ${formatTime(d.shiftEnd)}`"
        :value="formatKpiCount(d.produced)"
        :unit="d.plannedTotal ? `of ${formatKpiCount(d.plannedTotal)}` : undefined"
        :band-status="pace.status"
        :band-text="pace.label"
      />
    </template>

    <template #support>
      <StatTile
        title="Average per hour"
        subtitle="Finished hours"
        :value="rate.value"
        :unit="d.unit.plural"
        :status="rate.status"
        :status-text="rate.label"
      />
      <CrewSizeIndicator v-if="d.crewTarget > 0" :crew="d.crew" :target="d.crewTarget" />
      <StatTile v-else title="Average crew" subtitle="No crew target" :value="formatRate(d.crew)" unit="people" :show-status="false" />
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
