<script setup lang="ts">
import { computed } from 'vue'
import MaterialIcon, { type MaterialIconName } from '../icon/MaterialIcon.vue'
import StatusIcon from '../status/StatusIcon.vue'

// Inventory: "News item" (Content). One alert, chat or high five on the News slide.
// Type icon in a 72 px tile, then a line with the type in words and the time, then the text,
// which wraps (never cut, never scrolls, A11Y-15). Alerts use the warning status icon (they ask
// for attention); chats and high fives use outlined content icons in text/secondary.
export type NewsType = 'alert' | 'chat' | 'high-five'
const props = defineProps<{ type: NewsType; time: string; author?: string; text: string }>()
const LABEL: Record<NewsType, string> = { alert: 'Alert', chat: 'Chat', 'high-five': 'High five' }
const ICON: Record<Exclude<NewsType, 'alert'>, MaterialIconName> = { chat: 'chat', 'high-five': 'celebration' }
const meta = computed(() => [LABEL[props.type], props.author, props.time].filter(Boolean).join(' · '))
</script>

<template>
  <article class="rz-news-item">
    <div class="tile">
      <StatusIcon v-if="props.type === 'alert'" status="warning" :size="44" />
      <MaterialIcon v-else :name="ICON[props.type]" :size="44" />
    </div>
    <div class="content">
      <p class="meta">{{ meta }}</p>
      <p class="text">{{ props.text }}</p>
    </div>
  </article>
</template>

<style scoped>
.rz-news-item {
  display: grid;
  grid-template-columns: 72px minmax(0, 1fr);
  gap: var(--rz-spacing-md);
  align-items: start;
}
.tile {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 72px;
  height: 72px;
  border-radius: var(--rz-radius-md);
  background: var(--rz-color-surface-raised);
  color: var(--rz-color-text-secondary);
}
.content {
  display: flex;
  flex-direction: column;
  gap: var(--rz-spacing-3xs);
  min-width: 0;
}
.meta {
  margin: 0;
  font: var(--rz-tv-type-body);
  color: var(--rz-color-text-secondary);
}
.text {
  margin: 0;
  font: var(--rz-tv-type-status-band);
  color: var(--rz-color-text-primary);
}
</style>
