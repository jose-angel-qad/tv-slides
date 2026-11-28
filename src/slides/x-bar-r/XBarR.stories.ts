import type { Meta, StoryObj } from '@storybook/vue3-vite'
import XBarR from './XBarR.vue'
import { slideRender } from '../_shared/slideStory'
import { xBarRNegative, xBarRPositive } from './mock'
import type { XBarRData } from './types'

// X-Bar R (Single location). Status: Pending approval (round 2).
// Key question: is this characteristic in control? Hero: points outside the control limits with the
// control status in the Status band; X-bar and range charts on the left; Cpk, Cp and spec limits.
// Positive: in control. Negative: out of control, Cpk below target, long names.
const meta: Meta<{ data: XBarRData }> = {
  title: 'Slides/Single location/X-Bar R',
  ...slideRender<XBarRData>(XBarR, 'X-Bar R'),
}
export default meta
type Story = StoryObj<typeof meta>

export const Positive: Story = { name: 'Positive, in control', args: { data: xBarRPositive } }
export const Negative: Story = { name: 'Negative, out of control', args: { data: xBarRNegative } }
