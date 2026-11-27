<script setup lang="ts">
import StatusLine from '../status/StatusLine.vue'
import type { Status } from '../status/status'

// Inventory: "Stat tile" (Card). A secondary KPI: smaller value, feedback only as the Status line
// (badge) in a 76 px Footer on color/surface/raised. Same frame as "KPI tile, large", so the
// footer starts at the same height as the Status band and both share one center line.
// Extra context ("8h 22m left") goes in the subtitle under the title.
const props = withDefaults(
  defineProps<{
    title: string
    subtitle?: string
    value: string
    unit?: string
    status?: Status
    statusText?: string
    showStatus?: boolean
  }>(),
  { showStatus: true },
)
</script>

<template>
  <section class="rz-tile rz-stat-tile">
    <div class="content">
      <div class="titles">
        <h2 class="title">{{ props.title }}</h2>
        <p v-if="props.subtitle" class="subtitle">{{ props.subtitle }}</p>
      </div>
      <div class="body">
        <div class="figure">
          <span class="value">{{ props.value }}</span>
          <span v-if="props.unit" class="unit">{{ props.unit }}</span>
        </div>
      </div>
    </div>
    <div v-if="props.showStatus && props.statusText" class="footer">
      <StatusLine :status="props.status" :text="props.statusText" />
    </div>
  </section>
</template>

<style scoped src="./tile.css"></style>
<style scoped>
.content {
  /*
   * 36 px bottom (lg + 3xs) puts the 104 px value on the same baseline as the 136 px KPI value.
   * Figma uses 37; snapped to the 4 px grid, within 1 px of Figma.
   */
  --pad-bottom: calc(var(--rz-spacing-lg) + var(--rz-spacing-3xs));
  --gap: var(--rz-spacing-md);
}
.figure {
  gap: var(--rz-spacing-2xs);
}
.value {
  font: var(--rz-tv-type-kpi-secondary-value);
}
.unit {
  font: var(--rz-tv-type-kpi-secondary-unit);
}
.footer {
  flex: none;
  display: flex;
  align-items: center;
  height: 76px;
  padding: 0 var(--rz-spacing-xl);
  background: var(--rz-color-surface-raised);
}
</style>
