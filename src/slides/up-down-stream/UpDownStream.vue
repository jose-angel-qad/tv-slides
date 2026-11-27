<script setup lang="ts">
import { computed } from 'vue'
import T4Table from '../../templates/T4Table.vue'
import ChartCard from '../../components/card/ChartCard.vue'
import LocationTable, { type TableColumn, type TableRow } from '../../components/table/LocationTable.vue'
import StatusValue from '../../components/status/StatusValue.vue'
import ProgressBar from '../../components/data-display/ProgressBar.vue'
import type { Status } from '../../components/status/status'
import { formatCount, formatDuration, formatTime } from '../../utils/format'
import type { StreamLocation, UpDownStreamData } from './types'

// Question: will the lines feeding this area finish on time?
// Rows follow the process flow, upstream first (design guide idea). Ahead or behind schedule is
// the row hero, in words and with its icon (audit: color alone separated ahead from behind).
// Then product and progress, run status with a word, and the ETA. A stopped line has no ETA.
const props = defineProps<{ data: UpDownStreamData }>()
const d = computed(() => props.data)
const columns: TableColumn[] = [
  { key: 'schedule', label: 'Schedule', width: '280px' },
  { key: 'progress', label: 'Product and progress', width: 'minmax(0, 1fr)' },
  { key: 'state', label: 'Now', width: '200px' },
  { key: 'eta', label: 'ETA', width: '150px', align: 'end' },
]
const rows = computed(() => d.value.locations as unknown as TableRow[])
const L = (r: TableRow) => r as unknown as StreamLocation
const schedule = (l: StreamLocation): { status: Status; text: string } => {
  const m = l.scheduleMinutes
  if (Math.abs(m) < 1) return { status: 'positive', text: 'On time' }
  return m > 0 ? { status: 'positive', text: `${formatDuration(m)} ahead` } : { status: 'negative', text: `${formatDuration(-m)} behind` }
}
</script>

<template>
  <T4Table>
    <ChartCard :title="`Locations feeding ${d.location}`">
      <LocationTable :columns="columns" :rows="rows" location-label="Location, upstream first" location-width="300px">
        <template #cell-schedule="{ row }">
          <StatusValue size="lg" :status="schedule(L(row)).status" :text="schedule(L(row)).text" />
        </template>
        <template #cell-progress="{ row }">
          <ProgressBar
            class="progress"
            size="sm"
            :value="L(row).completed"
            :max="L(row).planned"
            :label="L(row).product"
            :value-text="`${formatCount(L(row).completed)} of ${formatCount(L(row).planned)} ${L(row).unit.plural}`"
          />
        </template>
        <template #cell-state="{ row }">
          <StatusValue :status="L(row).running ? 'positive' : 'negative'" :text="L(row).running ? 'Running' : 'Stopped'" />
        </template>
        <template #cell-eta="{ row }">{{ L(row).endsAt ? formatTime(L(row).endsAt!) : '-' }}</template>
      </LocationTable>
    </ChartCard>
  </T4Table>
</template>

<style scoped>
.progress {
  width: 100%;
}
</style>
