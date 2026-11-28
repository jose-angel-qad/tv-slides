<script setup lang="ts">
import DocPage from '../docs/DocPage.vue'
import { DEFAULT_TOKENS, cssVarName } from '../../foundations/tokens'
import { CONTRAST_PAIRS, contrast, pairContrast } from '../../foundations/contrast'

// Color variables: roles, values per mode, the status rule and the validated contrast.
const ROLES: Record<string, string> = {
  'color.background.default': 'Slide sheet behind the cards',
  'color.surface.default': 'Chart card',
  'color.surface.raised': 'Stat tile footer and nav buttons. Translucent: tints what it sits on',
  'color.gradient.surface.start': 'Tile gradient, top',
  'color.gradient.surface.end': 'Tile gradient, bottom',
  'color.border.subtle': '1 px card and sheet border',
  'color.text.primary': 'Values, titles, slide header',
  'color.text.secondary': 'Context, units, axis, legend, positive status text',
  'color.data.neutral': 'On-target bars and in-progress hatching',
  'color.data.axis': 'Chart axis and gridlines',
  'color.status.positive.content': 'Positive icons and text on surfaces',
  'color.status.positive.fill': 'Positive Status band',
  'color.status.positive.on-fill': 'Text and icon on positive fill',
  'color.status.warning.content': 'Warning icons and text on surfaces',
  'color.status.warning.fill': 'Warning Status band',
  'color.status.warning.on-fill': 'Text and icon on warning fill',
  'color.status.negative.content': 'Negative icons and text on surfaces, below-target bars and legend swatch',
  'color.status.negative.fill': 'Negative Status band',
  'color.status.negative.on-fill': 'Text and icon on negative fill',
  'color.status.positive.subtle': 'Run status badge background, positive',
  'color.status.positive.subtle-border': 'Run status badge border, positive',
  'color.status.warning.subtle': 'Run status badge background, warning',
  'color.status.warning.subtle-border': 'Run status badge border, warning',
  'color.status.negative.subtle': 'Run status badge background, negative',
  'color.status.negative.subtle-border': 'Run status badge border, negative',
  'color.status.neutral.subtle': 'Run status badge background, neutral (content is text/secondary)',
  'color.status.neutral.subtle-border': 'Run status badge border, neutral',
  'color.brand.background': 'Footer brand bar, default tone',
  'color.brand.foreground': 'Footer text and logo',
  'color.brand.red': 'Footer brand bar, red tone',
  'color.brand.blue': 'Footer brand bar, blue tone',
  'elevation.card.small': 'Card shadow, 0 1px 2px',
  'elevation.card.large': 'Card shadow, 0 12px 32px',
  'elevation.sheet.shadow': 'Sheet shadow, 0 4px 24px (style elevation/sheet)',
}
const rows = Object.keys(DEFAULT_TOKENS.dark).map((k) => ({
  name: k.replace(/\./g, '/'),
  css: cssVarName(k),
  dark: DEFAULT_TOKENS.dark[k],
  light: DEFAULT_TOKENS.light[k],
  role: ROLES[k] ?? '',
}))

const ratio = (mode: 'dark' | 'light', i: number) => pairContrast(DEFAULT_TOKENS[mode], CONTRAST_PAIRS[i])
const gray = (mode: 'dark' | 'light') =>
  contrast(DEFAULT_TOKENS[mode]['color.data.neutral'], DEFAULT_TOKENS[mode]['color.status.negative.content'])
</script>

