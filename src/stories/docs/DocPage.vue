<script setup lang="ts">
// Shared layout for documentation pages (Foundations, component guidelines, changelog).
// Renders outside the TV canvas (story parameter tvCanvas: false) and follows the theme toolbar.
defineProps<{ title: string; lead?: string }>()
</script>

<template>
  <article class="rz-doc">
    <header>
      <h1>{{ title }}</h1>
      <p v-if="lead" class="lead">{{ lead }}</p>
    </header>
    <slot />
  </article>
</template>

<style scoped>
.rz-doc {
  max-width: 1120px;
  margin: 0 auto;
  padding: var(--rz-spacing-2xl) var(--rz-spacing-lg);
  font-family: var(--rz-font-family-text);
  font-size: 16px;
  line-height: 24px;
  color: var(--rz-color-text-primary);
}
h1 {
  margin: 0 0 var(--rz-spacing-2xs);
  font-family: var(--rz-font-family-display);
  font-size: 40px;
  line-height: 48px;
  font-weight: 700;
  letter-spacing: -0.02em;
}
.lead {
  margin: 0 0 var(--rz-spacing-xl);
  max-width: 760px;
  font-size: 18px;
  line-height: 28px;
  color: var(--rz-color-text-secondary);
}
.rz-doc > :deep(h2) {
  margin: var(--rz-spacing-xl) 0 var(--rz-spacing-xs);
  font-family: var(--rz-font-family-display);
  font-size: 24px;
  line-height: 32px;
  font-weight: 600;
}
.rz-doc > :deep(h3) {
  margin: var(--rz-spacing-md) 0 var(--rz-spacing-2xs);
  font-size: 18px;
  line-height: 28px;
  font-weight: 600;
}
.rz-doc > :deep(p),
.rz-doc > :deep(ul) {
  margin: 0 0 var(--rz-spacing-sm);
  max-width: 820px;
}
.rz-doc > :deep(ul li) {
  margin-bottom: var(--rz-spacing-3xs);
}
.rz-doc :deep(code) {
  padding: 0 var(--rz-spacing-3xs);
  border-radius: 4px;
  font-family: ui-monospace, 'SF Mono', Menlo, monospace;
  font-size: 14px;
  background: var(--rz-color-surface-raised);
}
.rz-doc > :deep(table) {
  width: 100%;
  margin: 0 0 var(--rz-spacing-md);
  border-collapse: collapse;
  font-size: 14px;
  line-height: 20px;
}
.rz-doc > :deep(table th) {
  padding: var(--rz-spacing-2xs);
  text-align: left;
  font-weight: 500;
  color: var(--rz-color-text-secondary);
}
.rz-doc > :deep(table td) {
  padding: var(--rz-spacing-2xs);
  vertical-align: top;
  border-top: 1px solid var(--rz-color-border-subtle);
}
.rz-doc :deep(.chip) {
  display: inline-block;
  width: 24px;
  height: 24px;
  margin-right: var(--rz-spacing-2xs);
  vertical-align: middle;
  border-radius: 6px;
  box-shadow: inset 0 0 0 1px var(--rz-color-border-subtle);
}
.rz-doc > :deep(.example) {
  /* Live components set their own type; do not pass the doc line height into them. */
  line-height: normal;
  margin: 0 0 var(--rz-spacing-md);
  padding: var(--rz-spacing-md);
  overflow: hidden;
  border-radius: var(--rz-radius-lg);
  background: var(--rz-color-background-default);
  box-shadow: inset 0 0 0 1px var(--rz-color-border-subtle);
}
.rz-doc > :deep(.do),
.rz-doc > :deep(.dont) {
  padding-left: var(--rz-spacing-sm);
  border-left: 4px solid var(--rz-color-status-positive-content);
}
.rz-doc > :deep(.dont) {
  border-left-color: var(--rz-color-status-negative-content);
}
</style>
