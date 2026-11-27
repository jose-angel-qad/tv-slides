<script setup lang="ts">
import { computed } from 'vue'
import T4Table from '../../templates/T4Table.vue'
import ChartCard from '../../components/card/ChartCard.vue'
import NewsItem from '../../components/content/NewsItem.vue'
import EmptyState from '../../components/feedback/EmptyState.vue'
import { formatTime } from '../../utils/format'
import type { NewsData } from './types'

// Question: what happened recently that I should know?
// Items one page at a time instead of a scrolling ticker (design guide idea, A11Y-15): newest
// first, up to 4 per page, each with its type in words, the author and the time.
// With no items the slide explains it in a sentence (INFO-20, INFO-21).
const props = defineProps<{ data: NewsData }>()
const d = computed(() => props.data)
const items = computed(() => [...d.value.items].sort((a, b) => b.at.getTime() - a.at.getTime()).slice(0, 4))
</script>

<template>
  <T4Table>
    <ChartCard title="Latest news">
      <template #actions>
        <span v-if="d.page.count > 1" class="page">Page {{ d.page.index }} of {{ d.page.count }}</span>
      </template>
      <div v-if="items.length" class="list">
        <NewsItem v-for="i in items" :key="i.id" :type="i.type" :author="i.author" :time="formatTime(i.at)" :text="i.text" />
      </div>
      <EmptyState v-else title="No news yet" detail="Alerts, chats and high fives from the last 24 hours show here." />
    </ChartCard>
  </T4Table>
</template>

<style scoped>
.list {
  display: flex;
  flex-direction: column;
  gap: var(--rz-spacing-xl);
}
.page {
  font: var(--rz-tv-type-body);
  color: var(--rz-color-text-secondary);
}
</style>
