<script setup lang="ts">
import { computed } from 'vue'
import ChartCard from '../../components/card/ChartCard.vue'
import BarList, { type BarListRow } from '../../components/data-viz/BarList.vue'
import { formatCount, formatDuration } from '../../utils/format'
import type { ParetoData } from './types'

// Design plan (round 2)
//
// Question: what is costing this line the most? (guide, kept)
// Answer (hero): the ranked list of problems by time lost, full body. The top bar is the answer;
// the rest rank behind it on one shared scale from zero.
//
// Must show, mapped:
// - Top problems, sorted by time lost: Bar list, top 7, largest first.
// - Time and units lost per problem: the value at the end of each bar (time), units in the detail line.
// - Total lost: the card title ("3h 29m lost this shift · 1,537 cases").
// - Problem type: first word of the detail line, as text (not a color, A11Y-10).
//
// Not shown:
// - Status colors: losses have no target, so every bar stays neutral (INFO-03).
// - Type legend with colored swatches (current product): the type is written on each row.
// - Occurrence count as "1 x" before the name (current product): moved to the detail line ("6 times").
// - Support tile with the biggest problem (round 1): it repeated the first row.
//
// Layout options:
// a) List plus a support tile (round 1, T2): the tile repeated the first row.
// b) Vertical Pareto bars with a cumulative line: names would have to be rotated or cut.
// c) Horizontal ranked bars, full body, names outside the bars (guide idea). Chosen: long names wrap
//    and stay readable, and the order answers the question.
const props = defineProps<{ data: ParetoData }>()
const d = computed(() => props.data)
const MAX_ROWS = 7
const sorted = computed(() => [...d.value.problems].sort((a, b) => b.minutesLost - a.minutesLost))
const shown = computed(() => sorted.value.slice(0, MAX_ROWS))
const hidden = computed(() => sorted.value.length - shown.value.length)
const hiddenMinutes = computed(() => sorted.value.slice(MAX_ROWS).reduce((n, p) => n + p.minutesLost, 0))
const totalMinutes = computed(() => d.value.problems.reduce((n, p) => n + p.minutesLost, 0))
const totalUnits = computed(() => d.value.problems.reduce((n, p) => n + p.unitsLost, 0))
const title = computed(
  () => `${formatDuration(totalMinutes.value)} lost this shift · ${formatCount(totalUnits.value)} ${d.value.unit.plural}`,
)
const rows = computed<BarListRow[]>(() =>
  shown.value.map((p) => ({
    id: p.id,
    label: p.name,
    detail: `${p.type} · ${formatCount(p.unitsLost)} ${p.unitsLost === 1 ? d.value.unit.singular : d.value.unit.plural} · ${p.occurrences} ${p.occurrences === 1 ? 'time' : 'times'}`,
    value: p.minutesLost,
    valueText: formatDuration(p.minutesLost),
  })),
)
</script>

<template>
  <div class="rz-pareto">
    <ChartCard :title="title">
      <template v-if="hidden > 0" #actions>
        <span class="more">{{ hidden }} more not shown, {{ formatDuration(hiddenMinutes) }}</span>
      </template>
      <div class="list">
        <BarList :rows="rows" :label-width="600" />
      </div>
    </ChartCard>
  </div>
</template>

<style scoped>
.rz-pareto {
  position: absolute;
  inset: 0;
  padding: var(--rz-spacing-md) var(--rz-spacing-xl) var(--rz-spacing-xl);
  display: grid;
}
.list {
  flex: 1;
  min-height: 0;
}
.more {
  font: var(--rz-tv-type-body);
  color: var(--rz-color-text-secondary);
}
</style>
