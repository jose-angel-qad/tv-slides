<script setup lang="ts">
import { computed } from 'vue'
import ChartCard from '../../components/card/ChartCard.vue'
import BarList, { type BarListRow } from '../../components/data-viz/BarList.vue'
import { formatCount } from '../../utils/format'
import type { LeaderboardData } from './types'

// Design plan (round 2)
//
// Question: who is winning this shift, and by how much? (guide, kept)
// Answer (hero): the ranked Bar list of points on one shared scale, full body (guide idea), with the
// points at the end of each bar. The card title names the leader and the margin ("Line 8 leads by
// 2 points"; "Line 1 and Bottling Line 4 tie for first").
//
// Must show, mapped:
// - Locations ranked by points; points per location: Bar list, largest first.
// - Gap to the leader: detail line under each name ("Leader", "6 behind").
// - Hourly results that earned the points: second part of the detail line, one number per finished
//   hour ("4 2 4 4 2 4"), oldest first.
// - What each hour result is worth: the card header key ("Points per hour: 4, 2, 1 or 0").
//
// Not shown:
// - Red leader bar and trophy (current product): red means negative in this system; the leader is
//   named in the title and in its row.
// - Status colors: points have no target (data without a target).
//
// Layout options:
// a) Bar list plus a points key card (round 1): the key card took a third of the width for one line.
// b) A table of hours by location: the ranking takes longer to read.
// c) Ranked bars full body, key in the card header. Chosen: rank and margin read at a glance.
const props = defineProps<{ data: LeaderboardData }>()
const d = computed(() => props.data)
const ranked = computed(() =>
  d.value.locations
    .map((l) => ({ ...l, points: l.hourlyPoints.reduce((a, b) => a + b, 0) }))
    .sort((a, b) => b.points - a.points)
    .slice(0, 8),
)
const top = computed(() => ranked.value[0]?.points ?? 0)
const leaders = computed(() => ranked.value.filter((l) => l.points === top.value))
const title = computed(() => {
  if (!ranked.value.length || top.value === 0) return 'No points yet this shift'
  if (leaders.value.length > 1) return `${leaders.value.map((l) => l.location).join(' and ')} tie for first`
  const gap = top.value - (ranked.value[1]?.points ?? 0)
  return `${leaders.value[0].location} leads by ${formatCount(gap)} ${gap === 1 ? 'point' : 'points'}`
})
const rows = computed<BarListRow[]>(() =>
  ranked.value.map((l) => {
    const behind = top.value - l.points
    const lead = top.value > 0 ? (behind === 0 ? 'Leader' : `${formatCount(behind)} behind`) : ''
    const hours = l.hourlyPoints.length ? `hours ${l.hourlyPoints.join(' ')}` : ''
    const detail = [lead, hours].filter(Boolean).join(' · ') || undefined
    // Zero points draw no bar (a bar's length is its value).
    return { id: l.id, label: l.location, detail, value: l.points, valueText: formatCount(l.points), noData: l.points === 0 }
  }),
)
</script>

<template>
  <div class="rz-leaderboard">
    <ChartCard :title="title">
      <template #actions><span class="key">Points per hour: 4, 2, 1 or 0</span></template>
      <div class="list">
        <BarList :rows="rows" :max="Math.max(top, 1)" :label-width="560" />
      </div>
    </ChartCard>
  </div>
</template>

<style scoped>
.rz-leaderboard {
  position: absolute;
  inset: 0;
  padding: var(--rz-spacing-md) var(--rz-spacing-xl) var(--rz-spacing-xl);
  display: grid;
}
.key {
  font: var(--rz-tv-type-body);
  color: var(--rz-color-text-secondary);
}
.list {
  flex: 1;
  min-height: 0;
}
</style>
