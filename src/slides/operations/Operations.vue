<script setup lang="ts">
import { computed, ref } from 'vue'
import T3HeroSupport from '../../templates/T3HeroSupport.vue'
import ChartCard from '../../components/card/ChartCard.vue'
import KpiTile from '../../components/card/KpiTile.vue'
import StatTile from '../../components/card/StatTile.vue'
import BarList, { type BarListRow } from '../../components/data-viz/BarList.vue'
import LineChart from '../../components/data-viz/LineChart.vue'
import type { FillStatus, Status } from '../../components/status/status'
import { formatCount, formatDuration, formatPercent, formatSigned, formatTime } from '../../utils/format'
import { useElementSize } from '../../utils/useElementSize'
import type { OpenItemKind, OperationsData } from './types'

// Question: what needs attention on this line right now?
// Hero: the number of open items (problems, breakdowns with Reliability, pending data sheets with
// Compliance), with the Status band. The open items are listed by time open (Bar list); breakdowns
// carry the negative status. Support: units against plan and OEE (Status line). The count trend
// is secondary, with the product and ETA as its context line.
const props = defineProps<{ data: OperationsData }>()
const d = computed(() => props.data)

const KIND: Record<OpenItemKind, string> = { problem: 'Problem', breakdown: 'Breakdown', 'data-sheet': 'Data sheet due' }
const items = computed(() =>
  d.value.items
    .filter((i) => (i.kind !== 'breakdown' || d.value.reliability) && (i.kind !== 'data-sheet' || d.value.compliance))
    .sort((a, b) => b.minutesOpen - a.minutesOpen),
)
const rows = computed<BarListRow[]>(() =>
  items.value.slice(0, 3).map((i) => ({
    id: i.id,
    label: i.name,
    detail: KIND[i.kind],
    value: i.minutesOpen,
    valueText: formatDuration(i.minutesOpen),
    status: i.kind === 'breakdown' ? 'negative' : undefined,
  })),
)
const count = (k: OpenItemKind) => items.value.filter((i) => i.kind === k).length
const band = computed<{ status: FillStatus; label: string }>(() => {
  if (!items.value.length) return { status: 'positive', label: 'Nothing open' }
  const parts: string[] = []
  const p = count('problem')
  const b = count('breakdown')
  const s = count('data-sheet')
  if (b) parts.push(`${b} ${b === 1 ? 'breakdown' : 'breakdowns'}`)
  if (p) parts.push(`${p} ${p === 1 ? 'problem' : 'problems'}`)
  if (s) parts.push(`${s} ${s === 1 ? 'data sheet' : 'data sheets'}`)
  return { status: b || p ? 'negative' : 'warning', label: parts.join(', ') }
})
const plan = computed<{ status: Status; label: string }>(() =>
  d.value.unitsVsPlan >= 0 ? { status: 'positive', label: 'Ahead of plan' } : { status: 'negative', label: 'Behind plan' },
)
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
        title="Open items"
        subtitle="Need attention now"
        :value="String(items.length)"
        :band-status="band.status"
        :band-text="band.label"
      />
    </template>
    <template #support>
      <StatTile title="Units against plan" subtitle="This run" :value="formatSigned(d.unitsVsPlan)" :unit="d.unit.plural" :status="plan.status" :status-text="plan.label" />
      <StatTile title="OEE" subtitle="This shift" :value="formatPercent(d.oee)" :status="oee.status" :status-text="oee.label" />
    </template>
    <template #chart>
      <div class="charts">
        <ChartCard title="Open items, by time open">
          <template #actions>
            <span v-if="items.length > 3" class="context">{{ items.length - 3 }} more</span>
          </template>
          <BarList v-if="rows.length" :rows="rows" :label-width="340" />
          <p v-else class="empty">No open problems{{ d.reliability ? ', breakdowns' : '' }}{{ d.compliance ? ' or data sheets' : '' }}.</p>
        </ChartCard>
        <ChartCard :title="`Count rate, ${d.unit.plural} per hour`">
          <p class="context">{{ d.product }} · ETA {{ formatTime(d.endsAt) }}</p>
          <div ref="chartEl" class="chart-area">
            <LineChart
              v-if="width && height"
              :points="d.trend"
              :lines="[{ value: d.targetRate, label: 'Target' }]"
              :width="width"
              :height="height"
              :x-every="2"
              area
            />
          </div>
        </ChartCard>
      </div>
    </template>
  </T3HeroSupport>
</template>

<style scoped>
.charts {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: var(--rz-spacing-md);
  min-height: 0;
}
.chart-area {
  flex: 1;
  min-height: 0;
}
.context,
.empty {
  margin: 0;
  font: var(--rz-tv-type-body);
  color: var(--rz-color-text-secondary);
}
</style>
