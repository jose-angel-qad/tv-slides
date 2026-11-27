<script setup lang="ts">
import { computed } from 'vue'
import T4Table from '../../templates/T4Table.vue'
import ChartCard from '../../components/card/ChartCard.vue'
import LocationTable, { type TableColumn, type TableRow } from '../../components/table/LocationTable.vue'
import StatusValue from '../../components/status/StatusValue.vue'
import type { Status } from '../../components/status/status'
import { formatCount, formatPercent } from '../../utils/format'
import type { ScoreboardData, ScoreboardLocation } from './types'

// Question: which lines are on track this shift?
// Every location in the same order (INFO-11). Shift OEE is the row hero with its status icon.
// Four metric columns at most (INFO-09): shift OEE, start, average changeover and Victory Points.
// Ramp up, power hour, huddles, SKUs and the counts sparkline are dropped (design guide idea,
// see questions.md). A metric with no value yet shows a dash. Points are neutral (INFO-25).
const props = defineProps<{ data: ScoreboardData }>()
const d = computed(() => props.data)
const columns: TableColumn[] = [
  { key: 'oee', label: 'Shift OEE', width: '280px' },
  { key: 'start', label: 'Start, min late', width: '260px' },
  { key: 'changeover', label: 'Avg changeover, min', width: '300px' },
  { key: 'points', label: 'Victory Points', width: '240px', align: 'end' },
]
const rows = computed(() => d.value.locations as unknown as TableRow[])
const L = (r: TableRow) => r as unknown as ScoreboardLocation
const start = (l: ScoreboardLocation): { status?: Status; text: string } => {
  if (l.startMinutes == null) return { text: '-' }
  return l.startMinutes <= 0 ? { status: 'positive', text: l.startMinutes < 0 ? 'Early' : 'On time' } : { status: 'negative', text: formatCount(l.startMinutes) }
}
const changeover = (l: ScoreboardLocation): { status?: Status; text: string } => {
  if (l.changeoverMinutes == null) return { text: '-' }
  return { status: l.changeoverMinutes <= l.changeoverTarget ? 'positive' : 'negative', text: formatCount(l.changeoverMinutes) }
}
</script>

<template>
  <T4Table>
    <ChartCard :title="`${d.shift} by location`">
      <template #actions>
        <span class="note">Changeover target {{ formatCount(d.locations[0]?.changeoverTarget ?? 0) }} min</span>
      </template>
      <LocationTable :columns="columns" :rows="rows">
        <template #cell-oee="{ row }">
          <StatusValue size="lg" :status="L(row).oee >= L(row).oeeTarget ? 'positive' : 'negative'" :text="formatPercent(L(row).oee)" />
        </template>
        <template #cell-start="{ row }">
          <StatusValue :status="start(L(row)).status" :text="start(L(row)).text" />
        </template>
        <template #cell-changeover="{ row }">
          <StatusValue :status="changeover(L(row)).status" :text="changeover(L(row)).text" />
        </template>
        <template #cell-points="{ row }">{{ formatCount(L(row).points) }} pts</template>
      </LocationTable>
    </ChartCard>
  </T4Table>
</template>

<style scoped>
.note {
  font: var(--rz-tv-type-body);
  color: var(--rz-color-text-secondary);
}
</style>
