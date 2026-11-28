<script setup lang="ts">
import { ref } from 'vue'
import MaterialIcon from '../icon/MaterialIcon.vue'

// Inventory: "Welcome info bar" (Content). One new hire on the Welcome slide: photo (or a neutral
// placeholder with the person icon when there is none), name, role and team, start date and a
// short introduction. Text wraps; nothing is cut. Card frame like Chart card.
// Fills the height it is given, content centered. Fixed geometry: photo 240 px circle.
const props = defineProps<{ name: string; role: string; started: string; intro?: string; photo?: string }>()
const failed = ref(false)
</script>

<template>
  <article class="rz-person-card">
    <img v-if="props.photo && !failed" class="photo" :src="props.photo" :alt="props.name" @error="failed = true" />
    <div v-else class="photo placeholder" aria-hidden="true"><MaterialIcon name="person" :size="112" /></div>
    <div class="text">
      <h2 class="name">{{ props.name }}</h2>
      <p class="role">{{ props.role }}</p>
      <p class="started">{{ props.started }}</p>
    </div>
    <p v-if="props.intro" class="intro">{{ props.intro }}</p>
  </article>
</template>

<style scoped>
.rz-person-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--rz-spacing-md);
  min-width: 0;
  padding: var(--rz-spacing-xl);
  text-align: center;
  border: 1px solid var(--rz-color-border-subtle);
  border-radius: var(--rz-radius-lg);
  background: var(--rz-gradient-surface-default);
  box-shadow: var(--rz-elevation-card);
}
.photo {
  flex: none;
  width: 240px;
  height: 240px;
  border-radius: var(--rz-radius-full);
  object-fit: cover;
}
.placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--rz-color-surface-raised);
  color: var(--rz-color-text-secondary);
}
.text {
  display: flex;
  flex-direction: column;
  gap: var(--rz-spacing-3xs);
}
.name {
  margin: 0;
  font: var(--rz-tv-type-slide-title);
  letter-spacing: var(--rz-tv-tracking-slide-title);
  color: var(--rz-color-text-primary);
}
.role {
  margin: 0;
  font: var(--rz-tv-type-body-strong);
  color: var(--rz-color-text-primary);
}
.started {
  margin: 0;
  font: var(--rz-tv-type-body);
  color: var(--rz-color-text-secondary);
}
.intro {
  margin: 0;
  font: var(--rz-tv-type-body);
  color: var(--rz-color-text-secondary);
}
</style>
