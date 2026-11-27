<script setup lang="ts">
import { computed } from 'vue'
import T4Table from '../../templates/T4Table.vue'
import ChartCard from '../../components/card/ChartCard.vue'
import PersonCard from '../../components/content/PersonCard.vue'
import EmptyState from '../../components/feedback/EmptyState.vue'
import type { WelcomeData } from './types'

// Question: who joined us this week?
// Names and photos are the hero, up to 3 people per page, with role, start date and a short
// introduction. A person without a photo gets a neutral placeholder. No new hires: a plain
// sentence (INFO-20). The brand stays in the footer (BRAND-01); this screen may carry more (BRAND-03).
const props = defineProps<{ data: WelcomeData }>()
const d = computed(() => props.data)
const started = (date: Date) => `Started ${new Intl.DateTimeFormat('en-US', { weekday: 'long', month: 'short', day: 'numeric' }).format(date)}`
</script>

<template>
  <T4Table>
    <ChartCard title="Welcome to the team">
      <template #actions>
        <span v-if="d.page && d.page.count > 1" class="page">Page {{ d.page.index }} of {{ d.page.count }}</span>
      </template>
      <div v-if="d.hires.length" class="grid">
        <PersonCard
          v-for="h in d.hires.slice(0, 3)"
          :key="h.id"
          :name="h.name"
          :role="h.role"
          :started="started(h.startedAt)"
          :intro="h.intro"
          :photo="h.photo"
        />
      </div>
      <EmptyState v-else icon="person" title="No new hires this week" detail="New team members show here during their first week." />
    </ChartCard>
  </T4Table>
</template>

<style scoped>
.grid {
  flex: 1;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  align-items: start;
  gap: var(--rz-spacing-md);
}
.page {
  font: var(--rz-tv-type-body);
  color: var(--rz-color-text-secondary);
}
</style>
