<script setup lang="ts">
import MediaFrame from '../../components/content/MediaFrame.vue'
import type { CompanyUpdateData } from './types'

// Design plan (round 2)
//
// Question: what is the company sharing today?
// Answer (hero): the attached image or PDF page, as large as the body allows.
// Slide type: content container. The content comes from an attached file, so the slide has no
// positive or negative state; it has Landscape, Portrait, Multi-page PDF, No content and Loading.
//
// Must show, mapped:
// - The image or PDF, as large as possible: Media frame, contain fit, no padding around the file.
//
// Not shown:
// - Card padding and the caption row (round 1): they took about 120 px from the file. The update's
//   name moves to the header context, where the current product shows it.
// - Location ("All areas", round 1): an update is not about a location.
// - Negative "file cannot load" story (round 1): not a slide state. The frame still says so in a
//   sentence if it happens (INFO-21).
// - Spinner (current product): static "Loading the update" instead (A11Y-13).
//
// Layout options:
// a) File inside a titled card (round 1): the card frame and caption shrink the file.
// b) File full bleed on the sheet, edge to edge: largest, but a portrait file or one with a white
//    background loses its edge and the slide stops looking like the set.
// c) File alone, centered at its own aspect ratio, with the card radius, border and elevation on
//    the file itself. Chosen: nearly as large as (b), and it keeps the set's card finish.
const props = defineProps<{ data: CompanyUpdateData }>()
</script>

<template>
  <div class="rz-company-update">
    <MediaFrame :src="props.data.src" :alt="props.data.alt" :page="props.data.page" :loading="props.data.loading" />
  </div>
</template>

<style scoped>
.rz-company-update {
  position: absolute;
  inset: 0;
  padding: var(--rz-spacing-md) var(--rz-spacing-xl) var(--rz-spacing-xl);
  display: grid;
  min-height: 0;
}
</style>
