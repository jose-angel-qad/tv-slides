// Shared bar chart geometry. Every bar chart (Hourly bar chart, Mini hourly bars, Bar list, Step flow
// chart and any new one) takes its widths, gaps, radii and marks from here, so the charts read as
// one system. A chart that needs a different value writes the reason next to it.
//
// Vertical bars
// - A bar fills a fixed share of its slot: bar 62%, gap 38%. Never set gaps by hand.
// - The bar stops growing at 104 px, so a chart with few hours (a shift that just started) does not
//   turn into blocks; past that width the gap grows instead. Run throughput's approved chart uses it.
// - Gap floor: at least 8 px between bars at any size. If the floor cannot be met, the chart has too
//   many bars for its width: give it more width or fewer bars, do not squeeze.
// - Corner radius scales with the bar: min(10, bar width x 0.15), top corners only.
//
// Horizontal bars (Bar list)
// - Same thickness and gap in every list. Thickness never depends on the number of rows.
// - Corner radius: min(10, thickness x 0.15), end corners only.
//
// Marks shared by every chart
// - Data colors: data/neutral; status/negative/content only below target.
// - Axis and gridlines: data/axis, 2 px.
// - Target line: text/secondary, 3 px, dashed 12 / 8, at every size.
// - In-progress hatching: data/neutral stripes 6 px wide every 16 px at 45 degrees over the data
//   color at 22%.
// - Value labels: chart-value role with a surface halo (Hourly bar chart).

export const BAR_SHARE = 0.62
export const BAR_MAX = 104
export const GAP_FLOOR = 8
export const RADIUS_MAX = 10
export const RADIUS_SHARE = 0.15

export const AXIS_STROKE = 2
export const TARGET_STROKE = 3
export const TARGET_DASH = '12 8'

export const HATCH_PERIOD = 16
export const HATCH_STRIPE = 6
export const HATCH_TINT = 22

/** Horizontal bars (Bar list): thickness and the gap between rows. */
export const HBAR_THICKNESS = 32
export const HBAR_GAP = 24

/** Bar width for a slot (the slot is the plot width divided by the number of bars). */
export function barWidth(slot: number): number {
  return Math.min(BAR_MAX, slot * BAR_SHARE)
}

/** Corner radius for a bar of this width (vertical) or thickness (horizontal). */
export function barRadius(size: number): number {
  return Math.min(RADIUS_MAX, size * RADIUS_SHARE)
}

/** Gap between two bars in a slot. */
export function barGap(slot: number): number {
  return slot - barWidth(slot)
}

/** True when the chart meets the 8 px gap floor at this slot width. */
export function meetsGapFloor(slot: number): boolean {
  return barGap(slot) >= GAP_FLOOR
}

/** Smallest plot width that keeps the gap floor for n bars. */
export function minPlotWidth(n: number): number {
  return Math.ceil((n * GAP_FLOOR) / (1 - BAR_SHARE))
}

/** Path for a vertical bar with rounded top corners. */
export function vBarPath(x: number, top: number, w: number, bottom: number): string {
  const r = Math.min(barRadius(w), (bottom - top) / 2, w / 2)
  return `M${x},${bottom}V${top + r}Q${x},${top} ${x + r},${top}H${x + w - r}Q${x + w},${top} ${x + w},${top + r}V${bottom}Z`
}

/** CSS background for in-progress hatching on HTML bars (same stripes as the SVG pattern). */
export const HATCH_CSS = `repeating-linear-gradient(-45deg, var(--rz-color-data-neutral) 0 ${HATCH_STRIPE}px, color-mix(in srgb, var(--rz-color-data-neutral) ${HATCH_TINT}%, transparent) ${HATCH_STRIPE}px ${HATCH_PERIOD}px)`
