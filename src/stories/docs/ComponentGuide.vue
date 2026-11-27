<script setup lang="ts">
import DocPage from './DocPage.vue'
import ScaledExample from './ScaledExample.vue'
import StatusBand from '../../components/status/StatusBand.vue'
import StatusIcon from '../../components/status/StatusIcon.vue'
import StatusLine from '../../components/status/StatusLine.vue'
import KpiTile from '../../components/card/KpiTile.vue'
import StatTile from '../../components/card/StatTile.vue'
import HourlyBarChart from '../../components/data-viz/HourlyBarChart.vue'
import ChartLegendItem from '../../components/data-viz/ChartLegendItem.vue'
import SlideHeader from '../../components/shell/SlideHeader.vue'
import { shellHeader } from '../../components/shell/mock'

// Component guidelines for the TV components refined in Figma on 26 Nov.
export type GuideId = 'status-band' | 'kpi-tile' | 'stat-tile' | 'status-icon' | 'hourly-bar' | 'slide-header'
defineProps<{ id: GuideId }>()

const at = (h: number) => new Date(2026, 10, 18, h)
const points = [453, 459, 446, 441, 402, 442, 454, 408, 446, 154].map((value, i) => ({ hour: at(11 + i), value }))
</script>

<template>
  <!-- Status band -->
  <DocPage
    v-if="id === 'status-band'"
    title="Status band"
    lead="Full-width feedback at the bottom of the primary KPI tile. It is the only feedback the primary KPI shows, and it is always visible."
  >
    <div class="example rz-tv">
      <ScaledExample :width="932" :height="260">
        <div style="display: grid; gap: 16px">
          <StatusBand status="positive" text="6 ahead of plan" />
          <StatusBand status="warning" text="100 behind plan" />
          <StatusBand status="negative" text="260 behind plan" />
        </div>
      </ScaledExample>
    </div>
    <h2>Anatomy</h2>
    <ul>
      <li>Full width, fixed height 76 px (the same as the Stat tile footer), content vertically centered.</li>
      <li>Horizontal padding <code>spacing/xl</code>, gap <code>spacing/xs</code> between icon and text.</li>
      <li>Status icon 40 px, filled. Text Inter SemiBold 32 / 40.</li>
      <li>Background <code>color/status/{status}/fill</code>; text and icon <code>color/status/{status}/on-fill</code>.</li>
    </ul>
    <h2>Props</h2>
    <table>
      <thead><tr><th>Prop</th><th>Type</th><th>Notes</th></tr></thead>
      <tbody>
        <tr><td><code>status</code></td><td><code>positive | warning | negative</code></td><td>No neutral variant: the band always states how the KPI is doing.</td></tr>
        <tr><td><code>text</code></td><td>string</td><td>One line, for example "6 ahead of plan".</td></tr>
      </tbody>
    </table>
    <h2>Usage</h2>
    <p class="do">Use only on the primary KPI (KPI tile, large), one band per slide.</p>
    <p class="dont">Do not use on secondary KPIs. They use the Status line in the Stat tile footer.</p>
  </DocPage>

  <!-- KPI tile, large -->
  <DocPage
    v-else-if="id === 'kpi-tile'"
    title="KPI tile, large"
    lead="The primary KPI: the answer to the slide's question. Larger than any other value on the slide, with the Status band as its only feedback."
  >
    <div class="example rz-tv">
      <ScaledExample :width="932" :height="380"><KpiTile title="Cases produced this run" subtitle="466DHR GOLD PACKS 11 OZ 12 CS" value="19,230" unit="of 22,900" band-status="positive" band-text="6 ahead of plan" /></ScaledExample>
    </div>
    <h2>Primary vs secondary KPI</h2>
    <table>
      <thead><tr><th /><th>KPI tile, large (primary)</th><th>Stat tile (secondary)</th></tr></thead>
      <tbody>
        <tr><td>Value</td><td>Geist Bold 136, unit Geist Medium 44</td><td>Geist SemiBold 104, unit Geist Medium 32</td></tr>
        <tr><td>Feedback</td><td>Status band, always visible, no badge</td><td>Status line (badge) in the footer, optional</td></tr>
        <tr><td>Per slide</td><td>One</td><td>Up to three</td></tr>
      </tbody>
    </table>
    <h2>Anatomy</h2>
    <ul>
      <li>Height 380 px, radius 24, clips content. Gradient top to bottom, <code>gradient/surface/start</code> to <code>gradient/surface/end</code>. Border 1 px <code>border/subtle</code>. Elevation <code>0 1px 2px elevation/card/small</code> and <code>0 12px 32px elevation/card/large</code>.</li>
      <li>Content: padding 40 / 40 / 32 / 40, gap <code>spacing/sm</code>. Title Geist Medium 32 / 40, subtitle Inter Regular 28 / 34.</li>
      <li>Value and optional unit share one baseline. When a long value does not fit, the value steps down (136, 120, 104, 88) instead of widening the card.</li>
      <li>Status band at the bottom, full bleed.</li>
    </ul>
    <h2>Props</h2>
    <table>
      <thead><tr><th>Prop</th><th>Type</th></tr></thead>
      <tbody>
        <tr><td><code>title</code>, <code>subtitle</code></td><td>string; subtitle optional</td></tr>
        <tr><td><code>value</code>, <code>unit</code></td><td>string; unit optional ("of 22,900")</td></tr>
        <tr><td><code>bandStatus</code>, <code>bandText</code></td><td><code>positive | warning | negative</code>, string</td></tr>
      </tbody>
    </table>
  </DocPage>

  <!-- Stat tile -->
  <DocPage
    v-else-if="id === 'stat-tile'"
    title="Stat tile"
    lead="A secondary KPI. Smaller than the primary KPI, with the Status line as its only feedback. Crew size indicator wraps it."
  >
    <div class="example rz-tv">
      <ScaledExample :width="884" :height="380">
        <div style="display: grid; grid-template-columns: 430px 430px; gap: 24px">
          <StatTile title="Estimated finish" subtitle="8h 22m left" value="4:42" unit="AM" status="positive" status-text="On schedule" />
          <StatTile title="Average crew" value="6.2" unit="people" :show-status="false" />
        </div>
      </ScaledExample>
    </div>
    <h2>Anatomy</h2>
    <ul>
      <li>Same height, radius, gradient, border and elevation as KPI tile, large.</li>
      <li>Content: padding 40 / 40 / 36 / 40, gap <code>spacing/md</code>. The 36 px bottom keeps the value on the KPI tile baseline.</li>
      <li>Footer: full width, fixed height 76 px, horizontal padding <code>spacing/xl</code>, background <code>surface/raised</code>, Status line vertically centered. The footer starts at the same height as the Status band, and both share one center line.</li>
    </ul>
    <h2>Props</h2>
    <table>
      <thead><tr><th>Prop</th><th>Type</th></tr></thead>
      <tbody>
        <tr><td><code>title</code>, <code>subtitle</code></td><td>string; subtitle optional</td></tr>
        <tr><td><code>value</code>, <code>unit</code></td><td>string; unit optional ("AM", "people")</td></tr>
        <tr><td><code>status</code>, <code>statusText</code></td><td>Status, string</td></tr>
        <tr><td><code>showStatus</code></td><td>boolean, default true. When false, the footer is hidden.</td></tr>
      </tbody>
    </table>
    <h2>Crew size indicator</h2>
    <p>Wraps Stat tile with the title "Average crew" and the unit "people". On target and above target are positive; below target is negative (octagon, line in <code>negative/content</code>).</p>
  </DocPage>

  <!-- Status icon -->
  <DocPage
    v-else-if="id === 'status-icon'"
    title="Status icon and Status line"
    lead="Filled Material Symbols, weight 600. Color is never the only signal: each status has its own shape."
  >
    <div class="example rz-tv" style="display: flex; gap: 40px; align-items: center">
      <StatusIcon status="positive" :size="56" label="Positive" />
      <StatusIcon status="warning" :size="56" label="Warning" />
      <StatusIcon status="negative" :size="56" label="Negative" />
      <StatusIcon status="neutral" :size="56" label="Neutral" />
    </div>
    <table>
      <thead><tr><th>Status</th><th>Glyph</th><th>Color</th></tr></thead>
      <tbody>
        <tr><td>Positive</td><td><code>check_circle</code>, filled</td><td><code>status/positive/content</code></td></tr>
        <tr><td>Warning</td><td><code>warning</code> (triangle), filled</td><td><code>status/warning/content</code></td></tr>
        <tr><td>Negative</td><td><code>dangerous</code> (octagon), filled</td><td><code>status/negative/content</code></td></tr>
        <tr><td>Neutral</td><td>Dash</td><td><code>text/secondary</code></td></tr>
      </tbody>
    </table>
    <p>Inside a Status band the icon uses <code>status/{status}/on-fill</code> (prop <code>tone="on-fill"</code>).</p>
    <h2>Status line (badge)</h2>
    <div class="example rz-tv" style="display: flex; flex-direction: column; gap: 16px">
      <StatusLine status="positive" text="On schedule" />
      <StatusLine status="warning" text="14m late" />
      <StatusLine status="negative" text="Below target 6.2" />
    </div>
    <ul>
      <li>Secondary KPIs only. Icon 36 px + text Inter Medium 28 / 36, gap <code>spacing/2xs</code>, one line.</li>
      <li>Positive: icon in <code>positive/content</code>, text in <code>text/secondary</code>. Warning and negative: icon and text in <code>{status}/content</code>.</li>
    </ul>
  </DocPage>

  <!-- Hourly bar -->
  <DocPage
    v-else-if="id === 'hourly-bar'"
    title="Hourly bar chart"
    lead="One metric over the shift's hours, with a dashed target line. Each bar is one hour."
  >
    <!-- Drawn at its real slide size (1760 x 280), scaled to fit the page. -->
    <div class="example rz-tv" style="background: var(--rz-color-surface-default)">
      <ScaledExample :width="1760" :height="280">
        <HourlyBarChart :points="points" :target="440" :current-index="9" :width="1760" :height="280" />
      </ScaledExample>
    </div>
    <table>
      <thead><tr><th>State</th><th>Bar</th><th>Value label</th></tr></thead>
      <tbody>
        <tr><td>On target</td><td><code>data/neutral</code></td><td>Geist SemiBold 32, <code>text/secondary</code></td></tr>
        <tr><td>Below target</td><td><code>status/negative/content</code></td><td>Negative Status icon (octagon) to the left, text in <code>negative/content</code></td></tr>
        <tr><td>In progress</td><td>Hatched <code>data/neutral</code></td><td><code>text/secondary</code>; tick reads "Now"</td></tr>
      </tbody>
    </table>
    <h2>Chart legend item</h2>
    <div class="example rz-tv">
      <ul style="display: flex; gap: 32px; margin: 0; padding: 0; list-style: none">
        <ChartLegendItem type="on-target" label="On target" />
        <ChartLegendItem type="below-target" label="Below target" />
        <ChartLegendItem type="in-progress" label="In progress" />
        <ChartLegendItem type="target" label="Target" />
      </ul>
    </div>
    <p>Swatches use the same tokens as the bars. The Target swatch uses <code>text/secondary</code>, like the target line. Labels are Inter Regular 28 / 34.</p>
  </DocPage>

  <!-- Slide header -->
  <DocPage
    v-else-if="id === 'slide-header'"
    title="Slide header"
    lead="The same header on every slide: what the slide is and where, then navigation and the time."
  >
    <!-- Drawn at its real slide size (1840 x 72), scaled to fit the page. -->
    <div class="example rz-tv">
      <ScaledExample :width="1840" :height="72">
        <SlideHeader v-bind="shellHeader" />
      </ScaledExample>
    </div>
    <ul>
      <li>One line, 72 px tall, two groups.</li>
      <li>Left: slide type (Geist Bold 44) and location (Geist Regular 44), same size and color, no separator. Example: <strong>Run throughput</strong> Line 1.</li>
      <li>Right: previous, settings and next buttons (56 px, <code>surface/raised</code>), then date (Geist 28), time (Geist SemiBold 44) and the refresh timer.</li>
      <li>The configuration name is not shown in the header. It lives only in Settings.</li>
    </ul>
  </DocPage>
</template>
