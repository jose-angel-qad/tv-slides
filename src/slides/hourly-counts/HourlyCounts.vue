<script setup lang="ts">
import HourlyTargetChart from '../_shared/HourlyTargetChart.vue'
import { formatCount } from '../../utils/format'
import type { HourlyCountsData } from './types'

// Design plan (round 2)
//
// Question: which hours met the count target? (guide, kept)
// Answer (hero): the hourly bar chart, full body, the same form as Hourly OEE (guide: same template).
// The card title is the one-line answer and names the unit, which the values do not show
// ("Bottles per hour: 6 of 7 hours on target").
//
// Must show, mapped:
// - Count per hour: one bar per hour with its value as a direct label.
// - Target per hour: the dashed target line, labeled at its right end.
// - Hours above and below target: bar color plus the status icon on below-target values, and the
//   count in the title.
// - Current hour in progress: hatched bar with the "Now" tick, left out of the count.
//
// Not shown:
// - Shift total and gap as a hero number (round 1): it answers "how many this shift", which Shift throughput answers.
// - Hours on target and current hour tiles (round 1): the count is in the title, the hour in the chart.
// - Shift name and times: the hour ticks show the shift's span.
//
// Layout options:
// a) Hero number over the chart (round 1): splits attention between two answers.
// b) Chart with a per-hour side list: repeats the bar labels.
// c) Chart alone with the answer as its title. Chosen: the question is a pattern over time.
const props = defineProps<{ data: HourlyCountsData }>()
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)
</script>

<template>
  <HourlyTargetChart
    :hourly="props.data.hourly"
    :target="props.data.targetPerHour"
    :current-index="props.data.currentHourIndex"
    :unit-label="`${cap(props.data.unit.plural)} per hour`"
    :format="formatCount"
  />
</template>
