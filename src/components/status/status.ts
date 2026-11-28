// Status semantics. Color is never the only signal:
// positive = circle, warning = triangle, negative = octagon, neutral = dash.
export type Status = 'positive' | 'warning' | 'negative' | 'neutral'
/** Statuses that have an emphasis fill (Status band). */
export type FillStatus = Exclude<Status, 'neutral'>

// Each status has exactly three tokens:
//   content: text and icons on surfaces (and on surface.raised)
//   fill:    emphasis backgrounds (Status band)
//   on-fill: text and icons on top of fill, nowhere else
export const STATUS_CONTENT_COLOR: Record<Status, string> = {
  positive: 'var(--rz-color-status-positive-content)',
  warning: 'var(--rz-color-status-warning-content)',
  negative: 'var(--rz-color-status-negative-content)',
  neutral: 'var(--rz-color-text-secondary)',
}

export const STATUS_FILL_COLOR: Record<FillStatus, string> = {
  positive: 'var(--rz-color-status-positive-fill)',
  warning: 'var(--rz-color-status-warning-fill)',
  negative: 'var(--rz-color-status-negative-fill)',
}

export const STATUS_ON_FILL_COLOR: Record<FillStatus, string> = {
  positive: 'var(--rz-color-status-positive-on-fill)',
  warning: 'var(--rz-color-status-warning-on-fill)',
  negative: 'var(--rz-color-status-negative-on-fill)',
}

// Soft tint and border for secondary feedback that needs a shape, such as the Run status badge.
// Text and icons on subtle use STATUS_CONTENT_COLOR (neutral: text/secondary). Pending approval.
export const STATUS_SUBTLE_COLOR: Record<Status, string> = {
  positive: 'var(--rz-color-status-positive-subtle)',
  warning: 'var(--rz-color-status-warning-subtle)',
  negative: 'var(--rz-color-status-negative-subtle)',
  neutral: 'var(--rz-color-status-neutral-subtle)',
}

export const STATUS_SUBTLE_BORDER_COLOR: Record<Status, string> = {
  positive: 'var(--rz-color-status-positive-subtle-border)',
  warning: 'var(--rz-color-status-warning-subtle-border)',
  negative: 'var(--rz-color-status-negative-subtle-border)',
  neutral: 'var(--rz-color-status-neutral-subtle-border)',
}
