<script setup lang="ts">
import { computed } from 'vue'

// Inventory: "Run progress bar" (Data display). Completed of planned for a run, a cycle or a step.
// Text never sits on the fill (audit: text overlapped the fill in Light mode): the caption row
// above holds the label on the left and "15,400 of 22,900 cases" on the right.
// Fill data/neutral; track surface/raised. An optional marker (pace, target) is a 4 px
// text/primary line with its label below the track, so it never meets the caption. Status color is not used here: the status
// of the run belongs to its KPI (INFO-05, INFO-06).
// Fixed geometry: track 32 px (md) or 20 px (sm), marker 4 px wide.
const props = withDefaults(
  defineProps<{
    value: number
    max: number
    label?: string
    /** Right-hand caption, for example "15,400 of 22,900 cases". */
    valueText?: string
    marker?: number
    markerLabel?: string
    size?: 'md' | 'sm'
    /** Hatched fill, for something still in progress (like the current hour). */
    inProgress?: boolean
  }>(),
  { size: 'md', inProgress: false },
)
const pct = (n: number) => `${Math.max(0, Math.min(100, (n / (props.max || 1)) * 100))}%`
const fill = computed(() => pct(props.value))
</script>

<template>
  <div class="rz-progress" :class="props.size">
    <div v-if="props.label || props.valueText" class="caption">
      <span v-if="props.label" class="label">{{ props.label }}</span>
      <span v-if="props.valueText" class="value">{{ props.valueText }}</span>
    </div>
    <div class="track-wrap">
      <div class="track">
        <div class="fill" :class="{ hatched: props.inProgress }" :style="{ width: fill }" />
      </div>
      <div v-if="props.marker != null" class="marker" :style="{ left: pct(props.marker) }">
        <span v-if="props.markerLabel" class="marker-label">{{ props.markerLabel }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.rz-progress {
  display: flex;
  flex-direction: column;
  gap: var(--rz-spacing-xs);
  min-width: 0;
}
.caption {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: var(--rz-spacing-md);
}
.label {
  min-width: 0;
  font: var(--rz-tv-type-body-strong);
  color: var(--rz-color-text-primary);
}
.value {
  font: var(--rz-tv-type-chart-value);
  color: var(--rz-color-text-primary);
  white-space: nowrap;
}
.track-wrap {
  position: relative;
}
.track-wrap:has(.marker-label) {
  margin-bottom: var(--rz-spacing-xl);
}
.track {
  height: 32px;
  overflow: hidden;
  border-radius: var(--rz-radius-sm);
  background: var(--rz-color-surface-raised);
}
.sm .track {
  height: 20px;
}
.fill {
  height: 100%;
  border-radius: var(--rz-radius-sm);
  background: var(--rz-color-data-neutral);
}
.fill.hatched {
  background: repeating-linear-gradient(
    -45deg,
    var(--rz-color-data-neutral) 0 6px,
    color-mix(in srgb, var(--rz-color-data-neutral) 22%, transparent) 6px 12px
  );
}
.marker {
  position: absolute;
  top: calc(-1 * var(--rz-spacing-2xs));
  bottom: calc(-1 * var(--rz-spacing-2xs));
  width: 4px;
  margin-left: -2px;
  border-radius: var(--rz-radius-full);
  background: var(--rz-color-text-primary);
}
.marker-label {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  padding-top: var(--rz-spacing-2xs);
  font: var(--rz-tv-type-body);
  color: var(--rz-color-text-secondary);
  white-space: nowrap;
}
</style>
