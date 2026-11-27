<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import type { Mode } from '../../foundations/tokens'

// Fixed 1920 x 1080 canvas. Scales down to fit its container; never reflows.
const props = withDefaults(defineProps<{ theme?: Mode; showSafeArea?: boolean }>(), {
  theme: 'dark',
  showSafeArea: false,
})

const WIDTH = 1920
const HEIGHT = 1080
const frame = ref<HTMLElement | null>(null)
const scale = ref(1)
let observer: ResizeObserver | undefined

function fit() {
  const el = frame.value
  if (!el) return
  scale.value = Math.min(el.clientWidth / WIDTH, el.clientHeight / HEIGHT, 1)
}

onMounted(() => {
  fit()
  observer = new ResizeObserver(fit)
  if (frame.value) observer.observe(frame.value)
})
onBeforeUnmount(() => observer?.disconnect())
</script>

<template>
  <div ref="frame" class="rz-tv-frame" :data-theme="props.theme">
    <div
      class="rz-tv rz-tv-canvas"
      :data-theme="props.theme"
      :style="{ transform: `scale(${scale})` }"
    >
      <slot />
      <div v-if="props.showSafeArea" class="rz-tv-safe-area" aria-hidden="true" />
    </div>
  </div>
</template>

<style scoped>
.rz-tv-frame {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--rz-color-background-default);
}
.rz-tv-canvas {
  position: relative;
  flex: none;
  width: var(--rz-tv-canvas-width);
  height: var(--rz-tv-canvas-height);
  overflow: hidden;
  transform-origin: center center;
}
.rz-tv-safe-area {
  position: absolute;
  inset: var(--rz-tv-safe-y) var(--rz-tv-safe-x);
  outline: 2px dashed color-mix(in srgb, var(--rz-color-status-warning-content) 70%, transparent);
  pointer-events: none;
}
</style>
