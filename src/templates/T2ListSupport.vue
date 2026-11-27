<script setup lang="ts">
// T2 List + support: one main card on the left (a ranked list or a chart that is the answer)
// and up to two support tiles stacked on the right, at the same 430 px width as T3.
// Lives inside TvShell, which owns the header and footer.
</script>

<template>
  <div class="rz-t2">
    <div class="main"><slot name="main" /></div>
    <div class="support"><slot name="support" /></div>
  </div>
</template>

<style scoped>
.rz-t2 {
  position: absolute;
  inset: 0;
  padding: var(--rz-spacing-md) var(--rz-spacing-xl) var(--rz-spacing-xl);
  display: grid;
  grid-template-columns: minmax(0, 1fr) 430px;
  gap: var(--rz-spacing-md);
}
.main {
  min-height: 0;
  display: grid;
}
.support {
  display: grid;
  grid-auto-rows: 380px;
  align-content: start;
  gap: var(--rz-spacing-md);
}
</style>
