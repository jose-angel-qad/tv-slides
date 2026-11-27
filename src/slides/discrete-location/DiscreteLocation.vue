<script setup lang="ts">
import { computed, ref } from 'vue'
import T3HeroSupport from '../../templates/T3HeroSupport.vue'
import ChartCard from '../../components/card/ChartCard.vue'
import KpiTile from '../../components/card/KpiTile.vue'
import StatTile from '../../components/card/StatTile.vue'
import HourlyBarChart from '../../components/data-viz/HourlyBarChart.vue'
import ChartLegendItem from '../../components/data-viz/ChartLegendItem.vue'
import type { FillStatus, Status } from '../../components/status/status'
import { formatClock, formatCount, formatKpiCount, formatPercent, formatRate } from '../../utils/format'
import { useElementSize } from '../../utils/useElementSize'
import type { DiscreteLocationData } from './types'

// Question: how many units are finished, and is the line on pace?
// Hero: units finished against plan (Status band). Support: OEE with its target (Status line) and
// quality as one number (design guide idea, replaces the pie). Cycle time and units per hour sit in
// the chart header as context. Hourly counts use the Hourly bar chart, like Run throughput.
const props = defineProps<{ data: DiscreteLocationData }>()
const d = computed(() => props.data)
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)

const pace = computed<{ status: FillStatus; label: string }>(() => {
  const n = d.value.deltaVsPlan
  const label = n > 0 ? `${formatCount(n)} ahead of plan` : n < 0 ? `${formatCount(-n)} behind plan` : 'On plan'
  return { status: d.value.status ?? (n < 0 ? 'negative' : 'positive'), label }
})
const oee = computed<{ status: Status; label: string }>(() =>
  d.value.oee >= d.value.oeeTarget
    ? { status: 'positive', label: `On target ${formatPercent(d.value.oeeTarget)}` }
    : { status: 'negative', label: `Below target ${formatPercent(d.value.oeeTarget)}` },
)

const chartEl = ref<HTMLElement | null>(null)
const { width, height } = useElementSize(chartEl)
</script>

<template>
  <T3HeroSupport>
    <template #hero>
      <KpiTile
        :title="`${cap(d.unit.plural)} finished this shift`"
        :subtitle="d.shift"
        :value="formatKpiCount(d.finished)"
        :unit="d.plannedTotal ? `of ${formatKpiCount(d.plannedTotal)}` : undefined"
        :band-status="pace.status"
        :band-text="pace.label"
      />
    </template>
    <template #support>
      <StatTile title="Current OEE" subtitle="This shift" :value="formatPercent(d.oee)" :status="oee.status" :status-text="oee.label" />
      <StatTile
        title="First-pass quality"
        :subtitle="`${formatCount(d.reworked)} reworked`"
        :value="formatPercent(d.quality)"
        :show-status="false"
      />
    </template>
    <template #chart>
      <ChartCard :title="`${cap(d.unit.plural)} per hour`">
        <template #actions>
          <div class="actions">
            <span class="context">Cycle time {{ formatClock(d.cycleSeconds) }} · {{ formatRate(d.unitsPerHour) }} {{ d.unit.plural }}/h</span>
            <ul class="legend">
              <ChartLegendItem type="on-target" label="On target" />
              <ChartLegendItem type="below-target" label="Below target" />
              <ChartLegendItem type="in-progress" label="In progress" />
            </ul>
          </div>
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
.actions {
  display: flex;
  align-items: center;
  gap: var(--rz-spacing-2xl);
}
.context {
  font: var(--rz-tv-type-body-strong);
  color: var(--rz-color-text-primary);
  white-space: nowrap;
}
.legend {
  display: flex;
  gap: var(--rz-spacing-lg);
  margin: 0;
  padding: 0;
  list-style: none;
}
</style>
