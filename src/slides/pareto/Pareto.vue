<script setup lang="ts">
import { computed } from 'vue'
import T2ListSupport from '../../templates/T2ListSupport.vue'
import ChartCard from '../../components/card/ChartCard.vue'
import StatTile from '../../components/card/StatTile.vue'
import BarList, { type BarListRow } from '../../components/data-viz/BarList.vue'
import { formatCount, formatDuration } from '../../utils/format'
import type { ParetoData } from './types'

// Question: what is costing this line the most?
// The ranked list is the answer (INFO-02), so it takes the main card of T2; the biggest problem
// is the first and longest bar. Problem type is written under each name instead of a color
// (audit: Quality and Availability shared a color), so bars stay one neutral color (INFO-14).
// Losses have no target, so nothing carries status (INFO-03). Top 7 per page (INFO-09 spirit).
const props = defineProps<{ data: ParetoData }>()
const d = computed(() => props.data)
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)

const top = computed(() => [...d.value.problems].sort((a, b) => b.minutesLost - a.minutesLost).slice(0, 7))
const rows = computed<BarListRow[]>(() =>
  top.value.map((p) => ({
    id: p.id,
    label: p.name,
    detail: `${p.type} · ${formatCount(p.unitsLost)} ${p.unitsLost === 1 ? d.value.unit.singular : d.value.unit.plural} · ${p.occurrences}×`,
    value: p.minutesLost,
    valueText: formatDuration(p.minutesLost),
  })),
)
const totalMinutes = computed(() => d.value.problems.reduce((s, p) => s + p.minutesLost, 0))
const totalUnits = computed(() => d.value.problems.reduce((s, p) => s + p.unitsLost, 0))
const hidden = computed(() => d.value.problems.length - top.value.length)
</script>

<template>
  <T2ListSupport>
    <template #main>
      <ChartCard title="Top problems this shift, by time lost">
        <template #actions>
          <span v-if="hidden > 0" class="note">{{ hidden }} more not shown</span>
        </template>
        <BarList :rows="rows" :label-width="640" />
      </ChartCard>
    </template>
    <template #support>
      <StatTile title="Time lost" :subtitle="`${d.shift}, all problems`" :value="formatDuration(totalMinutes)" :show-status="false" />
      <StatTile
        :title="`${cap(d.unit.plural)} lost`"
        :subtitle="`${d.problems.length} ${d.problems.length === 1 ? 'problem' : 'problems'}`"
        :value="formatCount(totalUnits)"
        :show-status="false"
      />
    </template>
  </T2ListSupport>
</template>

<style scoped>
.note {
  font: var(--rz-tv-type-body);
  color: var(--rz-color-text-secondary);
}
</style>
