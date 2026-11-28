import type { Meta, StoryObj } from '@storybook/vue3-vite'
import UpDownStream from './UpDownStream.vue'
import { slideRender } from '../_shared/slideStory'
import { upDownStreamNegative, upDownStreamPositive } from './mock'
import type { UpDownStreamData } from './types'

// Up/Down stream (Multiple location). Status: Pending approval (round 2).
// Key question: will the lines feeding this area finish on time? Row hero: minutes ahead or behind
// with the ETA (Metric cell); product and progress; run state badge. Rows in flow order.
// Positive: ahead or on time. Negative: behind, a stopped line without ETA, long names.
const meta: Meta<{ data: UpDownStreamData }> = {
  title: 'Slides/Multiple location/Up-Down stream',
  ...slideRender<UpDownStreamData>(UpDownStream, 'Up/Down stream'),
}
export default meta
type Story = StoryObj<typeof meta>

export const Positive: Story = { args: { data: upDownStreamPositive } }
export const Negative: Story = { args: { data: upDownStreamNegative } }
