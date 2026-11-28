<script setup lang="ts">
import StatusIcon from '../status/StatusIcon.vue'
import { STATUS_CONTENT_COLOR, type Status } from '../status/status'

// Inventory: "Fact card" (Card). Two to four secondary facts in one card, next to a hero tile, when
// each fact is a value plus one line of context (OEE and its target, cycle time and units per hour,
// quality and reworked units). One card instead of a row of Stat tiles: the facts read as one group
// and the hero keeps its width.
// Same frame as the tiles: 380 px tall (fills its grid cell), gradient surface, 1 px border/subtle,
// radius/lg, elevation/card. Rows split the height evenly, separated by space only (BRAND-08). Row: label in Inter 28 (body, text/secondary); value in Geist Medium 44 (KPI primary
// unit role) with its context after it in Inter 28 (body, text/secondary).
// Status economy: a fact shows a status only when it needs attention (warning or negative), with the
// icon before the value and the value in status/{status}/content. On-target facts stay neutral.
export interface Fact {
  label: string
  value: string
  /** Context after the value, for example "Target 80%" or "35.3 units/h". */
  detail?: string
  status?: Status
  /** Accessible status name, for example "Below target". */
  statusLabel?: string
}

const props = defineProps<{ facts: Fact[] }>()
const attention = (s?: Status) => s === 'warning' || s === 'negative'
</script>

<template>
  <section class="rz-fact-card">
    <div v-for="f in props.facts" :key="f.label" class="fact">
      <span class="label">{{ f.label }}</span>
      <span class="line">
        <span class="value" :style="{ color: attention(f.status) ? STATUS_CONTENT_COLOR[f.status!] : undefined }">
          <StatusIcon v-if="attention(f.status)" :status="f.status!" :size="40" :label="f.statusLabel" />
          {{ f.value }}
        </span>
        <span v-if="f.detail" class="detail">{{ f.detail }}</span>
      </span>
    </div>
  </section>
</template>

<style scoped>
.rz-fact-card {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  min-width: 0;
  min-height: 0;
  padding: var(--rz-spacing-md) var(--rz-spacing-xl);
  border: 1px solid var(--rz-color-border-subtle);
  border-radius: var(--rz-radius-lg);
  background: var(--rz-gradient-surface-default);
  box-shadow: var(--rz-elevation-card);
}
.fact {
  display: flex;
  flex-direction: column;
  min-width: 0;
}
.label,
.detail {
  font: var(--rz-tv-type-body);
  color: var(--rz-color-text-secondary);
}
.line {
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  column-gap: var(--rz-spacing-sm);
}
.value {
  display: inline-flex;
  align-items: center;
  gap: var(--rz-spacing-2xs);
  align-self: center;
  font: var(--rz-tv-type-kpi-primary-unit);
  color: var(--rz-color-text-primary);
  white-space: nowrap;
}
</style>
