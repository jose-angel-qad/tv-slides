<script setup lang="ts">
import ColorGuide from './ColorGuide.vue'
import ColorModePanel from './ColorModePanel.vue'
</script>

<template>
  <div class="page">
    <ColorGuide />
    <div class="panels">
      <ColorModePanel mode="dark" />
      <ColorModePanel mode="light" />
    </div>
  </div>
</template>

<style scoped>
.page {
  min-height: 100vh;
}
.panels {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(560px, 1fr));
  gap: var(--rz-spacing-md);
  padding: var(--rz-spacing-md);
}
</style>
