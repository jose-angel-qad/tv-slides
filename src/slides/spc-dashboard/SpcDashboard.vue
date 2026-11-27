<script setup lang="ts">
import { computed } from 'vue'
import T4Table from '../../templates/T4Table.vue'
import ChartCard from '../../components/card/ChartCard.vue'
import LocationTable, { type TableColumn, type TableRow } from '../../components/table/LocationTable.vue'
import StatusValue from '../../components/status/StatusValue.vue'
import type { SpcCharacteristic, SpcDashboardData } from './types'

// Proposal (definition pending, only captured with no data).
// Question: is each monitored characteristic in control?
// One row per characteristic (location and name), fixed order. Control status in words is the
// row hero. Then the latest value, the control limits and Cpk against the capability target.
// For a single characteristic in depth, the X-Bar R slide shows the charts.
const props = defineProps<{ data: SpcDashboardData }>()
const d = computed(() => props.data)
const columns: TableColumn[] = [
  { key: 'state', label: 'Control', width: '380px' },
  { key: 'latest', label: 'Latest', width: '220px', align: 'end' },
  { key: 'limits', label: 'Control limits', width: '300px', align: 'end' },
  { key: 'cpk', label: 'Cpk', width: '160px', align: 'end' },
]
const rows = computed(() => d.value.characteristics as unknown as TableRow[])
const C = (r: TableRow) => r as unknown as SpcCharacteristic
const f = (c: SpcCharacteristic, n: number) => n.toFixed(c.decimals)
const outside = (c: SpcCharacteristic) => c.latest > c.ucl || c.latest < c.lcl
</script>

<template>
  <T4Table>
    <ChartCard title="Monitored characteristics, last 20 subgroups">
      <template #actions>
        <span class="note">Cpk target {{ d.capabilityTarget.toFixed(2) }}</span>
      </template>
      <LocationTable :columns="columns" :rows="rows" location-label="Location and characteristic">
        <template #cell-state="{ row }">
          <StatusValue
            size="lg"
            :status="C(row).pointsOutside ? 'negative' : 'positive'"
            :text="C(row).pointsOutside ? 'Out of control' : 'In control'"
          />
        </template>
        <template #cell-latest="{ row }">
          <StatusValue :status="outside(C(row)) ? 'negative' : undefined" :text="`${f(C(row), C(row).latest)} ${C(row).unit}`" />
        </template>
        <template #cell-limits="{ row }">{{ f(C(row), C(row).lcl) }} to {{ f(C(row), C(row).ucl) }}</template>
        <template #cell-cpk="{ row }">
          <StatusValue :status="C(row).cpk >= d.capabilityTarget ? 'positive' : 'negative'" :text="C(row).cpk.toFixed(2)" />
        </template>
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
