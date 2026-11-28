<script setup lang="ts">
import HourlyTargetChart from '../_shared/HourlyTargetChart.vue'
import { formatPercent, formatPercentTick } from '../../utils/format'
import type { HourlyOeeData } from './types'

// Design plan (round 2)
//
// Question: which hours met the OEE target?
// Answer (hero): the hourly OEE bar chart. It fills the slide body; each bar is one hour of the shift.
//
// Must show, mapped:
// - OEE per hour: one bar per hour with its value as a direct label.
// - Target: the dashed target line, labeled at its right end ("Target 85.0%").
// - Hours above and below target: bar color plus the status icon on below-target values, and the
//   card title counts them ("4 of 6 hours on target"), which is the one-line answer to the question.
// - Current hour shown as in progress: hatched bar with the "Now" tick; it is left out of the count.
//
// Not shown:
// - Shift OEE as a large number (design guide Claude idea): it answers "how is the shift going",
//   not "which hours". Logged in questions.md.
// - Hours on target and current hour tiles (round 1): the count is in the title, the current hour is in the chart.
// - Chart title "OEE per hour": repeats the slide title in the header.
// - Shift name and times: the hour ticks already show the shift's span.
// - Side navigation buttons (current product): they are an app control, not slide content.
//
// Layout options:
// a) Hero number on top, chart below (round 1, Run throughput grid): splits attention between two answers.
// b) Chart with a side column of per-hour results: repeats the bar labels.
// c) Chart alone, full body, with the answer count as its title. Chosen: the question is a pattern
//    over time, so the chart is the answer and gets all the room. Future hours of the shift stay as
//    empty slots so the viewer sees how much of the shift is left.
//
// Round 2: the chart body lives in `_shared/HourlyTargetChart.vue` (shared with Hourly counts and
// Units/man hour); the render is unchanged. Bar geometry comes from chartGeometry.
const props = defineProps<{ data: HourlyOeeData }>()
</script>

<template>
  <HourlyTargetChart
    :hourly="props.data.hourly"
    :target="props.data.targetPerHour"
    :current-index="props.data.currentHourIndex"
    :format="formatPercent"
    :tick-format="formatPercentTick"
    :grid-values="[50, 100]"
  />
</template>
