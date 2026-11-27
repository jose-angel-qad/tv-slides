<script setup lang="ts">
import Clock from './Clock.vue'
import RefreshTimer from './RefreshTimer.vue'

// Inventory: "Clock and refresh timer" (Shell). Date and time, then the time left on this slide.
const props = withDefaults(
  defineProps<{ now: Date; dwellSeconds: number; remainingSeconds?: number; running?: boolean }>(),
  { running: true },
)
</script>

<template>
  <div class="rz-clock-timer">
    <Clock :now="props.now" />
    <RefreshTimer
      :duration="props.dwellSeconds"
      :remaining="props.remainingSeconds"
      :running="props.running"
      :size="44"
    />
  </div>
</template>

<style scoped>
.rz-clock-timer {
  display: flex;
  align-items: center;
  gap: var(--rz-spacing-lg);
}
</style>
