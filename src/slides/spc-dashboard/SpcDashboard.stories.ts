import type { Meta, StoryObj } from '@storybook/vue3-vite'
import SpcDashboard from './SpcDashboard.vue'
import { slideRender } from '../_shared/slideStory'
import { spcDashboardNegative, spcDashboardPositive } from './mock'
import type { SpcDashboardData } from './types'

// SPC dashboard (Multiple location). Status: Pending approval (round 2). Proposal: definition pending.
// Key question: is each monitored characteristic in control? Row hero: control status (Metric cell);
// latest value against the limits; Cpk. Positive: all in control. Negative: two out of control, Cpk
// below target, long name.
const meta: Meta<{ data: SpcDashboardData }> = {
  title: 'Slides/Multiple location/SPC dashboard',
  ...slideRender<SpcDashboardData>(SpcDashboard, 'SPC dashboard'),
}
export default meta
type Story = StoryObj<typeof meta>

export const Positive: Story = { args: { data: spcDashboardPositive } }
export const Negative: Story = { args: { data: spcDashboardNegative } }
