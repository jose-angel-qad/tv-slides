<script setup lang="ts">
// Inventory: "Table column header" + "Multi-location table row" (Table). The shared row layout for
// every multiple location slide (Shift dashboard, Run dashboard, Up/Down stream, Scoreboard,
// Maintenance status, SPC dashboard).
// - Column headers sit on the sheet: Inter 28, text/secondary, unit on the same line. The location
//   column has no header by default (the names say it).
// - One row card per location (card style: surface gradient, 1 px border/subtle, radius/lg,
//   elevation/card), always in the same order (INFO-11). Header and rows share one grid, so columns
//   line up: labels left aligned, numbers right aligned (`align: 'end'`) or on a fixed column start.
// - Location cell: name in Geist Medium 32 (card title), wraps to two lines, never cut (INFO-23),
//   with an optional detail line in Inter 28 text/secondary (shift, product).
// - Row hero: one column per row, a Metric cell placed right after the location (pilot review).
//   Other cells are plain text in Geist Medium 32 with tabular figures (A11Y-05).
// - `fill`: rows share the page height between `rowMin` and `rowMax`, so a few rows do not leave a
//   dead zone and a full page still fits.
// Cells render from slots named `cell-<key>` (props: row); without a slot the raw value shows.
// Header cells can be replaced with `head-<key>` slots.
export interface TableColumn {
  key: string
  label: string
  /** CSS grid track, for example "minmax(0, 1fr)" or "240px". */
  width?: string
  align?: 'start' | 'end' | 'center'
}
export interface TableRow {
  id: string
  location: string
  /** Second line under the location name. */
  detail?: string
  [key: string]: unknown
}

const props = withDefaults(
  defineProps<{
    columns: TableColumn[]
    rows: TableRow[]
    locationLabel?: string
    locationWidth?: string
    fill?: boolean
    rowMin?: number
    rowMax?: number
  }>(),
  { locationLabel: '', locationWidth: 'minmax(0, 1fr)', fill: true, rowMin: 112, rowMax: 184 },
)
const tracks = () => [props.locationWidth, ...props.columns.map((c) => c.width ?? 'minmax(0, 1fr)')].join(' ')
</script>

<template>
  <div
    class="rz-location-table"
    :class="{ fill: props.fill }"
    role="table"
    :style="{ '--tracks': tracks(), '--row-min': `${props.rowMin}px`, '--row-max': `${props.rowMax}px` }"
  >
    <div class="head" role="row">
      <span class="th" role="columnheader" :aria-label="props.locationLabel || 'Location'">{{ props.locationLabel }}</span>
      <span v-for="c in props.columns" :key="c.key" class="th" :class="c.align" role="columnheader">
        <slot :name="`head-${c.key}`">{{ c.label }}</slot>
      </span>
    </div>
    <div v-for="r in props.rows" :key="r.id" class="row" role="row">
      <div class="location" role="cell">
        <span class="name">{{ r.location }}</span>
        <span v-if="r.detail" class="detail">{{ r.detail }}</span>
      </div>
      <div v-for="c in props.columns" :key="c.key" class="td" :class="c.align" role="cell">
        <slot :name="`cell-${c.key}`" :row="r">{{ r[c.key] }}</slot>
      </div>
    </div>
  </div>
</template>

<style scoped>
.rz-location-table {
  display: flex;
  flex-direction: column;
  gap: var(--rz-spacing-xs);
  min-width: 0;
  min-height: 0;
}
.rz-location-table.fill {
  height: 100%;
}
.head,
.row {
  display: grid;
  grid-template-columns: var(--tracks);
  align-items: center;
  column-gap: var(--rz-spacing-lg);
  padding: 0 var(--rz-spacing-xl);
}
.th {
  min-width: 0;
  font: var(--rz-tv-type-body);
  color: var(--rz-color-text-secondary);
  white-space: nowrap;
}
.row {
  min-height: var(--row-min);
  padding-top: var(--rz-spacing-2xs);
  padding-bottom: var(--rz-spacing-2xs);
  border: 1px solid var(--rz-color-border-subtle);
  border-radius: var(--rz-radius-lg);
  background: var(--rz-gradient-surface-default);
  box-shadow: var(--rz-elevation-card);
}
.fill .row {
  flex: 1 0 auto;
  max-height: var(--row-max);
}
.location {
  display: flex;
  flex-direction: column;
  min-width: 0;
}
.name {
  font: var(--rz-tv-type-card-title);
  letter-spacing: var(--rz-tv-tracking-card-title);
  color: var(--rz-color-text-primary);
}
.detail {
  font: var(--rz-tv-type-body);
  color: var(--rz-color-text-secondary);
}
.td {
  display: flex;
  align-items: center;
  min-width: 0;
  font: var(--rz-tv-type-card-title);
  font-variant-numeric: var(--rz-tv-figures-table);
  color: var(--rz-color-text-primary);
}
.end {
  justify-content: flex-end;
  text-align: end;
}
.center {
  justify-content: center;
  text-align: center;
}
</style>
