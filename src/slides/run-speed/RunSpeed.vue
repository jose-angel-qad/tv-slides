<script setup lang="ts">
import { computed } from 'vue'
import T3HeroSupport from '../../templates/T3HeroSupport.vue'
import ChartCard from '../../components/card/ChartCard.vue'
import KpiTile from '../../components/card/KpiTile.vue'
import StatTile from '../../components/card/StatTile.vue'
import ProgressBar from '../../components/data-display/ProgressBar.vue'
import type { FillStatus, Status } from '../../components/status/status'
import { formatCount, formatDuration, formatKpiCount, formatTime, formatTimeParts } from '../../utils/format'
import type { RunSpeedData } from './types'

// Question: is the run ahead or behind, and when will it finish?
// Hero: units ahead or behind pace (Status band). Support: ETA and current speed (Status line).
// The race track becomes one progress bar with a pace marker (design guide idea); the car
// illustration is dropped so the numbers lead (INFO-25). The product name labels the progress bar,
// where it can wrap to two lines instead of being cut in the KPI subtitle (INFO-23).
const props = defineProps<{ data: RunSpeedData }>()
const d = computed(() => props.data)
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)

const gap = computed(() => d.value.produced - d.value.paceTarget)
const band = computed<{ status: FillStatus; label: string }>(() => {
  const g = gap.value
  const status = d.value.status ?? (g < 0 ? 'negative' : 'positive')
  const label = g > 0 ? 'Ahead of pace' : g < 0 ? 'Behind pace' : 'On pace'
  return { status, label: `${label} · ${formatCount(d.value.produced)} of ${formatCount(d.value.plannedTotal)} ${d.value.unit.plural}` }
})

const eta = computed(() => (d.value.endsAt ? formatTimeParts(d.value.endsAt) : { time: '-', period: '' }))
const finish = computed<{ status: Status; label: string; subtitle: string }>(() => {
  if (!d.value.endsAt) return { status: 'neutral', label: 'Line stopped', subtitle: `Planned ${formatTime(d.value.plannedEndAt)}` }
  const late = Math.round((d.value.endsAt.getTime() - d.value.plannedEndAt.getTime()) / 60_000)
  const subtitle = `Planned ${formatTime(d.value.plannedEndAt)}`
  if (late <= 5) return { status: 'positive', label: late < -5 ? `${formatDuration(-late)} early` : 'On schedule', subtitle }
  return { status: 'negative', label: `${formatDuration(late)} late`, subtitle }
})
const speed = computed<{ status: Status; label: string }>(() =>
  d.value.currentRate >= d.value.paceRate
    ? { status: 'positive', label: `Above pace ${formatCount(d.value.paceRate)}` }
    : { status: 'negative', label: `Below pace ${formatCount(d.value.paceRate)}` },
)
</script>

<template>
  <T3HeroSupport>
    <template #hero>
      <KpiTile
        :title="gap >= 0 ? `${cap(d.unit.plural)} ahead of pace` : `${cap(d.unit.plural)} behind pace`"
        :subtitle="`Run started ${formatTime(d.startedAt)}`"
        :value="formatKpiCount(Math.abs(gap))"
        :unit="d.unit.plural"
        :band-status="band.status"
        :band-text="band.label"
      />
    </template>
    <template #support>
      <StatTile
        title="Estimated finish"
        :subtitle="finish.subtitle"
        :value="eta.time"
        :unit="eta.period"
        :status="finish.status"
        :status-text="finish.label"
      />
      <StatTile
        title="Current speed"
        subtitle="Last 15 minutes"
        :value="formatCount(d.currentRate)"
        :unit="`${d.unit.plural}/h`"
        :status="speed.status"
        :status-text="speed.label"
      />
    </template>
    <template #chart>
      <ChartCard title="Run progress">
        <div class="progress">
          <ProgressBar
            :value="d.produced"
            :max="d.plannedTotal"
            :marker="d.paceTarget"
            :marker-label="`Pace ${formatCount(d.paceTarget)}`"
            :label="d.product"
            :value-text="`${formatCount(d.produced)} of ${formatCount(d.plannedTotal)} ${d.unit.plural}`"
          />
          <dl class="facts">
            <div><dt>Planned rate</dt><dd>{{ formatCount(d.paceRate) }} {{ d.unit.plural }}/h</dd></div>
            <div><dt>Left to make</dt><dd>{{ formatCount(Math.max(0, d.plannedTotal - d.produced)) }} {{ d.unit.plural }}</dd></div>
            <div><dt>Unplanned downtime</dt><dd>{{ formatDuration(d.unplannedDowntimeMinutes) }}</dd></div>
          </dl>
        </div>
      </ChartCard>
    </template>
  </T3HeroSupport>
</template>

<style scoped>
.progress {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: var(--rz-spacing-2xl);
}
.facts {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: var(--rz-spacing-lg);
  margin: 0;
}
.facts dt {
  font: var(--rz-tv-type-body);
  color: var(--rz-color-text-secondary);
}
.facts dd {
  margin: 0;
  font: var(--rz-tv-type-chart-value);
  color: var(--rz-color-text-primary);
}
</style>
