<script setup lang="ts">
import MaterialIcon from '../icon/MaterialIcon.vue'
// Slide controls: previous, settings, next ("Nav button" in Figma). 56 px round buttons on
// color/surface/raised (translucent, so it tints the header background).
// Focusable for the Apple TV remote and Windows keyboard.
const emit = defineEmits<{ prev: []; next: []; settings: [] }>()
</script>

<template>
  <nav class="rz-slide-nav" aria-label="Slide navigation">
    <button type="button" class="ctrl" aria-label="Previous slide" @click="emit('prev')">
      <MaterialIcon name="chevron_left" :size="32" />
    </button>
    <button type="button" class="ctrl" aria-label="Slide set settings" @click="emit('settings')">
      <MaterialIcon name="settings" :size="28" />
    </button>
    <button type="button" class="ctrl" aria-label="Next slide" @click="emit('next')">
      <MaterialIcon name="chevron_right" :size="32" />
    </button>
  </nav>
</template>

<style scoped>
.rz-slide-nav {
  flex: none;
  display: flex;
  gap: var(--rz-spacing-2xs);
}
.ctrl {
  flex: none;
  display: grid;
  place-items: center;
  width: 56px;
  height: 56px;
  padding: 0;
  border: 0;
  border-radius: var(--rz-radius-full);
  color: var(--rz-color-text-primary);
  background: var(--rz-color-surface-raised);
  cursor: pointer;
}
.ctrl:hover,
.ctrl:focus-visible {
  outline: none;
  color: var(--rz-color-background-default);
  background: var(--rz-color-text-primary);
}
.ctrl:focus-visible {
  box-shadow: 0 0 0 4px color-mix(in srgb, var(--rz-color-data-neutral) 60%, transparent);
}
</style>
