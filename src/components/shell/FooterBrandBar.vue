<script setup lang="ts">
import { computed } from 'vue'
import RedzoneLogo from '../brand/RedzoneLogo.vue'
import patternUrl from '../../assets/redzone-pattern.svg'
import { FOOTER_PATTERN_ALPHA, FOOTER_TONE_BG, type FooterTone } from './footer'

// Inventory: "Footer brand bar" (Shell). Sits below the rounded slide sheet.
// Left: the customer's logo from Redzone Admin (Redzone logo as fallback).
// Right: "Powered by Redzone" and the app version.
// Tones, from Figma:
// - default: brand.background (Dark #111215, Light #313131), pattern at 1% to 3%
// - red ("red-footer"): brand.red, pattern at 6% to 12%
// - blue ("blue-footer"): brand.blue, pattern at 2% to 8%
// Logo and text always use brand.foreground. TvShell paints the same tone behind the sheet corners.
export interface FooterBrandBarProps {
  tone?: FooterTone
  logoSrc?: string
  logoAlt?: string
  appVersion: string
  build?: string
}
const props = withDefaults(defineProps<FooterBrandBarProps>(), { tone: 'default' })


const style = computed(() => {
  const [from, to] = FOOTER_PATTERN_ALPHA[props.tone]
  return {
    '--pattern': `url("${patternUrl}")`,
    '--footer-bg': FOOTER_TONE_BG[props.tone],
    '--pattern-from': `${from}%`,
    '--pattern-to': `${to}%`,
  }
})
</script>

<template>
  <footer class="rz-footer" :class="`tone-${props.tone}`" :style="style">
    <span class="pattern" aria-hidden="true" />
    <div class="customer">
      <img v-if="props.logoSrc" :src="props.logoSrc" :alt="props.logoAlt ?? ''" class="logo" />
      <RedzoneLogo v-else :height="40" mono />
    </div>
    <div class="meta">
      <span class="powered">
        Powered by
        <RedzoneLogo :height="24" mono />
      </span>
      <span class="dot" aria-hidden="true" />
      <span class="version">v{{ props.appVersion }}<template v-if="props.build"> ({{ props.build }})</template></span>
    </div>
  </footer>
</template>

<style scoped>
.rz-footer {
  position: relative;
  isolation: isolate;
  flex: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 92px;
  padding: 0 var(--rz-spacing-2xl);
  overflow: hidden;
  color: var(--rz-color-brand-foreground);
  background: var(--footer-bg);
}
.rz-footer > :not([aria-hidden]) {
  position: relative;
  z-index: 1;
}

/* Redzone pattern, positioned like the Figma "Union" layer (608, -147, 1321 x 385). */
.pattern {
  position: absolute;
  left: 608px;
  top: -147px;
  width: 1321px;
  height: 385px;
  background: linear-gradient(
    90deg,
    color-mix(in srgb, var(--rz-color-brand-foreground) var(--pattern-from), transparent),
    color-mix(in srgb, var(--rz-color-brand-foreground) var(--pattern-to), transparent)
  );
  -webkit-mask: var(--pattern) left top / auto 385px repeat-x;
  mask: var(--pattern) left top / auto 385px repeat-x;
}

.customer {
  display: flex;
  align-items: center;
  height: 48px;
}
.logo {
  display: block;
  max-height: 48px;
  max-width: 420px;
  object-fit: contain;
}
.meta {
  display: flex;
  align-items: center;
  gap: var(--rz-spacing-xs);
  font: var(--rz-tv-type-body);
}
.powered {
  display: inline-flex;
  align-items: center;
  gap: var(--rz-spacing-xs);
}
.dot {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: currentColor;
}
</style>
