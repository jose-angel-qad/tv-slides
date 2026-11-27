<script setup lang="ts">
import { computed } from 'vue'
import { LOCALE, formatTime } from '../../utils/format'

// Current date and time, locale aware.
const props = defineProps<{ now: Date }>()
const date = computed(() =>
  new Intl.DateTimeFormat(LOCALE, { weekday: 'short', month: 'short', day: 'numeric' }).format(props.now),
)
const time = computed(() => formatTime(props.now))
</script>

<template>
  <div class="rz-clock">
    <span class="date">{{ date }}</span>
    <span class="time">{{ time }}</span>
  </div>
</template>

<style scoped>
.rz-clock {
  display: flex;
  align-items: baseline;
  gap: var(--rz-spacing-sm);
  white-space: nowrap;
}
.date {
  font: var(--rz-tv-type-clock-date);
  color: var(--rz-color-text-secondary);
}
.time {
  font: var(--rz-tv-type-clock-time);
  letter-spacing: var(--rz-tv-tracking-clock-time);
  color: var(--rz-color-text-primary);
}
</style>
