<script setup lang="ts">
import DocPage from '../docs/DocPage.vue'

// Spacing: 4 px base. Global numeric primitives, semantic t-shirt sizes on top.
const globals = [0, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96]
const semantic = [
  { name: '3xs', px: 4, use: 'Title to subtitle in a tile' },
  { name: '2xs', px: 8, use: 'Icon to text in the Status line; nav button gap; value to unit in the Stat tile' },
  { name: 'xs', px: 12, use: 'Icon to text in the Status band; legend swatch to label; slide type to location' },
  { name: 'sm', px: 16, use: 'KPI tile content gap; value to unit in the KPI tile; date to time in the clock' },
  { name: 'md', px: 24, use: 'Gap between cards; Stat tile content gap; chart card header to chart' },
  { name: 'lg', px: 32, use: 'KPI tile bottom padding; header groups; legend items' },
  { name: 'xl', px: 40, use: 'Card padding; Status band and footer horizontal padding; slide side margins' },
  { name: '2xl', px: 64, use: 'Footer brand bar horizontal padding' },
  { name: '3xl', px: 96, use: 'TV safe area, horizontal' },
]
</script>

<template>
  <DocPage
    title="Spacing"
    lead="A 4 px base scale for every product and platform. Every padding, gap and margin is a multiple of 4."
  >
    <h2>Layers</h2>
    <ul>
      <li><strong>Global</strong>, <code>--rz-space-{n}</code>: numeric primitives in px. Use them only to define semantic tokens.</li>
      <li><strong>Semantic</strong>, <code>--rz-spacing-{size}</code>: what components use. Each one aliases a global step.</li>
    </ul>
    <p>Global steps: <code v-for="g in globals" :key="g" style="margin-right: 8px">space/{{ g }}</code></p>

    <h2>Semantic scale</h2>
    <table>
      <thead><tr><th>Token</th><th>Value</th><th /><th>TV examples</th></tr></thead>
      <tbody>
        <tr v-for="s in semantic" :key="s.name">
          <td><strong>spacing/{{ s.name }}</strong><br /><code>--rz-spacing-{{ s.name }}</code></td>
          <td>{{ s.px }} px</td>
          <td>
            <span
              :style="{ display: 'inline-block', width: `var(--rz-spacing-${s.name})`, height: '16px', borderRadius: '2px', background: 'var(--rz-color-data-neutral)' }"
            />
          </td>
          <td>{{ s.use }}</td>
        </tr>
      </tbody>
    </table>

    <h2>Usage</h2>
    <ul>
      <li>Use semantic tokens in components. Use a global step directly only when no size name fits, and say why in a comment.</li>
      <li>Fixed component sizes (the 76 px Status band and footer, 56 px nav buttons, 380 px tiles) are dimensions, not spacing.</li>
      <li>When a value is a sum, write it from tokens. Example: the Stat tile bottom padding is <code>lg + 3xs</code> (36 px), which keeps its value on the KPI tile baseline.</li>
      <li>Chart geometry inside the SVG (label offsets centered on the target line) follows the 34 px label box, not the spacing scale.</li>
    </ul>

    <h2>TV examples</h2>
    <table>
      <thead><tr><th>Component</th><th>Spacing</th></tr></thead>
      <tbody>
        <tr><td>KPI tile, large</td><td>Content padding xl / xl / lg / xl (40 / 40 / 32 / 40), gap sm</td></tr>
        <tr><td>Stat tile</td><td>Content padding xl / xl / lg + 3xs / xl (40 / 40 / 36 / 40), gap md; footer padding 0 xl</td></tr>
        <tr><td>Status band</td><td>Padding 0 xl, gap xs, fixed height 76</td></tr>
        <tr><td>Status line</td><td>Gap 2xs</td></tr>
        <tr><td>Chart card</td><td>Padding xl, gap md; legend gap lg, item gap xs</td></tr>
        <tr><td>Slide header</td><td>Groups gap lg; title gap xs; nav buttons gap 2xs; clock gap sm</td></tr>
        <tr><td>T3 Hero + support</td><td>Padding md xl xl, gap md</td></tr>
      </tbody>
    </table>
  </DocPage>
</template>
