<script setup lang="ts">
// Inventory: "Table column header" + "Multi-location table row" (Table).
// One row per location, always in the same order (INFO-11), up to 8 rows and 4 metric columns per
// page (INFO-09). Column headers keep the unit on the same line ("Downtime, min"), Inter 28 in
// text/secondary. Rows are separated by space and a surface/raised fill, not by lines (BRAND-08).
// Every row is the same height; the location name (Inter SemiBold 28) wraps to two lines.
// Numeric cells use tabular figures so values line up top to bottom (A11Y-05).
// Cells render from slots named `cell-<key>` (props: row); without a slot the raw value shows.
// Fixed geometry: row min height 72 px, so 8 rows fit one page in the T4 card; column widths come from the `columns` prop.
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
  [key: string]: unknown
}

const props = withDefaults(
  defineProps<{ columns: TableColumn[]; rows: TableRow[]; locationLabel?: string; locationWidth?: string }>(),
  { locationLabel: 'Location', locationWidth: 'minmax(0, 1.2fr)' },
)
const tracks = () => [props.locationWidth, ...props.columns.map((c) => c.width ?? 'minmax(0, 1fr)')].join(' ')
</script>

<template>
  <div class="rz-location-table" role="table" :style="{ '--tracks': tracks() }">
    <div class="head" role="row">
      <span class="th" role="columnheader">{{ props.locationLabel }}</span>
      <span v-for="c in props.columns" :key="c.key" class="th" :class="c.align" role="columnheader">{{ c.label }}</span>
    </div>
    <div v-for="r in props.rows" :key="r.id" class="row" role="row">
      <span class="location" role="cell">{{ r.location }}</span>
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
  gap: var(--rz-spacing-2xs);
  min-width: 0;
}
.head,
.row {
  display: grid;
  grid-template-columns: var(--tracks);
  align-items: center;
  column-gap: var(--rz-spacing-lg);
  padding: 0 var(--rz-spacing-md);
}
.head {
  padding-bottom: var(--rz-spacing-2xs);
}
.th {
  font: var(--rz-tv-type-body);
  color: var(--rz-color-text-secondary);
}
.row {
  min-height: 72px;
  padding-top: var(--rz-spacing-2xs);
  padding-bottom: var(--rz-spacing-2xs);
  border-radius: var(--rz-radius-md);
  background: var(--rz-color-surface-raised);
}
.location {
  min-width: 0;
  font: var(--rz-tv-type-body-strong);
  color: var(--rz-color-text-primary);
}
.td {
  display: flex;
  align-items: center;
  min-width: 0;
  font: var(--rz-tv-type-chart-value);
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
.th.end {
  text-align: end;
}
.th.center {
  text-align: center;
}
</style>
