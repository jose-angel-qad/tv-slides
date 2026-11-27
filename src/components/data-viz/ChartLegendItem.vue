<script setup lang="ts">
// Inventory: "Chart legend item" (Data viz). Swatch + label, Inter Regular 28/34 in text/secondary.
// Types match the Hourly bar states, plus Target (the dashed target line, in text/secondary).
export type LegendType = 'on-target' | 'below-target' | 'in-progress' | 'target'
const props = defineProps<{ type: LegendType; label: string }>()
</script>

<template>
  <li class="rz-legend-item">
    <span class="swatch" :class="props.type" aria-hidden="true" />
    <span>{{ props.label }}</span>
  </li>
</template>

<style scoped>
.rz-legend-item {
  display: flex;
  align-items: center;
  gap: var(--rz-spacing-xs);
  font: var(--rz-tv-type-body);
  color: var(--rz-color-text-secondary);
  white-space: nowrap;
}
.swatch {
  flex: none;
  width: 20px;
  height: 20px;
  border-radius: 6px;
}
.on-target {
  background: var(--rz-color-data-neutral);
}
.below-target {
  background: var(--rz-color-status-negative-content);
}
.in-progress {
  background: repeating-linear-gradient(
    -45deg,
    var(--rz-color-data-neutral) 0 4px,
    color-mix(in srgb, var(--rz-color-data-neutral) 22%, transparent) 4px 8px
  );
}
.target {
  width: 32px;
  height: 4px;
  border-radius: 0;
  background: repeating-linear-gradient(90deg, var(--rz-color-text-secondary) 0 12px, transparent 12px 20px);
}
</style>
