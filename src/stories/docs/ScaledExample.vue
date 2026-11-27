<script setup lang="ts">
import { computed, ref } from 'vue'
import { useElementSize } from '../../utils/useElementSize'

// Docs only: renders a TV component at its real canvas size and scales it to fit the page width.
const props = defineProps<{ width: number; height: number }>()
const box = ref<HTMLElement | null>(null)
const { width: boxW } = useElementSize(box)
const scale = computed(() => (boxW.value ? Math.min(1, boxW.value / props.width) : 1))
</script>

<template>
  <div ref="box" class="scaled" :style="{ height: `${props.height * scale}px` }">
    <div :style="{ width: `${props.width}px`, transform: `scale(${scale})`, transformOrigin: 'left top' }">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.scaled {
  overflow: hidden;
}
</style>
