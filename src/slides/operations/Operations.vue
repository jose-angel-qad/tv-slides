<script setup lang="ts">
import { computed, ref } from 'vue'
import ChartCard from '../../components/card/ChartCard.vue'
import KpiTile from '../../components/card/KpiTile.vue'
import type { FillStatus } from '../../components/status/status'
import FactCard, { type Fact } from '../../components/card/FactCard.vue'
import LineChart from '../../components/data-viz/LineChart.vue'
import EmptyState from '../../components/feedback/EmptyState.vue'
import MaterialIcon from '../../components/icon/MaterialIcon.vue'
import StatusIcon from '../../components/status/StatusIcon.vue'
import { formatCount, formatDuration, formatPercent, formatPercentTick, formatTime } from '../../utils/format'
import { useElementSize } from '../../utils/useElementSize'
import type { OpenItem, OperationsData } from './types'

// Design plan (round 2)
//
// Question: what needs attention on this line right now? (guide, kept)
// Answer (hero): "Needs attention", the number of open items, with the most severe one in the
// Status band (the slide's one primary feedback): a breakdown is negative, a problem or a pending
// data sheet is a warning, nothing open is positive. Under it, the items themselves, most severe and
// oldest first; each says what it is in words and with its icon: breakdown (negative), problem
// (warning), pending data sheet (neutral checklist icon), and how long it has been open.
//
// Must show, mapped:
// - Open problems; breakdowns (with Reliability); pending data sheets (with Compliance): the count,
//   the band and the list.
//   With Reliability or Compliance off, those kinds are left out.
// - Units against plan, OEE, product and ETA: Fact card (status only when behind plan or below target;
//   the product is the context of the ETA and wraps).
// - Count trend: a compact line chart with the target rate.
//
// Not shown:
// - Icon tiles for Problems, Data sheets and Maintenance with no counts (current product): replaced
//   by the items themselves.
// - Sunrise time (current product): meaning unknown (questions.md).
// - Product image.
//
// Layout options:
// a) KPI tiles on top, list below (round 1): the answer sat under three numbers.
// b) Count trend as the hero (current product): it does not say what needs attention.
// c) Attention count and list on the left; facts and trend on the right. Chosen: the answer is the
//    largest number on screen and is read first (left), the items explain it, the context sits beside.
const props = defineProps<{ data: OperationsData }>()
const d = computed(() => props.data)

const KIND = {
  breakdown: { label: 'Breakdown', order: 0 },
  problem: { label: 'Problem', order: 1 },
  'data-sheet': { label: 'Data sheet pending', order: 2 },
} as const
const items = computed<OpenItem[]>(() =>
  d.value.items
    .filter((i) => (i.kind === 'breakdown' ? d.value.reliability : i.kind === 'data-sheet' ? d.value.compliance : true))
    .sort((a, b) => KIND[a.kind].order - KIND[b.kind].order || b.minutesOpen - a.minutesOpen)
)
// The list card fits three items at TV size.
const shown = computed(() => items.value.slice(0, 3))
// Items past the third are summarized by kind, so a pending data sheet is never hidden.
const moreText = computed(() => {
  const rest = items.value.slice(3)
  if (!rest.length) return ''
  const n = (k: OpenItem['kind']) => rest.filter((i) => i.kind === k).length
  const parts = [
    n('breakdown') ? `${n('breakdown')} ${n('breakdown') === 1 ? 'breakdown' : 'breakdowns'}` : '',
    n('problem') ? `${n('problem')} ${n('problem') === 1 ? 'problem' : 'problems'}` : '',
    n('data-sheet') ? `${n('data-sheet')} ${n('data-sheet') === 1 ? 'data sheet' : 'data sheets'} pending` : '',
  ].filter(Boolean)
  return `Also open: ${parts.join(', ')}`
})
const band = computed<{ status: FillStatus; label: string }>(() => {
  const first = items.value[0]
  if (!first) return { status: 'positive', label: 'Nothing open' }
  if (first.kind === 'breakdown') return { status: 'negative', label: `Breakdown open ${formatDuration(first.minutesOpen)}` }
  const problems = items.value.filter((i) => i.kind === 'problem').length
  if (problems) return { status: 'warning', label: `${problems} open ${problems === 1 ? 'problem' : 'problems'}` }
  return { status: 'warning', label: `${items.value.length} ${items.value.length === 1 ? 'data sheet' : 'data sheets'} pending` }
})
const facts = computed<Fact[]>(() => {
  const behind = d.value.unitsVsPlan < 0
  const low = d.value.oee < d.value.oeeTarget
  const n = Math.abs(d.value.unitsVsPlan)
  return [
    {
      label: 'Units against plan',
      value: `${formatCount(n)} ${behind ? 'behind' : 'ahead'}`,
      detail: d.value.unit.plural,
      status: behind ? 'negative' : undefined,
      statusLabel: behind ? 'Behind plan' : undefined,
    },
    {
      label: 'OEE',
      value: formatPercent(d.value.oee),
      detail: `Target ${formatPercentTick(d.value.oeeTarget)}`,
      status: low ? 'negative' : undefined,
      statusLabel: low ? 'Below target' : undefined,
    },
    // The product leads the ETA fact as its label, so a long name wraps above the time.
    { label: d.value.product, value: `ETA ${formatTime(d.value.endsAt)}` },
  ]
})

