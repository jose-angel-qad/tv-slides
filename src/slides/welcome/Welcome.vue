<script setup lang="ts">
import { computed } from 'vue'
import PersonCard from '../../components/content/PersonCard.vue'
import EmptyState from '../../components/feedback/EmptyState.vue'
import type { WelcomeData } from './types'

// Design plan (round 2)
//
// Question: who joined us this week? (guide, kept)
// Answer (hero): the new hires, one card each with photo and name, filling the body (up to three per
// page). Content container: the people come from the system, so there is no positive or negative state.
//
// Must show, mapped:
// - Name and photo of each new hire: Person card, 240 px photo or a neutral placeholder, name in the
//   slide title role.
// - Short introduction: under the role and start date, wraps.
// - Many new hires: pages of three ("Page 1 of 2" above the cards).
//
// Not shown:
// - "Welcome to the team" card title (round 1): it repeats the slide title.
// - Older red wordmark (current product): the brand stays in the footer.
//
// Layout options:
// a) Cards inside one titled card (round 1): a title nobody needs and short cards over a dead zone.
// b) One hire per slide page: three new hires take three rotations.
// c) Person cards directly on the sheet, filling the height. Chosen: the people are the content.
const props = defineProps<{ data: WelcomeData }>()
const d = computed(() => props.data)
const hires = computed(() => d.value.hires.slice(0, 3))
const started = (date: Date) => `Started ${new Intl.DateTimeFormat('en-US', { weekday: 'long', month: 'short', day: 'numeric' }).format(date)}`
</script>

<template>
  <div class="rz-welcome">
    <template v-if="hires.length">
      <p v-if="d.page && d.page.count > 1" class="page">Page {{ d.page.index }} of {{ d.page.count }}</p>
      <div class="grid" :style="{ '--cols': hires.length }">
        <PersonCard
          v-for="h in hires"
          :key="h.id"
          :name="h.name"
          :role="h.role"
          :started="started(h.startedAt)"
          :intro="h.intro"
          :photo="h.photo"
        />
      </div>
    </template>
    <section v-else class="empty"><EmptyState icon="person" title="No new hires this week" /></section>
  </div>
</template>

<style scoped>
/* One hire takes a centered card two thirds wide; two or three share the width. */
.rz-welcome {
  position: absolute;
  inset: 0;
  padding: var(--rz-spacing-md) var(--rz-spacing-xl) var(--rz-spacing-xl);
  display: flex;
  flex-direction: column;
  gap: var(--rz-spacing-xs);
}
.page {
  margin: 0;
  text-align: end;
  font: var(--rz-tv-type-body);
  color: var(--rz-color-text-secondary);
}
.grid {
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: repeat(var(--cols), minmax(0, 1fr));
  gap: var(--rz-spacing-md);
}
.grid[style*='--cols: 1'] {
  grid-template-columns: minmax(0, 0.66fr);
  justify-content: center;
}
.empty {
  flex: 1;
  display: flex;
  border: 1px solid var(--rz-color-border-subtle);
  border-radius: var(--rz-radius-lg);
  background: var(--rz-color-surface-default);
  box-shadow: var(--rz-elevation-card);
}
</style>