<template>
  <DocPage
    title="Color variables"
    lead="TV color tokens for the Dark and Light modes. Every color in a TV component is a token. Components never use hex values."
  >
    <h2>Status rule: content, fill, on-fill, subtle</h2>
    <p>Each status (positive, warning, negative) has these tokens. Neutral has only <code>subtle</code> and <code>subtle-border</code>; its content is <code>text/secondary</code>. Do not add more.</p>
    <ul>
      <li><code>content</code>: text and icons on surfaces, including <code>surface/raised</code>. Used by the Status line, the Status icon and below-target bars.</li>
      <li><code>fill</code>: emphasis backgrounds. Used only by the Status band on the primary KPI.</li>
      <li><code>on-fill</code>: text and icons on top of <code>fill</code>. Never use it anywhere else.</li>
      <li><code>subtle</code> and <code>subtle-border</code>: the soft tint and its 1 px border behind a Run status badge (secondary feedback). Text and icons on <code>subtle</code> use <code>content</code> and pass 4.5:1. Pending approval.</li>
    </ul>

    <h2>Translucent surface/raised</h2>
    <p>
      <code>color/surface/raised</code> is translucent on purpose: white at 8% in Dark and #1A2440 at 5% in Light.
      It tints whatever it sits on, so the Stat tile footer reads as a step above the tile gradient and the nav
      buttons read as a step above the header. Contrast on it is measured after compositing it over
      <code>gradient/surface/end</code>, the color it sits on in the tile footer.
    </p>

    <h2>Elevation</h2>
    <p>Shadows are effect styles whose colors are mode tokens, so they change between Dark and Light.</p>
    <table>
      <thead><tr><th>Style</th><th>CSS</th><th>Shadows</th><th>Use</th></tr></thead>
      <tbody>
        <tr><td><code>elevation/card</code></td><td><code>--rz-elevation-card</code></td><td>0 1px 2px <code>elevation/card/small</code>, 0 12px 32px <code>elevation/card/large</code></td><td>KPI tile, Stat tile, Chart card</td></tr>
        <tr><td><code>elevation/sheet</code></td><td><code>--rz-elevation-sheet</code></td><td>0 4px 24px <code>elevation/sheet/shadow</code></td><td>Slide sheet (header and body) above the footer brand bar</td></tr>
      </tbody>
    </table>

    <h2>Tokens</h2>
    <table>
      <thead>
        <tr><th>Token</th><th>Dark</th><th>Light</th><th>Role</th></tr>
      </thead>
      <tbody>
        <tr v-for="r in rows" :key="r.name">
          <td><strong>{{ r.name }}</strong><br /><code>{{ r.css }}</code></td>
          <td><span class="chip rz-tv" data-theme="dark" :style="{ background: `var(${r.css})` }" />{{ r.dark }}</td>
          <td><span class="chip rz-tv" data-theme="light" :style="{ background: `var(${r.css})` }" />{{ r.light }}</td>
          <td>{{ r.role }}</td>
        </tr>
      </tbody>
    </table>

    <h2>Validated contrast</h2>
    <table>
      <thead>
        <tr><th>Check</th><th>Dark</th><th>Light</th><th>Minimum</th></tr>
      </thead>
      <tbody>
        <tr v-for="(p, i) in CONTRAST_PAIRS" :key="p.fg + p.bg">
          <td>{{ p.fg }} on {{ p.bg }}<template v-if="p.over"> over {{ p.over }}</template> ({{ p.use }})</td>
          <td>{{ ratio('dark', i)?.toFixed(2) }}:1</td>
          <td>{{ ratio('light', i)?.toFixed(2) }}:1</td>
          <td>{{ p.min }}:1</td>
        </tr>
        <tr>
          <td>Grayscale separation, data/neutral vs negative/content bars (shape and label carry the difference)</td>
          <td>{{ gray('dark').toFixed(2) }}:1</td>
          <td>{{ gray('light').toFixed(2) }}:1</td>
          <td>Informational</td>
        </tr>
      </tbody>
    </table>
    <p>Summary: on-fill text on fill is 5.2:1 to 7.1:1 in both modes. Status content text is at least 4.5:1 on surfaces and on surface/raised. Chart bars are at least 3:1 against the card. Run <code>npm run tokens:check</code> to verify.</p>
  </DocPage>
</template>
