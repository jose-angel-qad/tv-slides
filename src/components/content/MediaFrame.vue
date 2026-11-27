<script setup lang="ts">
import { ref, watch } from 'vue'
import EmptyState from '../feedback/EmptyState.vue'

// Inventory: "Company Update image frame" (Content). Shows an uploaded image or a PDF page as
// large as possible at its own aspect ratio (object-fit: contain), centered on surface/default
// inside the slide's card, never cropped or stretched. A multi-page PDF shows "Page 1 of 3" in the
// caption row; pages advance with the slide, not by scrolling (A11Y-15). If the file cannot load,
// the frame says so in a sentence (INFO-21) instead of a broken image.
const props = defineProps<{ src: string; alt: string; title?: string; page?: { index: number; count: number } }>()
const failed = ref(false)
watch(() => props.src, () => (failed.value = false))
</script>

<template>
  <figure class="rz-media-frame">
    <figcaption v-if="props.title || props.page" class="caption">
      <span class="title">{{ props.title }}</span>
      <span v-if="props.page && props.page.count > 1" class="page">Page {{ props.page.index }} of {{ props.page.count }}</span>
    </figcaption>
    <div class="media">
      <img v-if="!failed" :src="props.src" :alt="props.alt" @error="failed = true" />
      <EmptyState v-else icon="image" title="This update cannot be shown right now" detail="It will appear as soon as the file loads." />
    </div>
  </figure>
</template>

<style scoped>
.rz-media-frame {
  display: flex;
  flex-direction: column;
  gap: var(--rz-spacing-md);
  min-height: 0;
  margin: 0;
  padding: var(--rz-spacing-xl);
  border: 1px solid var(--rz-color-border-subtle);
  border-radius: var(--rz-radius-lg);
  background: var(--rz-color-surface-default);
  box-shadow: var(--rz-elevation-card);
}
.caption {
  display: flex;
  justify-content: space-between;
  gap: var(--rz-spacing-lg);
}
.title {
  font: var(--rz-tv-type-chart-title);
  letter-spacing: var(--rz-tv-tracking-card-title);
  color: var(--rz-color-text-primary);
}
.page {
  font: var(--rz-tv-type-body);
  color: var(--rz-color-text-secondary);
  white-space: nowrap;
}
.media {
  flex: 1;
  min-height: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
img {
  display: block;
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  border-radius: var(--rz-radius-md);
}
</style>
