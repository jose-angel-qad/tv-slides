<script setup lang="ts">
import { computed } from 'vue'
import EmptyState from '../../components/feedback/EmptyState.vue'
import type { CompanyHighlightData } from './types'

// Design plan (round 2). Proposal: the slide is not in the Knowledge Base and was only captured with
// no data. Assumed meaning (questions.md): a highlight written once by the company or a parent site
// and inherited by every site's TVs, with a headline, a short message and an optional image.
//
// Question (proposed): what is the company celebrating or asking of everyone?
// Answer (hero): the headline, the largest text on screen, with the image beside it.
//
// Must show (proposed), mapped:
// - Headline: Geist Bold 44 (slide title role; the KPI value sizes are for numbers), wraps.
// - Message: Inter 32 SemiBold (status band role, the largest reading text), wraps, never cut.
// - Who shared it and when: one quiet line under the message.
// - Image: contain fit with the card finish, like Company update; leaves the text full width when
//   there is none.
// - Nothing shared: an empty state sentence.
//
// Not shown:
// - Location in the header context: the highlight is company wide ("All areas").
//
// Layout options:
// a) Text in a titled card over the image (round 1): the card title repeated the slide type.
// b) Image full screen with the text over it: text over an unknown image fails contrast.
// c) One card: image on the left, headline and message on the right. Chosen: reads like a poster, and
//    the text always sits on a token surface.
const props = defineProps<{ data: CompanyHighlightData }>()
const d = computed(() => props.data)
const shared = computed(() =>
  [d.value.source, d.value.sharedAt ? new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(d.value.sharedAt) : '']
    .filter(Boolean)
    .join(' · '),
)
</script>

<template>
  <div class="rz-highlight">
    <article v-if="d.headline" class="card" :class="{ 'has-image': d.image }">
      <img v-if="d.image" class="image" :src="d.image.src" :alt="d.image.alt" />
      <div class="text">
        <h2 class="headline">{{ d.headline }}</h2>
        <p v-if="d.message" class="message">{{ d.message }}</p>
        <p class="shared">{{ shared }}</p>
      </div>
    </article>
    <section v-else class="card empty"><EmptyState title="Nothing shared yet" /></section>
  </div>
</template>

<style scoped>
.rz-highlight {
  position: absolute;
  inset: 0;
  padding: var(--rz-spacing-md) var(--rz-spacing-xl) var(--rz-spacing-xl);
  display: grid;
}
.card {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  align-items: center;
  gap: var(--rz-spacing-2xl);
  min-height: 0;
  padding: var(--rz-spacing-2xl);
  border: 1px solid var(--rz-color-border-subtle);
  border-radius: var(--rz-radius-lg);
  background: var(--rz-gradient-surface-default);
  box-shadow: var(--rz-elevation-card);
}
.card.has-image {
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
}
.empty {
  display: flex;
  padding: 0;
  background: var(--rz-color-surface-default);
}
.image {
  width: 100%;
  max-height: 100%;
  object-fit: contain;
  border-radius: var(--rz-radius-lg);
}
.text {
  display: flex;
  flex-direction: column;
  gap: var(--rz-spacing-md);
  min-width: 0;
}
.card:not(.has-image) .text {
  /* Text only: a readable line length, centered in the card. */
  justify-self: center;
  max-width: 1280px;
}
.headline {
  margin: 0;
  font: var(--rz-tv-type-slide-title);
  letter-spacing: var(--rz-tv-tracking-slide-title);
  color: var(--rz-color-text-primary);
}
.message {
  margin: 0;
  font: var(--rz-tv-type-status-band);
  color: var(--rz-color-text-primary);
}
.shared {
  margin: 0;
  font: var(--rz-tv-type-body);
  color: var(--rz-color-text-secondary);
}
</style>
