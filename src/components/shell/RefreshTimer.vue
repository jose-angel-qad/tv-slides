<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'

// Time until the next slide, shown without numbers: a pie that empties clockwise
// inside a thin ring. With `running` it counts down on its own and loops
// (Storybook preview); in the app, the player drives `remaining` directly.
const props = withDefaults(
  defineProps<{ duration: number; remaining?: number; running?: boolean; size?: number }>(),
  { running: false, size: 44 },
)

const left = ref(props.remaining ?? props.duration)
watch(
  () => props.remaining,
  (v) => {
    if (v != null) left.value = v
  },
)

let raf = 0
let last = 0
function tick(t: number) {
  if (last) left.value = Math.max(0, left.value - (t - last) / 1000)
  if (left.value <= 0) left.value = props.duration
  last = t
  raf = requestAnimationFrame(tick)
}
onMounted(() => {
  const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  if (props.running && !reduce) raf = requestAnimationFrame(tick)
})
onBeforeUnmount(() => cancelAnimationFrame(raf))

const fraction = computed(() => Math.min(1, Math.max(0, left.value / props.duration)))
const c = computed(() => props.size / 2)
const ring = 3
const gap = 4
const pieR = computed(() => c.value - ring - gap)

// Wedge from 12 o'clock, clockwise, covering the remaining fraction.
const wedge = computed(() => {
  const f = fraction.value
  const r = pieR.value
  const cx = c.value
  if (f >= 0.9999) return null // full circle drawn separately
  const a = f * 2 * Math.PI
  const x = cx + r * Math.sin(a)
  const y = cx - r * Math.cos(a)
  const large = f > 0.5 ? 1 : 0
  return `M${cx},${cx} L${cx},${cx - r} A${r},${r} 0 ${large} 1 ${x},${y} Z`
})
const seconds = computed(() => Math.ceil(left.value))
</script>

<template>
  <div class="rz-countdown" role="timer" :aria-label="`Next slide in ${seconds} seconds`">
    <svg :width="size" :height="size" :viewBox="`0 0 ${size} ${size}`" aria-hidden="true">
      <circle :cx="c" :cy="c" :r="c - ring / 2" fill="none" stroke="var(--rz-color-text-secondary)" :stroke-width="ring" />
      <circle v-if="!wedge" :cx="c" :cy="c" :r="pieR" fill="var(--rz-color-text-secondary)" />
      <path v-else :d="wedge" fill="var(--rz-color-text-secondary)" />
    </svg>
  </div>
</template>

<style scoped>
.rz-countdown {
  flex: none;
  display: grid;
  place-items: center;
}
svg {
  display: block;
}
</style>
