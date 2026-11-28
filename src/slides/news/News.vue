<script setup lang="ts">
import { computed } from 'vue'
import NewsItem from '../../components/content/NewsItem.vue'
import EmptyState from '../../components/feedback/EmptyState.vue'
import { formatTime } from '../../utils/format'
import type { NewsData } from './types'

// Design plan (round 2)
//
// Question: what happened recently that I should know? (guide, kept)
// Answer (hero): the latest items, newest first, each in its own row card that shares the page height,
// so four items fill the body and each reads from across the floor.
//
// Must show, mapped:
// - Latest items with their time: one row card per item, meta line "Alert · Quality · 7:40 PM".
// - Item type (alert, chat, high five): in words in the meta line and as the tile icon; alerts use the
//   warning status icon, chats and high fives outlined content icons.
// - Many items: pages of four ("Page 1 of 3" above the list, right aligned), never a scrolling ticker
//   (guide idea, A11Y-15).
//
// Not shown:
// - "Latest news" card title (round 1): it repeats the slide title.
// - Ticker (current product).
//
// Layout options:
// a) One titled card with a compact list (round 1): small text over a dead zone.
// b) A grid of item cards: reading order is unclear.
// c) One row card per item, filling the page. Chosen: order is top to bottom, text is large.
const props = defineProps<{ data: NewsData }>()
const d = computed(() => props.data)
const items = computed(() => d.value.items.slice(0, 4))
</script>

<template>
  <div class="rz-news">
    <template v-if="items.length">
      <p v-if="d.page.count > 1" class="page">Page {{ d.page.index }} of {{ d.page.count }}</p>
      <div class="list">
        <div v-for="i in items" :key="i.id" class="row">
          <NewsItem :type="i.type" :time="formatTime(i.at)" :author="i.author" :text="i.text" />
        </div>
      </div>
    </template>
    <section v-else class="empty"><EmptyState title="No news yet" /></section>
  </div>
</template>

<style scoped>
/* Rows share the page height (up to 4 per page) between 120 and 200 px. */
.rz-news {
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
.list {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  gap: var(--rz-spacing-xs);
}
.row {
  flex: 1 0 auto;
  min-height: 120px;
  max-height: 200px;
  display: flex;
  align-items: center;
  padding: var(--rz-spacing-md) var(--rz-spacing-xl);
  border: 1px solid var(--rz-color-border-subtle);
  border-radius: var(--rz-radius-lg);
  background: var(--rz-gradient-surface-default);
  box-shadow: var(--rz-elevation-card);
}
.row > * {
  flex: 1;
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
