<script setup lang="ts">
import { ref, watch } from 'vue'
import EmptyState from '../feedback/EmptyState.vue'

// Inventory: "Company Update image frame" (Content). Shows an uploaded image or a rendered PDF page
// as large as its container allows, at its own aspect ratio (contain), centered, never cropped or
// stretched. The file itself carries the card finish: radius 24, 1 px border.subtle and
// elevation/card, with no padding or caption around it, so every pixel goes to the content.
// A multi-page PDF adds "Page 1 of 3" under the file; pages advance with the slide (A11Y-15).
// No file, loading and a file that cannot load each show a plain sentence on a card (INFO-20,
// INFO-21). Loading is static: nothing spins or loops (A11Y-13).
const props = defineProps<{
  src?: string
  alt?: string
  page?: { index: number; count: number }
  loading?: boolean
}>()
const failed = ref(false)
watch(() => props.src, () => (failed.value = false))
</script>

<template>
  <figure class="rz-media-frame">
    <div class="stage">
      <div v-if="props.loading" class="message">
        <EmptyState icon="image" title="Loading the update" />
      </div>
      <div v-else-if="!props.src" class="message">
        <EmptyState title="No company update to show" detail="Images and PDFs added in Redzone appear here." />
      </div>
      <div v-else-if="failed" class="message">
        <EmptyState icon="image" title="This update cannot be shown right now" detail="It appears as soon as the file loads." />
      </div>
      <img v-else :src="props.src" :alt="props.alt ?? ''" @error="failed = true" />
    </div>
    <figcaption v-if="props.src && !props.loading && !failed && props.page && props.page.count > 1" class="page">
      Page {{ props.page.index }} of {{ props.page.count }}
    </figcaption>
  </figure>
</template>

<style scoped>
.rz-media-frame {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--rz-spacing-sm);
  min-height: 0;
  margin: 0;
}
.stage {
  flex: 1;
  min-height: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
img {
  display: block;
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  border: 1px solid var(--rz-color-border-subtle);
  border-radius: var(--rz-radius-lg);
  box-shadow: var(--rz-elevation-card);
}
.message {
  align-self: stretch;
  flex: 1;
  display: flex;
  border: 1px solid var(--rz-color-border-subtle);
  border-radius: var(--rz-radius-lg);
  background: var(--rz-color-surface-default);
  box-shadow: var(--rz-elevation-card);
}
.page {
  font: var(--rz-tv-type-body);
  color: var(--rz-color-text-secondary);
}
</style>
