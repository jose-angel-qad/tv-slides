<script setup lang="ts">
// T4 Table: one full-width card for multiple location slides (a Location table, or location
// cards). Optional page indicator in the card header when locations need more than one page
// (INFO-09: never shrink to fit). Lives inside TvShell, which owns the header and footer.
</script>

<template>
  <div class="rz-t4">
    <slot />
  </div>
</template>

<style scoped>
.rz-t4 {
  position: absolute;
  inset: 0;
  padding: var(--rz-spacing-md) var(--rz-spacing-xl) var(--rz-spacing-xl);
  display: grid;
  min-height: 0;
}
</style>
