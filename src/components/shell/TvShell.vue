<script setup lang="ts">
import SlideHeader, { type SlideHeaderProps } from './SlideHeader.vue'
import FooterBrandBar, { type FooterBrandBarProps } from './FooterBrandBar.vue'
import { FOOTER_TONE_BG } from './footer'

// App chrome around every slide.
// The header and the slide body share one "sheet" (background.default) with rounded bottom
// corners and a soft shadow. The footer brand bar sits below it on brand.background.
// In Figma the footer is a layer behind everything; here it is a sibling below the sheet,
// which renders the same and keeps the footer in normal flow.
const props = defineProps<{ header: SlideHeaderProps; footer: FooterBrandBarProps }>()
</script>

<template>
  <div class="rz-shell" :style="{ background: FOOTER_TONE_BG[props.footer.tone ?? 'default'] }">
    <div class="sheet">
      <div class="header"><SlideHeader v-bind="props.header" /></div>
      <main class="body"><slot /></main>
    </div>
    <FooterBrandBar v-bind="props.footer" />
  </div>
</template>

<style scoped>
.rz-shell {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
}
.sheet {
  position: relative;
  z-index: 1;
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  background: var(--rz-color-background-default);
  border-radius: 0 0 60px 60px;
  /* Inside stroke on left, right and bottom (like Figma, no layout shift), then elevation/sheet. */
  box-shadow:
    inset 1px 0 0 var(--rz-color-border-subtle),
    inset -1px 0 0 var(--rz-color-border-subtle),
    inset 0 -1px 0 var(--rz-color-border-subtle),
    var(--rz-elevation-sheet);
}
.header {
  padding: var(--rz-spacing-md) var(--rz-spacing-xl) 0;
}
.body {
  position: relative;
  flex: 1;
  min-height: 0;
}
</style>
