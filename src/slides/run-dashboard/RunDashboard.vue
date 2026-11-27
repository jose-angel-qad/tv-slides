<script setup lang="ts">
import { computed } from 'vue'
import T4Table from '../../templates/T4Table.vue'
import ChartCard from '../../components/card/ChartCard.vue'
import LocationTable, { type TableColumn, type TableRow } from '../../components/table/LocationTable.vue'
import StatusValue from '../../components/status/StatusValue.vue'
import ProgressBar from '../../components/data-display/ProgressBar.vue'
import { formatCount, formatPercent } from '../../utils/format'
import type { RunDashboardData, RunDashboardLocation } from './types'

// Question: how far along is each run, and is quality OK?
// One row per location, fixed order. Run OEE is the row hero with its status icon; the run column
// holds the product (wraps, never cut) over a progress bar with "completed of planned" and the unit;
// quality is one percentage with its status (design guide idea, replaces the circle and badge).
// A location without an active run says so in words.
const props = defineProps<{ data: RunDashboardData }>()
const d = computed(() => props.data)
const columns: TableColumn[] = [
  { key: 'oee', label: 'Run OEE', width: '220px' },
  { key: 'progress', label: 'Product and progress', width: 'minmax(0, 1fr)' },
  { key: 'quality', label: 'Quality', width: '200px', align: 'end' },
]
const rows = computed(() => d.value.locations as unknown as TableRow[])
const L = (r: TableRow) => r as unknown as RunDashboardLocation
</script>

<template>
  <T4Table>
    <ChartCard title="Runs by location">
      <LocationTable :columns="columns" :rows="rows" location-width="360px">
        <template #cell-oee="{ row }">
          <StatusValue
            v-if="L(row).run"
            size="lg"
            :status="L(row).run!.oee >= L(row).run!.oeeTarget ? 'positive' : 'negative'"
            :text="formatPercent(L(row).run!.oee)"
          />
          <span v-else class="none">-</span>
        </template>
        <template #cell-progress="{ row }">
          <ProgressBar
            v-if="L(row).run"
            class="progress"
            size="sm"
            :value="L(row).run!.completed"
            :max="L(row).run!.planned"
            :label="L(row).run!.product"
            :value-text="L(row).run!.completed >= L(row).run!.planned ? 'Complete' : `${formatCount(L(row).run!.completed)} of ${formatCount(L(row).run!.planned)} ${L(row).run!.unit.plural}`"
          />
          <span v-else class="none">No active run</span>
        </template>
        <template #cell-quality="{ row }">
          <StatusValue
            v-if="L(row).run"
            :status="L(row).run!.quality >= L(row).run!.qualityTarget ? 'positive' : 'negative'"
            :text="formatPercent(L(row).run!.quality)"
          />
          <span v-else class="none">-</span>
        </template>
      </LocationTable>
    </ChartCard>
  </T4Table>
</template>

<style scoped>
.progress {
  width: 100%;
}
.none {
  font: var(--rz-tv-type-body);
  color: var(--rz-color-text-secondary);
}
</style>
