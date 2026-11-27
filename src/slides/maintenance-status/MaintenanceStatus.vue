<script setup lang="ts">
import { computed } from 'vue'
import T4Table from '../../templates/T4Table.vue'
import ChartCard from '../../components/card/ChartCard.vue'
import LocationTable, { type TableColumn, type TableRow } from '../../components/table/LocationTable.vue'
import StatusValue from '../../components/status/StatusValue.vue'
import { formatCount, formatDuration } from '../../utils/format'
import type { MaintenanceLocation, MaintenanceStatusData } from './types'

// Proposal (definition pending, not in the Knowledge Base).
// Question: which lines need maintenance attention now?
// One row per location: the current state (an active issue with its duration, negative, or the
// running product) and four counts with their full names spelled out (design guide idea).
// A count at or above its limit shows the negative status; others stay neutral (INFO-06).
const props = defineProps<{ data: MaintenanceStatusData }>()
const d = computed(() => props.data)
type CountKey = 'pm' | 'wo' | 'cl' | 'od'
const columns: TableColumn[] = [
  { key: 'now', label: 'Now', width: 'minmax(0, 1.4fr)' },
  { key: 'pm', label: 'Preventive due', width: '220px', align: 'end' },
  { key: 'wo', label: 'Work orders', width: '200px', align: 'end' },
  { key: 'cl', label: 'Checklist items', width: '220px', align: 'end' },
  { key: 'od', label: 'Overdue', width: '170px', align: 'end' },
]
const rows = computed(() => d.value.locations as unknown as TableRow[])
const L = (r: TableRow) => r as unknown as MaintenanceLocation
const over = (l: MaintenanceLocation, k: CountKey) => l[k] >= d.value.limits[k]
</script>

<template>
  <T4Table>
    <ChartCard title="Maintenance by location">
      <LocationTable :columns="columns" :rows="rows" location-width="minmax(0, 1fr)">
        <template #cell-now="{ row }">
          <StatusValue v-if="L(row).issue" status="negative" :text="`${L(row).issue!.name}, ${formatDuration(L(row).issue!.minutes)}`" />
          <span v-else class="product">{{ L(row).product }}</span>
        </template>
        <template v-for="k in (['pm', 'wo', 'cl', 'od'] as CountKey[])" :key="k" #[`cell-${k}`]="{ row }">
          <StatusValue :status="over(L(row), k) ? 'negative' : undefined" :text="formatCount(L(row)[k])" />
        </template>
      </LocationTable>
    </ChartCard>
  </T4Table>
</template>

<style scoped>
.product {
  font: var(--rz-tv-type-body);
  color: var(--rz-color-text-secondary);
}
</style>
