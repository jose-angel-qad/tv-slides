<script setup lang="ts">
import { computed } from 'vue'
import T2ListSupport from '../../templates/T2ListSupport.vue'
import ChartCard from '../../components/card/ChartCard.vue'
import StatTile from '../../components/card/StatTile.vue'
import BarList, { type BarListRow } from '../../components/data-viz/BarList.vue'
import { formatCount } from '../../utils/format'
import type { LeaderboardData } from './types'

// Question: who is winning this shift, and by how much?
// Locations ranked by Victory Points (the only slide that re-sorts, INFO-11) as horizontal bars on
// one shared scale, with the points at the end of each bar (design guide idea). The leader is
// marked with a word, not a red bar (BRAND-04). Gaps to the leader are written under each name.
// Gamification has no target, so nothing carries status; zero points stays neutral (INFO-25).
// Support: the lead in points and the points key (what each hour result is worth).
const props = defineProps<{ data: LeaderboardData }>()
const d = computed(() => props.data)
const total = (h: number[]) => h.reduce((s, p) => s + p, 0)
const pts = (n: number) => `${formatCount(n)} ${n === 1 ? 'pt' : 'pts'}`

const ranked = computed(() =>
  d.value.locations.map((l) => ({ ...l, points: total(l.hourlyPoints) })).sort((a, b) => b.points - a.points),
)
const top = computed(() => ranked.value[0]?.points ?? 0)
const leaders = computed(() => ranked.value.filter((l) => l.points === top.value && top.value > 0))
const rows = computed<BarListRow[]>(() =>
  ranked.value.map((l) => {
    const last = l.hourlyPoints[l.hourlyPoints.length - 1]
    let detail = top.value === 0 ? 'No points yet' : l.points === top.value ? (leaders.value.length > 1 ? 'Tied for first' : 'Leader') : `${pts(top.value - l.points)} behind`
    if (last != null) detail += ` · last hour ${pts(last)}`
    return { id: l.id, label: l.location, detail, value: l.points, valueText: pts(l.points) }
  }),
)
const lead = computed(() => {
  if (top.value === 0) return { value: '0', subtitle: 'No points yet this shift' }
  if (leaders.value.length > 1) return { value: '0', subtitle: `${leaders.value.length} tied for first` }
  const second = ranked.value[1]?.points ?? 0
  return { value: formatCount(top.value - second), subtitle: `${ranked.value[0].location} over ${ranked.value[1]?.location ?? '-'}` }
})
const KEY = [
  { pts: 4, text: 'Above target' },
  { pts: 2, text: 'On target' },
  { pts: 1, text: 'Close to target' },
  { pts: 0, text: 'Below target' },
]
</script>

<template>
  <T2ListSupport>
    <template #main>
      <ChartCard :title="`Victory Points, ${d.shift}`">
        <BarList :rows="rows" :max="Math.max(top, 1)" :label-width="560" />
      </ChartCard>
    </template>
    <template #support>
      <StatTile title="Leading by" :subtitle="lead.subtitle" :value="lead.value" unit="pts" :show-status="false" />
      <ChartCard title="Points per hour">
        <ul class="key">
          <li v-for="k in KEY" :key="k.pts"><span class="pts">{{ pts(k.pts) }}</span><span>{{ k.text }}</span></li>
        </ul>
      </ChartCard>
    </template>
  </T2ListSupport>
</template>

<style scoped>
.key {
  display: flex;
  flex-direction: column;
  gap: var(--rz-spacing-xs);
  margin: 0;
  padding: 0;
  list-style: none;
  font: var(--rz-tv-type-body);
  color: var(--rz-color-text-secondary);
}
.key li {
  display: flex;
  gap: var(--rz-spacing-md);
}
.pts {
  min-width: 96px;
  font: var(--rz-tv-type-chart-value);
  color: var(--rz-color-text-primary);
}
</style>
