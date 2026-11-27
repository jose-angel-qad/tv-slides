<script setup lang="ts">
import { computed } from 'vue'
import T4Table from '../../templates/T4Table.vue'
import ChartCard from '../../components/card/ChartCard.vue'
import EmptyState from '../../components/feedback/EmptyState.vue'
import type { CompanyHighlightData } from './types'

// Proposal (definition pending, only captured empty). Assumed meaning: a highlight the company
// (or a parent site) shares with every site, inherited by this TV's slide set.
// Question (proposed): what is the company celebrating or asking of every site today?
// Headline as the hero, a short message and an optional image at its own aspect ratio.
// The brand stays in the footer; this screen may carry more of it (BRAND-03).
const props = defineProps<{ data: CompanyHighlightData }>()
const d = computed(() => props.data)
const date = computed(() =>
  d.value.sharedAt ? new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(d.value.sharedAt) : '',
)
</script>

<template>
  <T4Table>
    <ChartCard title="Company highlight">
      <template #actions>
        <span class="source">{{ d.source }}{{ date ? ` · ${date}` : '' }}</span>
      </template>
      <div v-if="d.headline" class="body" :class="{ 'with-image': d.image }">
        <div class="text">
          <h2 class="headline">{{ d.headline }}</h2>
          <p v-if="d.message" class="message">{{ d.message }}</p>
        </div>
        <img v-if="d.image" class="image" :src="d.image.src" :alt="d.image.alt" />
      </div>
      <EmptyState v-else icon="campaign" title="No company highlight right now" detail="Highlights shared by the company with every site show here." />
    </ChartCard>
  </T4Table>
</template>

<style scoped>
.source {
  font: var(--rz-tv-type-body);
  color: var(--rz-color-text-secondary);
}
.body {
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  align-items: center;
  gap: var(--rz-spacing-2xl);
}
.body.with-image {
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
}
.text {
  display: flex;
  flex-direction: column;
  gap: var(--rz-spacing-md);
}
.headline {
  margin: 0;
  font: var(--rz-tv-type-kpi-secondary-value);
  letter-spacing: var(--rz-tv-tracking-kpi-value);
  color: var(--rz-color-text-primary);
}
.message {
  margin: 0;
  font: var(--rz-tv-type-status-band);
  color: var(--rz-color-text-secondary);
}
.image {
  max-width: 100%;
  max-height: 100%;
  justify-self: center;
  object-fit: contain;
  border-radius: var(--rz-radius-md);
}
</style>
