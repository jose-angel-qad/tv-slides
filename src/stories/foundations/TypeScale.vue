<script setup lang="ts">
import DocPage from '../docs/DocPage.vue'

// Typography: families, the look vs read rule, the line-height rule and the TV type scale.
// Semantic layer: one text style per role. Figma text styles carry the same name.
const scale = [
  { role: 'Primary KPI value', style: 'kpi/primary-value', token: 'kpi-primary-value', family: 'Geist', weight: 'Bold', size: '2xl (136)', lh: '2xl (136)', tracking: '-2%', sample: '19,230' },
  { role: 'Primary KPI unit', style: 'kpi/primary-unit', token: 'kpi-primary-unit', family: 'Geist', weight: 'Medium', size: 'lg (44)', lh: 'lg (52)', tracking: '0', sample: 'of 22,900' },
  { role: 'Secondary KPI value', style: 'kpi/secondary-value', token: 'kpi-secondary-value', family: 'Geist', weight: 'SemiBold', size: 'xl (104)', lh: 'xl (104)', tracking: '-2%', sample: '4:42' },
  { role: 'Secondary KPI unit', style: 'kpi/secondary-unit', token: 'kpi-secondary-unit', family: 'Geist', weight: 'Medium', size: 'md (32)', lh: 'sm (40)', tracking: '0', sample: 'AM' },
  { role: 'Slide title (type)', style: 'slide/title', token: 'slide-title', family: 'Geist', weight: 'Bold', size: 'lg (44)', lh: 'md (48)', tracking: '-2%', sample: 'Run throughput' },
  { role: 'Slide title (location)', style: 'slide/location', token: 'slide-location', family: 'Geist', weight: 'Regular', size: 'lg (44)', lh: 'md (48)', tracking: '-2%', sample: 'Line 1' },
  { role: 'Clock time', style: 'clock/time', token: 'clock-time', family: 'Geist', weight: 'SemiBold', size: 'lg (44)', lh: 'lg (52)', tracking: '-1%', sample: '8:20 PM' },
  { role: 'Clock date', style: 'clock/date', token: 'clock-date', family: 'Geist', weight: 'Regular', size: 'sm (28)', lh: '2xs (34)', tracking: '0', sample: 'Wed, Nov 18' },
  { role: 'Card title', style: 'card/title', token: 'card-title', family: 'Geist', weight: 'Medium', size: 'md (32)', lh: 'sm (40)', tracking: '-1%', sample: 'Estimated finish' },
  { role: 'Chart card title', style: 'chart/title', token: 'chart-title', family: 'Geist', weight: 'SemiBold', size: 'md (32)', lh: 'sm (40)', tracking: '-1%', sample: 'Cases per hour' },
  { role: 'Chart value label', style: 'chart/value', token: 'chart-value', family: 'Geist', weight: 'SemiBold', size: 'md (32)', lh: 'xs (36)', tracking: '0', sample: '453' },
  { role: 'Chart target value', style: 'chart/target-value', token: 'chart-target-value', family: 'Geist', weight: 'SemiBold', size: 'sm (28)', lh: '2xs (34)', tracking: '0', sample: '440' },
  { role: 'Status band text', style: 'status/band', token: 'status-band', family: 'Inter', weight: 'SemiBold', size: 'md (32)', lh: 'sm (40)', tracking: '0', sample: '6 ahead of plan' },
  { role: 'Status line (badge) text', style: 'status/line', token: 'status-line', family: 'Inter', weight: 'Medium', size: 'sm (28)', lh: 'xs (36)', tracking: '0', sample: 'On schedule' },
  { role: 'Body: card subtitle, context, axis labels, legend, footer', style: 'body/default', token: 'body', family: 'Inter', weight: 'Regular', size: 'sm (28)', lh: '2xs (34)', tracking: '0', sample: '8h 22m left' },
  { role: 'Body strong: current x-axis tick (Now)', style: 'body/strong', token: 'body-strong', family: 'Inter', weight: 'SemiBold', size: 'sm (28)', lh: '2xs (34)', tracking: '0', sample: 'Now' },
]

// Global layer: Figma variables in the "TV type" collection, bound to every text style.
const sizes = [['sm', 28], ['md', 32], ['lg', 44], ['xl', 104], ['2xl', 136]]
const lineHeights = [['2xs', 34], ['xs', 36], ['sm', 40], ['md', 48], ['lg', 52], ['xl', 104], ['2xl', 136]]
</script>

