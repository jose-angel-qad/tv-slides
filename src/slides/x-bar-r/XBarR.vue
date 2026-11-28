<script setup lang="ts">
import { computed, ref } from 'vue'
import ChartCard from '../../components/card/ChartCard.vue'
import KpiTile from '../../components/card/KpiTile.vue'
import FactCard, { type Fact } from '../../components/card/FactCard.vue'
import LineChart from '../../components/data-viz/LineChart.vue'
import type { FillStatus } from '../../components/status/status'
import { useElementSize } from '../../utils/useElementSize'
import type { XBarRData } from './types'

// Design plan (round 2)
//
// Question: is this characteristic in control? (guide, kept)
// Answer (hero): the number of points outside the control limits, with "In control" or "Out of
// control" in the Status band, the slide's one primary feedback. Zero reads as in control at a glance.
//
// Must show, mapped:
// - Characteristic name: title of the X-bar chart card (wraps, never cut), with its unit.
// - In or out of control: hero band.
// - X-bar and range charts with their limits: two line charts, UCL, center and LCL labeled at the
//   right end, points outside flagged with the negative icon. The X-bar chart gets 55% of the
//   height: it is where the process moves. Neither chart starts at zero (control charts).
// - Cp and Cpk: Fact card; Cpk shows a status only below the capability target. Spec limits in the
//   same card ("11.80 to 12.40").
//
// Not shown:
// - Sigma and x-double-bar (current product): they explain the limits but do not answer the question.
// - Spec lines on the X-bar chart: five dashed lines in one chart are unreadable from a distance; the
//   spec range is written in the Fact card.
//
// Layout options:
// a) Hero, Cp and Cpk tiles on top, charts side by side below (round 1): charts became half width.
// b) Charts only with the status in the title: the answer turns into small text.
// c) Charts stacked full height on the left, hero and facts on the right. Chosen: the charts get the
//    width they need to show 20 subgroups, and the answer is the largest number on screen.
const props = defineProps<{ data: XBarRData }>()
const d = computed(() => props.data)
const f = (n: number) => n.toFixed(d.value.decimals)
const f2 = (n: number) => n.toFixed(2)

const out = computed(() => {
  const l = d.value.limits
  return (
    d.value.xbar.filter((p) => p.value > l.ucl || p.value < l.lcl).length +
    d.value.range.filter((p) => p.value > l.rUcl).length
  )
})
const band = computed<{ status: FillStatus; label: string }>(() =>
  out.value ? { status: 'negative', label: 'Out of control' } : { status: 'positive', label: 'In control' },
)
const facts = computed<Fact[]>(() => {
  const low = d.value.cpk < d.value.capabilityTarget
  return [
    { label: 'Cpk', value: f2(d.value.cpk), detail: `Target ${f2(d.value.capabilityTarget)}`, status: low ? 'negative' : undefined, statusLabel: low ? 'Below target' : undefined },
    { label: 'Cp', value: f2(d.value.cp) },
    { label: 'Spec limits', value: `${f(d.value.limits.lsl)} to ${f(d.value.limits.usl)}`, detail: d.value.unit },
  ]
})

const xEl = ref<HTMLElement | null>(null)
const rEl = ref<HTMLElement | null>(null)
const xs = useElementSize(xEl)
const rs = useElementSize(rEl)
</script>

<template>
  <div class="rz-xbar-r">
    <div class="charts">
      <ChartCard :title="`${d.characteristic} · X-bar, ${d.unit}`">
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
            :flag-low="false"
            :zero-based="false"
            show-points
            flag-outside
          />
        </div>
      </ChartCard>
    </div>
    <div class="side">
      <KpiTile
        title="Points outside the limits"
        :subtitle="`Last ${d.xbar.length} subgroups`"
        :value="String(out)"
        :band-status="band.status"
        :band-text="band.label"
      />
      <FactCard :facts="facts" />
    </div>
  </div>
</template>

<style scoped>
.rz-xbar-r {
  position: absolute;
  inset: 0;
  padding: var(--rz-spacing-md) var(--rz-spacing-xl) var(--rz-spacing-xl);
  display: grid;
  grid-template-columns: minmax(0, 1fr) 520px;
  gap: var(--rz-spacing-md);
}
.charts {
  display: grid;
  grid-template-rows: minmax(0, 11fr) minmax(0, 9fr);
  gap: var(--rz-spacing-md);
  min-height: 0;
}
.side {
  /* Same split as the charts, so the two columns share their gutter. */
  display: grid;
  grid-template-rows: minmax(0, 11fr) minmax(0, 9fr);
  gap: var(--rz-spacing-md);
  min-height: 0;
}
.side > :first-child {
  height: 100%;
}
.chart-area {
  flex: 1;
  min-height: 0;
}
</style>
