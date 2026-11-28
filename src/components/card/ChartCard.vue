<script setup lang="ts">
// Inventory: "Chart card" (Card). Holds a chart: title on the left, legend (actions slot) on the right.
// Solid surface.default, padding 40, gap 24, radius 24, 1 px border.subtle, elevation/card.
// The title wraps (a product name is never cut, INFO-23); short titles render as before.
const props = defineProps<{ title: string }>()
</script>

<template>
  <section class="rz-chart-card">
    <header class="header">
      <h2 class="title">{{ props.title }}</h2>
      <div class="actions"><slot name="actions" /></div>
    </header>
    <div class="body"><slot /></div>
  </section>
</template>

<style scoped>
.rz-chart-card {
  display: flex;
  flex-direction: column;
  gap: var(--rz-spacing-md);
  min-height: 0;
  min-width: 0;
  padding: var(--rz-spacing-xl);
  overflow: hidden;
  border: 1px solid var(--rz-color-border-subtle);
  border-radius: var(--rz-radius-lg);
  background: var(--rz-color-surface-default);
  box-shadow: var(--rz-elevation-card);
}
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--rz-spacing-lg);
}
.title {
  margin: 0;
  font: var(--rz-tv-type-chart-title);
  letter-spacing: var(--rz-tv-tracking-card-title);
  color: var(--rz-color-text-primary);
  min-width: 0;
}
.actions {
  flex: none;
}
.actions:empty {
  display: none;
}
.body {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
}
</style>
