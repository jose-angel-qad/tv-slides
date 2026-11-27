<script setup lang="ts">
// T3 Hero + support: a hero card, up to three support cards, and a chart card.
// Lives inside TvShell, which owns the header and footer.
</script>

<template>
  <div class="rz-t3">
    <div class="hero"><slot name="hero" /></div>
    <div class="support"><slot name="support" /></div>
    <div v-if="$slots.chart" class="chart"><slot name="chart" /></div>
  </div>
</template>

<style scoped>
.rz-t3 {
  position: absolute;
  inset: 0;
  padding: var(--rz-spacing-md) var(--rz-spacing-xl) var(--rz-spacing-xl);
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  grid-template-rows: 380px minmax(0, 1fr);
  gap: var(--rz-spacing-md);
}
.hero {
  grid-column: 1;
  display: grid;
}
.support {
  grid-column: 2;
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: 430px;
  gap: var(--rz-spacing-md);
}
.chart {
  grid-column: 1 / -1;
  min-height: 0;
  display: grid;
}
</style>