const chartEl = ref<HTMLElement | null>(null)
const { width, height } = useElementSize(chartEl)
</script>

<template>
  <div class="rz-operations">
    <div class="left">
    <KpiTile
      title="Needs attention"
      :value="String(items.length)"
      :unit="items.length === 1 ? 'open item' : 'open items'"
      :band-status="band.status"
      :band-text="band.label"
    />
    <ChartCard v-if="items.length" class="attention" title="Open now">
      <ul class="items">
        <li v-for="i in shown" :key="i.id" class="item">
          <StatusIcon v-if="i.kind === 'breakdown'" status="negative" :size="40" label="Breakdown" />
          <StatusIcon v-else-if="i.kind === 'problem'" status="warning" :size="40" label="Problem" />
          <MaterialIcon v-else class="neutral-icon" name="checklist" :size="40" label="Data sheet" />
          <div class="text">
            <span class="name">{{ i.name }}</span>
            <span class="meta">{{ KIND[i.kind].label }} · open {{ formatDuration(i.minutesOpen) }}</span>
          </div>
        </li>
      </ul>
      <p v-if="moreText" class="more">{{ moreText }}</p>
    </ChartCard>
    <section v-else class="empty"><EmptyState title="Nothing needs attention" /></section>
    </div>
    <div class="side">
      <FactCard :facts="facts" />
      <ChartCard :title="`${d.unit.plural.charAt(0).toUpperCase()}${d.unit.plural.slice(1)} per hour`">
        <div ref="chartEl" class="chart-area">
          <LineChart
            v-if="width && height"
            :points="d.trend"
            :width="width"
            :height="height"
            :lines="[{ value: d.targetRate, label: 'Target' }]"
            :format="formatCount"
            :x-every="2"
          />
        </div>
      </ChartCard>
    </div>
  </div>
</template>

<style scoped>
.rz-operations {
  position: absolute;
  inset: 0;
  padding: var(--rz-spacing-md) var(--rz-spacing-xl) var(--rz-spacing-xl);
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: var(--rz-spacing-md);
}
.left {
  display: grid;
  grid-template-rows: 380px minmax(0, 1fr);
  gap: var(--rz-spacing-md);
  min-height: 0;
}
.attention {
  min-height: 0;
}
.empty {
  display: flex;
  border: 1px solid var(--rz-color-border-subtle);
  border-radius: var(--rz-radius-lg);
  background: var(--rz-color-surface-default);
  box-shadow: var(--rz-elevation-card);
}
.items {
  display: flex;
  flex-direction: column;
  gap: var(--rz-spacing-sm);
  margin: 0;
  padding: 0;
  list-style: none;
}
.item {
  display: flex;
  align-items: flex-start;
  gap: var(--rz-spacing-sm);
}
.more {
  /* Aligned with the item text (40 px icon + 16 px gap), a step below the list. */
  margin: var(--rz-spacing-sm) 0 0 calc(var(--rz-space-40) + var(--rz-spacing-sm));
  font: var(--rz-tv-type-body);
  color: var(--rz-color-text-secondary);
}
.neutral-icon {
  color: var(--rz-color-text-secondary);
}
.text {
  display: flex;
  flex-direction: column;
  min-width: 0;
}
.name {
  font: var(--rz-tv-type-card-title);
  letter-spacing: var(--rz-tv-tracking-card-title);
  color: var(--rz-color-text-primary);
}
.meta {
  font: var(--rz-tv-type-body);
  color: var(--rz-color-text-secondary);
}
.side {
  display: grid;
  grid-template-rows: 380px minmax(0, 1fr);
  gap: var(--rz-spacing-md);
  min-height: 0;
}
.chart-area {
  flex: 1;
  min-height: 0;
}
</style>
