<script setup lang="ts">
import { computed, ref } from 'vue'
import T3HeroSupport from '../../templates/T3HeroSupport.vue'
import ChartCard from '../../components/card/ChartCard.vue'
import KpiTile from '../../components/card/KpiTile.vue'
import StatTile from '../../components/card/StatTile.vue'
import LineChart from '../../components/data-viz/LineChart.vue'
import ChartLegendItem from '../../components/data-viz/ChartLegendItem.vue'
import type { FillStatus } from '../../components/status/status'
import { formatCount, formatDuration } from '../../utils/format'
import { useElementSize } from '../../utils/useElementSize'
import type { CountsData } from './types'

// Question: is the line producing at a steady rate right now?
// Hero: the current rate against the target rate (design guide idea). Stops read in the trend as
// drops to zero; the stop time and counts are a neutral support tile. Count rate unit: units per
// hour (assumption, see questions.md).
const props = defineProps<{ data: CountsData }>()
const d = computed(() => props.data)
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)

const band = computed<{ status: FillStatus; label: string }>(() => {
  const r = d.value.currentRate
  const t = d.value.targetRate
  if (r === 0) return { status: d.value.status ?? 'negative', label: 'Stopped now' }
  const diff = r - t
  const status = d.value.status ?? (diff < 0 ? 'negative' : 'positive')
  return { status, label: diff >= 0 ? `${formatCount(diff)} above target rate ${formatCount(t)}` : `${formatCount(-diff)} below target rate ${formatCount(t)}` }
})

const chartEl = ref<HTMLElement | null>(null)
const { width, height } = useElementSize(chartEl)
</script>

<template>
  <T3HeroSupport>
    <template #hero>
      <KpiTile
        title="Current rate"
        subtitle="Last 10 minutes"
        :value="formatCount(d.currentRate)"
        :unit="`${d.unit.plural}/h`"
        :band-status="band.status"
        :band-text="band.label"
      />
    </template>
    <template #support>
      <StatTile :title="`${cap(d.unit.plural)} this shift`" :subtitle="d.shift" :value="formatCount(d.producedThisShift)" :show-status="false" />
      <StatTile
        title="Stopped time"
        :subtitle="`${d.stops} ${d.stops === 1 ? 'stop' : 'stops'}, ${d.slowdowns} ${d.slowdowns === 1 ? 'slowdown' : 'slowdowns'}`"
        :value="formatDuration(d.stopMinutes)"
        :show-status="false"
      />
    </template>
    <template #chart>
      <ChartCard :title="`Count rate, ${d.unit.plural} per hour`">
        <template #actions>
          <ul class="legend">
            <ChartLegendItem type="on-target" label="Count rate" />
            <ChartLegendItem type="target" label="Target rate" />
          </ul>
        </template>
        <div ref="chartEl" class="chart-area">
          <LineChart
            v-if="width && height"
            :points="d.trend"
            :lines="[{ value: d.targetRate, label: 'Target' }]"
            :width="width"
            :height="height"
            area
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
