<script setup lang="ts">
import StatusIcon from '../../components/status/StatusIcon.vue'

// Palette in context: not a slide, a quick read of how the tokens behave together.
// The chart is drawn 1:1 in canvas pixels so text sizes are real.
const bars = [453, 459, 433, 425, 402, 439, 454, 408, 446, 154]
const labels = ['11 AM', '12 PM', '1 PM', '2 PM', '3 PM', '4 PM', '5 PM', '6 PM', '7 PM', '8 PM']
const target = 440
const max = 500

const W = 1632
const H = 290
const baseline = 218
const plotH = 190
const slot = 138
const barW = 92
const y = (v: number) => baseline - (v / max) * plotH
const current = bars.length - 1
</script>

<template>
  <div class="layout">
    <section class="card hero">
      <span class="label">Units produced</span>
      <span class="hero-value">169</span>
      <span class="pill positive"><StatusIcon status="positive" :size="36" />6 ahead of plan</span>
    </section>

    <section class="card statuses">
      <div class="status-row positive"><StatusIcon status="positive" /><span>On target</span></div>
      <div class="status-row warning"><StatusIcon status="warning" /><span>Near target</span></div>
      <div class="status-row negative"><StatusIcon status="negative" /><span>Below target</span></div>
      <div class="status-row neutral"><StatusIcon status="neutral" /><span>No target</span></div>
    </section>

    <section class="card chart">
      <span class="label">Cases per hour</span>
      <svg :width="W" :height="H" :viewBox="`0 0 ${W} ${H}`" class="chart-svg">
        <line x1="0" :x2="slot * bars.length" :y1="baseline" :y2="baseline" stroke="var(--rz-color-data-axis)" stroke-width="2" />
        <g v-for="(v, i) in bars" :key="i">
          <rect
            v-if="i !== current"
            :x="i * slot + (slot - barW) / 2"
            :y="y(v)"
            :width="barW"
            :height="baseline - y(v)"
            rx="6"
            :fill="v < target ? 'var(--rz-color-status-negative-content)' : 'var(--rz-color-data-neutral)'"
          />
          <rect
            v-else
            :x="i * slot + (slot - barW) / 2 + 2"
            :y="y(v) + 2"
            :width="barW - 4"
            :height="baseline - y(v) - 2"
            rx="6"
            fill="color-mix(in srgb, var(--rz-color-data-neutral) 25%, transparent)"
            stroke="var(--rz-color-data-neutral)"
            stroke-width="4"
            stroke-dasharray="10 8"
          />
          <text
            v-if="i % 2 === 0"
            :x="i * slot + slot / 2"
            :y="baseline + 20"
            text-anchor="middle"
            class="tick"
          >{{ labels[i] }}</text>
        </g>
        <line
          x1="0"
          :x2="slot * bars.length + 16"
          :y1="y(target)"
          :y2="y(target)"
          stroke="var(--rz-color-text-secondary)"
          stroke-width="3"
          stroke-dasharray="14 10"
        />
        <text :x="slot * bars.length + 32" :y="y(target)" class="target-label">{{ target }}</text>
      </svg>
    </section>
  </div>
</template>

<style scoped>
.layout {
  position: absolute;
  inset: var(--rz-tv-safe-y) var(--rz-tv-safe-x);
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 456px 1fr;
  gap: var(--rz-tv-grid-gutter);
}
.card {
  background: var(--rz-color-surface-default);
  border-radius: var(--rz-radius-lg);
  padding: var(--rz-space-48);
  display: flex;
  flex-direction: column;
  gap: var(--rz-spacing-md);
  min-height: 0;
}
.label {
  font-size: var(--rz-tv-font-size-sm);
  line-height: var(--rz-line-height-snug);
  color: var(--rz-color-text-secondary);
  font-weight: var(--rz-font-weight-medium);
}
.hero {
  gap: var(--rz-spacing-sm);
}
.hero-value {
  font-size: var(--rz-tv-font-size-2xl);
  font-weight: var(--rz-font-weight-bold);
  line-height: var(--rz-line-height-tight);
  letter-spacing: -0.02em;
}
.pill {
  align-self: flex-start;
  display: inline-flex;
  align-items: center;
  gap: var(--rz-spacing-sm);
  padding: var(--rz-spacing-2xs) var(--rz-spacing-md);
  border-radius: var(--rz-radius-full);
  font-size: var(--rz-tv-font-size-sm);
  font-weight: var(--rz-font-weight-semibold);
}
.pill.positive {
  color: var(--rz-color-status-positive-content);
  background: color-mix(in srgb, var(--rz-color-status-positive-content) 14%, transparent);
}
.statuses {
  justify-content: center;
  font-size: var(--rz-tv-font-size-sm);
  font-weight: var(--rz-font-weight-semibold);
}
.status-row {
  display: flex;
  align-items: center;
  gap: var(--rz-spacing-md);
}
.status-row.positive { color: var(--rz-color-status-positive-content); }
.status-row.warning { color: var(--rz-color-status-warning-content); }
.status-row.negative { color: var(--rz-color-status-negative-content); }
.status-row.neutral { color: var(--rz-color-text-secondary); }
.chart {
  grid-column: 1 / -1;
}
.chart-svg {
  overflow: visible;
}
.tick,
.target-label {
  font-size: var(--rz-tv-font-size-sm);
  fill: var(--rz-color-text-secondary);
}
.tick {
  dominant-baseline: hanging;
}
.target-label {
  dominant-baseline: middle;
  font-weight: var(--rz-font-weight-semibold);
}
</style>
