<script setup lang="ts">
import { computed, ref } from 'vue'
import T3HeroSupport from '../../templates/T3HeroSupport.vue'
import ChartCard from '../../components/card/ChartCard.vue'
import KpiTile from '../../components/card/KpiTile.vue'
import StatTile from '../../components/card/StatTile.vue'
import LineChart from '../../components/data-viz/LineChart.vue'
import type { FillStatus, Status } from '../../components/status/status'
import { useElementSize } from '../../utils/useElementSize'
import type { XBarRData } from './types'

// Question: is this characteristic in control?
// Hero: the control status in words with the Status band (how many points are outside the limits).
// Support: Cp and Cpk; Cpk has a status against the capability target. The X-bar and range charts
// sit side by side, with UCL, center and LCL labeled at the right end; points outside are flagged
// with the negative icon. Spec limits are written in the chart subtitle (too many lines otherwise).
const props = defineProps<{ data: XBarRData }>()
const d = computed(() => props.data)
const f = (n: number) => n.toFixed(d.value.decimals)
const f2 = (n: number) => n.toFixed(2)

const out = computed(() => {
  const l = d.value.limits
  const x = d.value.xbar.filter((p) => p.value > l.ucl || p.value < l.lcl).length
  const r = d.value.range.filter((p) => p.value > l.rUcl).length
  return x + r
})
const band = computed<{ status: FillStatus; label: string }>(() =>
  out.value
    ? { status: 'negative', label: `${out.value} ${out.value === 1 ? 'point' : 'points'} outside the control limits` }
    : { status: 'positive', label: 'All points within the control limits' },
)
const cpk = computed<{ status: Status; label: string }>(() =>
  d.value.cpk >= d.value.capabilityTarget
    ? { status: 'positive', label: `On target ${f2(d.value.capabilityTarget)}` }
    : { status: 'negative', label: `Below target ${f2(d.value.capabilityTarget)}` },
)

const xEl = ref<HTMLElement | null>(null)
const rEl = ref<HTMLElement | null>(null)
const xs = useElementSize(xEl)
const rs = useElementSize(rEl)
</script>

<template>
  <T3HeroSupport>
    <template #hero>
      <KpiTile
        :title="d.characteristic"
        :subtitle="`Last ${d.xbar.length} subgroups`"
        :value="out ? 'Out of control' : 'In control'"
        :band-status="band.status"
        :band-text="band.label"
      />
    </template>
    <template #support>
      <StatTile title="Cp" subtitle="Process capability" :value="f2(d.cp)" :show-status="false" />
      <StatTile title="Cpk" subtitle="Capability, centered" :value="f2(d.cpk)" :status="cpk.status" :status-text="cpk.label" />
    </template>
    <template #chart>
      <div class="charts">
        <ChartCard :title="`X-bar, ${d.unit}`">
          <template #actions>
            <span class="context">Spec {{ f(d.limits.lsl) }} to {{ f(d.limits.usl) }}</span>
          </template>
          <div ref="xEl" class="chart-area">
            <LineChart
              v-if="xs.width.value && xs.height.value"
              :points="d.xbar"
              :lines="[{ value: d.limits.ucl, label: 'UCL' }, { value: d.limits.center, label: 'Center' }, { value: d.limits.lcl, label: 'LCL' }]"
              :width="xs.width.value"
              :height="xs.height.value"
              :format="f"
              :zero-based="false"
              :x-every="2"
              show-points
              flag-outside
            />
          </div>
        </ChartCard>
        <ChartCard :title="`Range, ${d.unit}`">
          <div ref="rEl" class="chart-area">
            <LineChart
              v-if="rs.width.value && rs.height.value"
              :points="d.range"
              :lines="[{ value: d.limits.rUcl, label: 'UCL' }, { value: d.limits.rBar, label: 'R-bar' }]"
              :width="rs.width.value"
              :height="rs.height.value"
              :format="f"
              :x-every="2"
              show-points
              flag-outside
              :flag-low="false"
            />
          </div>
        </ChartCard>
      </div>
    </template>
  </T3HeroSupport>
</template>

<style scoped>
.charts {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: var(--rz-spacing-md);
  min-height: 0;
}
.chart-area {
  flex: 1;
  min-height: 0;
}
.context {
  font: var(--rz-tv-type-body);
  color: var(--rz-color-text-secondary);
  white-space: nowrap;
}
</style>
