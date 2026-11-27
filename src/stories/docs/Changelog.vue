<script setup lang="ts">
import DocPage from './DocPage.vue'
</script>

<template>
  <DocPage title="Changelog" lead="Changes to Redzone TV foundations and components.">
    <h2>November 28, 2026: Overnight slides (pending approval)</h2>
    <ul>
      <li>Added Person card (Content). Used by Welcome.</li>
      <li>Added Media frame (Content). Used by Company update.</li>
      <li>Added News item (Content), Empty state message (Feedback) and the content icons campaign, chat, celebration, person, image and inbox (Icon, outlined). Used by News.</li>
      <li>Added Location table (Table), Status value (Status), Mini hourly bars (Data viz) and the T4 Table template. Used by Shift dashboard and the other multiple location slides.</li>
      <li>Added Step flow chart (Data viz): steps in process order with labeled WIP. Used by Line balance.</li>
      <li>Added Line chart (Data viz): one metric over time with labeled reference lines. Used by Counts.</li>
      <li>Added Bar list (Data viz) and the T2 List + support template.</li>
      <li>Added Progress bar (Data display): completed of planned with an optional pace marker. Used by Run speed.</li>
      <li>Hourly bar chart: new optional <code>format</code> and <code>tickFormat</code> props, so OEE and rates show their unit (84.2%). Counts keep the default.</li>
    </ul>

    <h2>November 28, 2026: Guidelines and figures</h2>
    <ul>
      <li>Added the Guidelines pages (Overview, Accessibility, Information design, Brand expression) in English and Spanish, with a Language switch in the Storybook toolbar.</li>
      <li>Added <code>--rz-tv-figures-proportional</code> and <code>--rz-tv-figures-tabular</code>, and the roles <code>--rz-tv-figures-clock-time</code> and <code>--rz-tv-figures-table</code>.</li>
      <li>Clock time now uses tabular figures (A11Y-05). Every other style stays proportional. Future tables use tabular figures on numeric columns.</li>
      <li>Added Noto Sans script fallbacks to the Geist and Inter font stacks.</li>
    </ul>

    <h2>November 27, 2026: Type variables and text styles</h2>
    <ul>
      <li>Added the Figma variable collection <strong>TV type</strong>: <code>font/family/{display, text}</code>, <code>font/weight/{regular, medium, semibold, bold}</code>, <code>font/size/{sm, md, lg, xl, 2xl}</code> (28, 32, 44, 104, 136) and <code>font/line-height/{2xs, xs, sm, md, lg, xl, 2xl}</code> (34, 36, 40, 48, 52, 104, 136). Code mirrors them as <code>--rz-tv-font-size-*</code> and <code>--rz-tv-line-height-*</code>.</li>
      <li>Added 16 Figma text styles bound to those variables, one per <code>--rz-tv-type-*</code> token. Every text layer in the components and the final slides uses one.</li>
      <li>Secondary KPI unit 36 / 43.2 to 32 / 40 (reuses the card title size). The 36 px size is gone.</li>
      <li>Primary KPI unit line height 52.8 to 52 (on the 4 px grid).</li>
      <li>Footer text 22 / 28 to 28 / 34; the footer inline logo 20 to 24 px. The 22 px style is gone.</li>
      <li>Merged identical styles: <code>context</code>, <code>axis</code>, <code>legend</code> and <code>footer</code> are now <code>body</code>; <code>axis-strong</code> is now <code>body-strong</code>.</li>
      <li>Removed the old <code>--rz-tv-font-size-*</code> values (44, 56, 80, 120, 200). The names now hold the new scale.</li>
      <li>Fixed: slide title tracking was computed on its parent (-0.64 px instead of -0.88 px). X-axis labels moved 5 px down to match Figma.</li>
      <li>Figures are now proportional in every style, in code and in Figma (Numbers: Proportional uppercase/lining). Values only change with the slide, so tabular figures added gaps without a benefit.</li>
      <li>Figma: the three Light final slides had a 1918 px sheet; it now fills 1920 px like the Dark ones.</li>
    </ul>

    <h2>November 26, 2026: Elevation and Storybook cleanup</h2>
    <ul>
      <li>Added <code>elevation/sheet/shadow</code> (Dark #000204 at 24%, Light #1A2440 at 12%) and the effect style <code>elevation/sheet</code> (0 4px 24px). The slide sheet uses it instead of a fixed color.</li>
      <li>In Figma, every card and sheet shadow now uses the <code>elevation/card</code> or <code>elevation/sheet</code> style. The loose shadows were replaced.</li>
      <li><code>elevation/card/small</code> and <code>/large</code> now have code syntax and are scoped to effects only.</li>
      <li>Removed Foundations, Palette variants (out of date) with its variant token files and generator script.</li>
      <li>Stories no longer come in Dark and Light pairs. The Theme switch in the Storybook toolbar controls the mode.</li>
    </ul>

    <h2>November 26, 2026: Run throughput refinements</h2>
    <p>Validated in Figma (TV Component library, final slides of November 26) and applied in code.</p>

    <h3>Spacing (breaking)</h3>
    <ul>
      <li>Spacing moves from an 8 px base to a <strong>4 px base</strong>. This replaces the earlier 8 px base decision.</li>
      <li>Added global primitives <code>space/0, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96</code> (<code>--rz-space-{n}</code>).</li>
      <li>Added semantic tokens <code>spacing/3xs</code> to <code>spacing/3xl</code> (<code>--rz-spacing-{size}</code>): 4, 8, 12, 16, 24, 32, 40, 64, 96.</li>
      <li>Removed the 8 px tokens <code>--rz-space-3xs</code> to <code>--rz-space-3xl</code>. Each use moved to the token with the same pixel value.</li>
      <li>Snapped to the grid: Stat tile bottom padding 37 to 36, Hourly bar value gap 14 to 12, Status band vertical padding 18 removed (fixed 76 px height, centered), x-axis row 52 to 56.</li>
    </ul>

    <h3>Color tokens</h3>
    <table>
      <thead><tr><th>Change</th><th>Token</th></tr></thead>
      <tbody>
        <tr><td>Renamed</td><td><code>color/status/positive</code> to <code>color/status/positive/content</code></td></tr>
        <tr><td>Renamed</td><td><code>color/status/warning</code> to <code>color/status/warning/content</code></td></tr>
        <tr><td>Renamed</td><td><code>color/status/negative-text</code> to <code>color/status/negative/content</code></td></tr>
        <tr><td>Removed</td><td><code>color/status/negative-fill</code> (bars and legend now use <code>negative/content</code>)</td></tr>
        <tr><td>Added</td><td><code>color/status/{positive, warning, negative}/fill</code> and <code>/on-fill</code></td></tr>
        <tr><td>Updated</td><td><code>positive/content</code>, <code>warning/content</code>, <code>negative/content</code> (Light #CC3820), <code>surface/raised</code> (now translucent), <code>data/neutral</code> (Light #5089F0)</td></tr>
      </tbody>
    </table>

    <h3>Typography</h3>
    <ul>
      <li>Added <code>--rz-font-family-text</code> (Inter). <code>--rz-font-family</code> is now an alias of it.</li>
      <li>Added the TV type scale as role tokens <code>--rz-tv-type-{role}</code> in the TV platform file.</li>
      <li>KPI value 160 to 136 (Geist Bold), Stat tile value 96 to 104 (Geist SemiBold). Axis, legend and footer text use Inter.</li>
    </ul>

    <h3>Components</h3>
    <ul>
      <li>Added: Status band, Chart legend item, Chart card.</li>
      <li>Removed: Trend arrow, Trend indicator, Panel container (no remaining uses).</li>
      <li>KPI tile, large: Status band replaces the status line. No badge.</li>
      <li>Stat tile: status moves to a 76 px footer on <code>surface/raised</code>. Prop <code>meta</code> renamed to <code>statusText</code>; added <code>showStatus</code>.</li>
      <li>Status icon: filled glyphs.</li>
      <li>Hourly bar: below-target bars use <code>negative/content</code>, with a filled octagon icon.</li>
      <li>Chart legend: Target swatch uses <code>text/secondary</code>.</li>
      <li>Slide header: configuration name and its divider removed. Prop <code>slideSetName</code> removed.</li>
    </ul>
  </DocPage>
</template>
