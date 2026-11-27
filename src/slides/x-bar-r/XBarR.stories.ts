import type { Meta, StoryObj } from '@storybook/vue3-vite'
import XBarR from './XBarR.vue'
import { slideRender } from '../_shared/slideStory'
import { xBarRNegative, xBarRPositive } from './mock'
import type { XBarRData } from './types'

// X-Bar R (Single location): X-bar and range charts for the selected characteristic.
// Key question: is this characteristic in control? Kept.
// Template T3 Hero + support. Reused: KPI tile large, Stat tile, Chart card, Line chart
// (control chart mode: not zero based, points, flagged points). Created: none.
//
// Checklists (Light and Dark, 1920 x 1080)
// Passed: A11Y-01 to A11Y-11, A11Y-13 to A11Y-16, A11Y-20; INFO-01 to INFO-16, INFO-20 to INFO-25;
//   BRAND-01 to BRAND-12.
// Failed or not verified:
//   INFO-18: control charts do not start at zero (by design for SPC).
//   INFO-17: not applicable (subgroups, not hours).
//   INFO-19: only Positive (in control) and Negative (out of control) are built.
//   A11Y-12, A11Y-17 to A11Y-19: grayscale, tall scripts, Arabic and long languages not tested overnight.
const meta: Meta<{ data: XBarRData }> = {
  title: 'Slides/Single location/X-Bar R',
  ...slideRender<XBarRData>(XBarR, 'X-Bar R'),
}
export default meta
type Story = StoryObj<typeof meta>

export const Positive: Story = { name: 'Positive, in control', args: { data: xBarRPositive } }
export const Negative: Story = { name: 'Negative, out of control', args: { data: xBarRNegative } }
