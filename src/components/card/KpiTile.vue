<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import StatusBand from '../status/StatusBand.vue'
import type { FillStatus } from '../status/status'

// Inventory: "KPI tile, large" (Card). The primary KPI: the answer to the slide's question.
// Feedback is only the Status band, always visible at the bottom (no badge).
// Value Geist Bold 136 with an optional unit ("of 22,900") on the same baseline.
// The card never grows: when a long value does not fit the width, the value steps down
// (136, 120, 104, 88 px). Steps, not fluid shrink-to-fit, so the size does not jitter on
// every update. Values from 100 million up arrive compact ("123.4M").
const props = defineProps<{
  title: string
  subtitle?: string
  value: string
  unit?: string
  bandStatus: FillStatus
  bandText: string
}>()

const STEPS = [136, 120, 104, 88]
const size = ref(STEPS[0])
const body = ref<HTMLElement | null>(null)
const figure = ref<HTMLElement | null>(null)

async function fit() {
  if (!body.value || !figure.value) return
  for (const s of STEPS) {
    size.value = s
    await nextTick()
    if (figure.value.scrollWidth <= body.value.clientWidth) return
  }
}

let ro: ResizeObserver | undefined
onMounted(async () => {
  await document.fonts?.ready
  fit()
  ro = new ResizeObserver(() => fit())
  if (body.value) ro.observe(body.value)
})
onBeforeUnmount(() => ro?.disconnect())
watch(() => [props.value, props.unit], () => fit())
</script>

<template>
  <section class="rz-tile rz-kpi-tile">
    <div class="content">
      <div class="titles">
        <h2 class="title">{{ props.title }}</h2>
        <p v-if="props.subtitle" class="subtitle">{{ props.subtitle }}</p>
      </div>
      <div ref="body" class="body">
        <div ref="figure" class="figure">
          <span class="value" :style="{ fontSize: `${size}px` }">{{ props.value }}</span>
          <span v-if="props.unit" class="unit">{{ props.unit }}</span>
        </div>
      </div>
    </div>
    <StatusBand :status="props.bandStatus" :text="props.bandText" />
  </section>
</template>

<style scoped src="./tile.css"></style>
<style scoped>
.content {
  --pad-bottom: var(--rz-spacing-lg);
  --gap: var(--rz-spacing-sm);
}
.figure {
  gap: var(--rz-spacing-sm);
}
.value {
  font: var(--rz-tv-type-kpi-primary-value);
}
.unit {
  font: var(--rz-tv-type-kpi-primary-unit);
}
</style>
