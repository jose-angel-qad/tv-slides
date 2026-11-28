<script setup lang="ts">
import { computed } from 'vue'
import LocationTable from '../../components/table/LocationTable.vue'
import MetricCell from '../../components/table/MetricCell.vue'
import StatusValue from '../../components/status/StatusValue.vue'
import type { SpcCharacteristic, SpcDashboardData } from './types'

// Design plan (round 2). Proposal: the slide is not in the Knowledge Base and was only captured with
// no data; built from the design guide and the X-Bar R slide.
//
// Question: is each monitored characteristic in control? (guide, kept)
// Answer (row hero): the control status in a Metric cell after the characteristic ("In control" or
// "7 points out", over "Last 20 subgroups"), with the row's one status icon.
//
// Must show, mapped:
// - Characteristic and location: the row name ("Bottling Line 2, fill weight"), wraps.
// - In or out of control: Metric cell.
// - Latest value against the limits: "12.21 oz" with "LCL 11.91 · UCL 12.15" after it; a status only
//   when the latest value is outside. Spec limits and target are not in the data (questions.md).
// - Capability: Cpk with a status only below the capability target.
//
// Not shown:
// - One full control chart per characteristic: four charts at a quarter size each do not read from
//   across the room; the X-Bar R slide shows one characteristic in full (guide open question).
//
// Layout options:
// a) One chart per characteristic in a grid: unreadable at distance.
// b) The worst characteristic as an X-Bar R chart, the rest as a list: two forms on one slide.
// c) Shared row layout, one row per characteristic. Chosen: the status column answers the question
//    for every characteristic at once.
const props = defineProps<{ data: SpcDashboardData }>()
const d = computed(() => props.data)
const rows = computed(() => d.value.characteristics.slice(0, 6).map((c) => ({ ...c })))
const columns = [
  { key: 'control', label: 'Control', width: '320px' },
  { key: 'latest', label: 'Latest value', width: 'minmax(0, 1.2fr)' },
  { key: 'cpk', label: `Cpk, target ${d.value.capabilityTarget.toFixed(2)}`, width: '260px', align: 'end' as const },
]
const C = (r: unknown) => r as SpcCharacteristic
const f = (c: SpcCharacteristic, n: number) => n.toFixed(c.decimals)
const outside = (c: SpcCharacteristic) => c.latest > c.ucl || c.latest < c.lcl
</script>

<template>
  <div class="rz-spc">
    <LocationTable :columns="columns" :rows="rows">
      <template #cell-control="{ row }">
        <MetricCell
          :value="C(row).pointsOutside ? `${C(row).pointsOutside} ${C(row).pointsOutside === 1 ? 'point' : 'points'} out` : 'In control'"
          target="Last 20 subgroups"
          :status="C(row).pointsOutside ? 'negative' : 'positive'"
          :label="C(row).pointsOutside ? 'Out of control' : 'In control'"
        />
      </template>
      <template #cell-latest="{ row }">
        <span class="latest">
          <StatusValue v-if="outside(C(row))" status="negative" label="Outside the limits" :text="`${f(C(row), C(row).latest)} ${C(row).unit}`" />
          <span v-else>{{ f(C(row), C(row).latest) }} {{ C(row).unit }}</span>
          <span class="sub">LCL {{ f(C(row), C(row).lcl) }} · UCL {{ f(C(row), C(row).ucl) }}</span>
        </span>
      </template>
      <template #cell-cpk="{ row }">
        <StatusValue v-if="C(row).cpk < d.capabilityTarget" status="negative" label="Below target" :text="C(row).cpk.toFixed(2)" />
        <span v-else>{{ C(row).cpk.toFixed(2) }}</span>
      </template>
    </LocationTable>
  </div>
</template>

<style scoped>
.rz-spc {
  position: absolute;
  inset: 0;
  padding: var(--rz-spacing-md) var(--rz-spacing-xl) var(--rz-spacing-xl);
}
.latest {
  display: inline-flex;
  align-items: baseline;
  flex-wrap: wrap;
  column-gap: var(--rz-spacing-sm);
}
.sub {
  font: var(--rz-tv-type-body);
  color: var(--rz-color-text-secondary);
}
</style>
