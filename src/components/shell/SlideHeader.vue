<script setup lang="ts">
import ScreenNavStrip from './ScreenNavStrip.vue'
import ClockAndRefreshTimer from './ClockAndRefreshTimer.vue'

// Inventory: "Slide header" (Shell), same on every slide.
// One line, two groups:
//   left:  slide type (Geist Bold) + location (Geist Regular), same size and color, no separator.
//          Example: "Run throughput Line 1".
//   right: previous, settings, next, then date, time and the refresh timer.
// The configuration (slide set) name is not shown here; it lives only in Settings.
export interface SlideHeaderProps {
  location: string
  slideType: string
  showControls?: boolean
  now: Date
  dwellSeconds: number
  remainingSeconds?: number
  /** Defaults to true: the timer always runs. */
  countdownRunning?: boolean
}
const props = withDefaults(defineProps<SlideHeaderProps>(), { showControls: true, countdownRunning: true })
const emit = defineEmits<{ prev: []; next: []; settings: [] }>()
</script>

<template>
  <header class="rz-app-header">
    <h1 class="left">
      <span class="type">{{ props.slideType }}</span>
      <span class="location">{{ props.location }}</span>
    </h1>
    <div class="right">
      <ScreenNavStrip
        v-if="props.showControls"
        @prev="emit('prev')"
        @next="emit('next')"
        @settings="emit('settings')"
      />
      <ClockAndRefreshTimer
        :now="props.now"
        :dwell-seconds="props.dwellSeconds"
        :remaining-seconds="props.remainingSeconds"
        :running="props.countdownRunning"
      />
    </div>
  </header>
</template>

<style scoped>
.rz-app-header {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: center;
  gap: var(--rz-spacing-lg);
  height: 72px;
}
.left {
  display: flex;
  align-items: baseline;
  gap: var(--rz-spacing-xs);
  min-width: 0;
  margin: 0;
  color: var(--rz-color-text-primary);
}
.type {
  font: var(--rz-tv-type-slide-title);
  /* Tracking is in em, so it is set where the 44 px font is, not on the parent. */
  letter-spacing: var(--rz-tv-tracking-slide-title);
  white-space: nowrap;
}
.location {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font: var(--rz-tv-type-slide-location);
  letter-spacing: var(--rz-tv-tracking-slide-title);
}
.right {
  justify-self: end;
  display: flex;
  align-items: center;
  gap: var(--rz-spacing-lg);
}
</style>
