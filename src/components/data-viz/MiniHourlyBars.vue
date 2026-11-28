<script setup lang="ts">
import { computed } from 'vue'

// Inventory: "Mini hourly bar chart" (Data viz). Compact hourly bars for a table cell or a
// location card: no axis or value labels. The slide names what it shows (a column header such as
// "Last 12 hours", or a text summary such as "8 of 12 on target"). Same language as the Hourly
// bar chart: data/neutral bars, below-target bars in status/negative/content, the current hour hatched,
// and a dashed text/secondary target line. Bars start at zero.
// Fixed geometry: 4 px gap between bars, 4 px corner radius, 3 px target line.
const props = withDefaults(
  defineProps<{ values: number[]; target?: number; currentIndex?: number; height?: number }>(),
  { currentIndex: -1, height: 56 },
)
const max = computed(() => Math.max(...props.values, props.target ?? 0, 1) * 1.08)
const pct = (v: number) => `${(v / max.value) * 100}%`
</script>

<template>
  <div class="rz-mini-bars" :style="{ height: `${props.height}px` }" aria-hidden="true">
    <span
      v-for="(v, i) in props.values"
      :key="i"
      class="bar"
      :class="{
        current: i === props.currentIndex,
        below: i !== props.currentIndex && props.target != null && v < props.target,
      }"
      :style="{ height: pct(v) }"
    />
    <span v-if="props.target != null" class="target" :style="{ bottom: pct(props.target) }" />
  </div>
</template>

<style scoped>
.rz-mini-bars {
  position: relative;
  display: flex;
  align-items: flex-end;
  gap: var(--rz-spacing-3xs);
  width: 100%;
  border-bottom: 2px solid var(--rz-color-data-axis);
}
.bar {
  flex: 1;
  min-height: 2px;
  border-radius: 4px 4px 0 0;
  background: var(--rz-color-data-neutral);
}
.bar.below {
  background: var(--rz-color-status-negative-content);
}
.bar.current {
  /* A stopped line's current hour can be near zero; keep the hatch visible (fixed geometry). */
  min-height: 8px;
  background: repeating-linear-gradient(
    -45deg,
    var(--rz-color-data-neutral) 0 4px,
    color-mix(in srgb, var(--rz-color-data-neutral) 22%, transparent) 4px 8px
  );
}
.target {
  position: absolute;
  left: 0;
  right: 0;
  border-top: 3px dashed var(--rz-color-text-secondary);
}
</style>