<template>
  <DocPage
    title="Typography"
    lead="Two families, one rule for choosing between them, and the TV type scale. Families live in Foundations; the TV scale lives in the TV platform file (src/foundations/tv-type.css)."
  >
    <h2>Families</h2>
    <table>
      <thead><tr><th>Token</th><th>Family</th><th>Use for</th></tr></thead>
      <tbody>
        <tr>
          <td><code>--rz-font-family-display</code></td>
          <td style="font-family: var(--rz-font-family-display); font-size: 20px">Geist</td>
          <td>What people look at: KPI values with their units, the slide title, the clock, card titles and chart value labels.</td>
        </tr>
        <tr>
          <td><code>--rz-font-family-text</code></td>
          <td style="font-family: var(--rz-font-family-text); font-size: 20px">Inter</td>
          <td>What people read: context lines, status text, axis labels, the legend and the footer.</td>
        </tr>
      </tbody>
    </table>

    <h2>Rules</h2>
    <ul>
      <li><strong>Look vs read.</strong> If the viewer glances at it from across the floor (a number, a title), use display. If the viewer reads it as a sentence or label, use text. Card titles and chart value labels use display, matching Figma.</li>
      <li><strong>Line height is always greater than or equal to the font size.</strong> No cap-height trimming, so text never clips and rows align by line box.</li>
      <li><strong>Proportional figures by default.</strong> Values change only when the slide changes, never while it is on screen, so nothing shifts in front of the viewer. Proportional figures space large values evenly (no gap after a 1). In Figma, text styles use Numbers: Proportional uppercase/lining.</li>
      <li><strong>Tabular figures in two cases</strong> (Guidelines, A11Y-05): the clock, which changes every minute (<code>--rz-tv-figures-clock-time</code>), and numbers in table columns that people compare top to bottom (<code>--rz-tv-figures-table</code>). Any new table uses <code>font-variant-numeric: var(--rz-tv-figures-table)</code> on its numeric cells. In Figma, use Numbers: Monospace uppercase/lining for these.</li>
      <li>Letter spacing: KPI values and the slide title use -2% (<code>--rz-tv-letter-spacing-tight</code>); card and chart titles and the clock use -1% (<code>--rz-tv-letter-spacing-snug</code>). Tracking is in em, so set it on the element that has the font, never on a parent.</li>
      <li><strong>Reuse before adding.</strong> The scale has 5 sizes. 104 and 136 are reserved for KPI values. A new role picks an existing size and line height; it never adds a one-off size.</li>
    </ul>

    <h2>Global layer: sizes and line heights</h2>
    <p>
      These mirror the Figma variables in the <strong>TV type</strong> collection (<code>font/size/*</code>,
      <code>font/line-height/*</code>, <code>font/weight/*</code>, <code>font/family/*</code>). Use them only to define text styles.
      Letter spacing is not a Figma variable: a bound variable is applied in pixels, so each text style sets it as a percentage.
    </p>
    <table>
      <thead><tr><th>Size</th><th>CSS</th><th>px</th></tr></thead>
      <tbody>
        <tr v-for="[k, v] in sizes" :key="k"><td><code>font/size/{{ k }}</code></td><td><code>--rz-tv-font-size-{{ k }}</code></td><td>{{ v }}</td></tr>
      </tbody>
    </table>
    <table>
      <thead><tr><th>Line height</th><th>CSS</th><th>px</th></tr></thead>
      <tbody>
        <tr v-for="[k, v] in lineHeights" :key="k"><td><code>font/line-height/{{ k }}</code></td><td><code>--rz-tv-line-height-{{ k }}</code></td><td>{{ v }}</td></tr>
      </tbody>
    </table>

    <h2>Semantic layer: text styles</h2>
    <p>16 text styles. Each one is a Figma text style bound to the variables above and a token, <code>--rz-tv-type-{role}</code>, written as a <code>font</code> shorthand. Samples are at real size on the 1920 x 1080 canvas.</p>
    <table>
      <thead><tr><th>Role</th><th>Style and token</th><th>Family</th><th>Weight</th><th>Size</th><th>Line height</th><th>Tracking</th></tr></thead>
      <tbody>
        <template v-for="s in scale" :key="s.token">
          <tr>
            <td>{{ s.role }}</td>
            <td><strong>{{ s.style }}</strong><br /><code>--rz-tv-type-{{ s.token }}</code></td>
            <td>{{ s.family }}</td>
            <td>{{ s.weight }}</td>
            <td>{{ s.size }}</td>
            <td>{{ s.lh }}</td>
            <td>{{ s.tracking }}</td>
          </tr>
          <tr>
            <td colspan="7" style="border-top: 0; padding-bottom: 16px">
              <span
                :style="{ font: `var(--rz-tv-type-${s.token})`, whiteSpace: 'nowrap' }"
              >{{ s.sample }}</span>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </DocPage>
</template>
