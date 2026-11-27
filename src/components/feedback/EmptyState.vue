<script setup lang="ts">
import MaterialIcon, { type MaterialIconName } from '../icon/MaterialIcon.vue'

// Inventory: "Empty state message" (Feedback). One wording and position for every slide with no
// data yet (audit: small gray text that varied by slide). Centered in its container: an outlined
// icon (64 px, text/secondary), a plain sentence in the card title role, and an optional detail
// line in body. Empty is not zero (INFO-20): use this only when there is no data.
const props = withDefaults(defineProps<{ title: string; detail?: string; icon?: MaterialIconName }>(), { icon: 'inbox' })
</script>

<template>
  <div class="rz-empty-state">
    <MaterialIcon class="icon" :name="props.icon" :size="64" />
    <p class="title">{{ props.title }}</p>
    <p v-if="props.detail" class="detail">{{ props.detail }}</p>
  </div>
</template>

<style scoped>
.rz-empty-state {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--rz-spacing-xs);
  text-align: center;
}
.icon {
  color: var(--rz-color-text-secondary);
  margin-bottom: var(--rz-spacing-xs);
}
.title {
  margin: 0;
  font: var(--rz-tv-type-card-title);
  color: var(--rz-color-text-primary);
}
.detail {
  margin: 0;
  font: var(--rz-tv-type-body);
  color: var(--rz-color-text-secondary);
}
</style>
