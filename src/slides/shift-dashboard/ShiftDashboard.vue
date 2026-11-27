<script setup lang="ts">
import { computed } from 'vue'
import T4Table from '../../templates/T4Table.vue'
import ChartCard from '../../components/card/ChartCard.vue'
import LocationTable, { type TableColumn, type TableRow } from '../../components/table/LocationTable.vue'
import StatusValue from '../../components/status/StatusValue.vue'
import MiniHourlyBars from '../../components/data-viz/MiniHourlyBars.vue'
import ChartLegendItem from '../../components/data-viz/ChartLegendItem.vue'
import { formatCount, formatPercent } from '../../utils/format'
import type { ShiftDashboardData, ShiftDashboardLocation } from './types'

// Question: how is each line's shift going, and is it running now?
// One row per location in a fixed order. Shift OEE is the hero column of each row (larger, with
// its status icon); run status is an icon plus a word (audit: icons had no label); downtime in
// minutes; the last 12 hours as compact bars with a text count of hours on target.
// Multiple location slides have no single KPI, so there is no Status band: every status is
// secondary and sits in its row (see questions.md).
const props = defineProps<{ data: ShiftDashboardData }>()
const d = computed(() => props.data)

const columns: TableColumn[] = [
  { key: 'oee', label: 'Shift OEE', width: '260px' },
  { key: 'state', label: 'Now', width: '220px' },
  { key: 'downtime', label: 'Downtime, min', width: '220px', align: 'end' },
  { key: 'hours', label: 'Last 12 hours, OEE', width: 'minmax(0, 1fr)' },
]
const rows = computed(() => d.value.locations as unknown as TableRow[])
const L = (r: TableRow) => r as unknown as ShiftDashboardLocation
const onTarget = (l: ShiftDashboardLocation) => l.hourlyOee.slice(0, -1).filter((v) => v >= l.oeeTarget).length
</script>

<template>
  <T4Table>
    <ChartCard title="Shift performance by location">
      <template #actions>
        <div class="actions">
          <ul class="legend">
            <ChartLegendItem type="on-target" label="On target" />
            <ChartLegendItem type="below-target" label="Below target" />
            <ChartLegendItem type="in-progress" label="In progress" />
          </ul>
          <span v-if="d.page" class="page">Page {{ d.page.index }} of {{ d.page.count }}</span>
        </div>
      </template>
      <LocationTable :columns="columns" :rows="rows">
        <template #cell-oee="{ row }">
          <StatusValue
            size="lg"
            :status="L(row).oee >= L(row).oeeTarget ? 'positive' : 'negative'"
            :text="formatPercent(L(row).oee)"
          />
        </template>
        <template #cell-state="{ row }">
          <StatusValue :status="L(row).running ? 'positive' : 'negative'" :text="L(row).running ? 'Running' : 'Stopped'" />
        </template>
        <template #cell-downtime="{ row }">{{ formatCount(L(row).downtimeMinutes) }}</template>
        <template #cell-hours="{ row }">
          <div class="hours">
            <MiniHourlyBars :values="L(row).hourlyOee" :target="L(row).oeeTarget" :current-index="L(row).hourlyOee.length - 1" />
            <span class="count">{{ onTarget(L(row)) }} of {{ L(row).hourlyOee.length - 1 }} on target</span>
          </div>
        </template>
      </LocationTable>
    </ChartCard>
  </T4Table>
</template>

<style scoped>
.actions {
  display: flex;
  align-items: center;
  gap: var(--rz-spacing-2xl);
}
.legend {
  display: flex;
  gap: var(--rz-spacing-lg);
  margin: 0;
  padding: 0;
  list-style: none;
}
.page,
.count {
  font: var(--rz-tv-type-body);
  color: var(--rz-color-text-secondary);
  white-space: nowrap;
}
.hours {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: center;
  gap: var(--rz-spacing-md);
  width: 100%;
}
</style>
