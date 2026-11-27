<script setup lang="ts">
import { computed } from 'vue'
import T4Table from '../../templates/T4Table.vue'
import ChartCard from '../../components/card/ChartCard.vue'
import StatusValue from '../../components/status/StatusValue.vue'
import MiniHourlyBars from '../../components/data-viz/MiniHourlyBars.vue'
import type { Status } from '../../components/status/status'
import { formatCount, formatKpiCount, formatRate } from '../../utils/format'
import type { ThroughputDashboardData, ThroughputLocation } from './types'

// Question: how many units has each line made versus plan?
// One card per location (up to 4 per page, fixed order). Units produced is each card's hero
// (secondary KPI size, neutral surface, no saturated fill), with the gap to plan as a Status
// value under it. Crew against target sits in the card header (neutral when there is no target).
// Hourly bars are compact, the current hour hatched as in progress (design guide idea).
const props = defineProps<{ data: ThroughputDashboardData }>()
const d = computed(() => props.data)
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)

const gap = (l: ThroughputLocation): { status: Status; text: string } => {
  const n = l.deltaVsPlan
  if (n === 0) return { status: 'positive', text: 'On plan' }
  return n > 0 ? { status: 'positive', text: `${formatCount(n)} ahead of plan` } : { status: 'negative', text: `${formatCount(-n)} behind plan` }
}
const crew = (l: ThroughputLocation): { status?: Status; text: string } => {
  if (!l.crewTarget) return { text: `Crew ${formatRate(l.crew)}, no target` }
  return { status: l.crew < l.crewTarget ? 'negative' : 'positive', text: `Crew ${formatRate(l.crew)} of ${formatRate(l.crewTarget)}` }
}
const onTarget = (l: ThroughputLocation) => l.hourly.slice(0, -1).filter((v) => v >= l.targetPerHour).length
</script>

<template>
  <T4Table>
    <div class="grid">
      <ChartCard v-for="l in d.locations" :key="l.id" :title="l.location">
        <template #actions>
          <StatusValue :status="crew(l).status" :text="crew(l).text" />
        </template>
        <div class="body">
          <div class="hero">
            <div class="figure">
              <span class="value">{{ formatKpiCount(l.produced) }}</span>
              <span class="unit">{{ l.unit.plural }}</span>
            </div>
            <StatusValue :status="gap(l).status" :text="gap(l).text" />
          </div>
          <div class="hours">
            <MiniHourlyBars :values="l.hourly" :target="l.targetPerHour" :current-index="l.hourly.length - 1" :height="96" />
            <span class="caption">
              {{ cap(l.unit.plural) }} per hour, target {{ formatCount(l.targetPerHour) }} · {{ onTarget(l) }} of {{ l.hourly.length - 1 }} on target
            </span>
          </div>
        </div>
      </ChartCard>
    </div>
  </T4Table>
</template>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  grid-auto-rows: minmax(0, 1fr);
  gap: var(--rz-spacing-md);
  min-height: 0;
}
.body {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: var(--rz-spacing-md);
}
.hero {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: var(--rz-spacing-lg);
}
.figure {
  display: flex;
  align-items: baseline;
  gap: var(--rz-spacing-2xs);
  white-space: nowrap;
}
.value {
  font: var(--rz-tv-type-kpi-secondary-value);
  letter-spacing: var(--rz-tv-tracking-kpi-value);
  color: var(--rz-color-text-primary);
}
.unit {
  font: var(--rz-tv-type-kpi-secondary-unit);
  color: var(--rz-color-text-secondary);
}
.hours {
  display: flex;
  flex-direction: column;
  gap: var(--rz-spacing-2xs);
}
.caption {
  font: var(--rz-tv-type-body);
  color: var(--rz-color-text-secondary);
}
</style>
