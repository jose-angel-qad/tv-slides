import type { Meta, StoryObj } from '@storybook/vue3-vite'
import ThroughputDashboard from './ThroughputDashboard.vue'
import { slideRender } from '../_shared/slideStory'
import { throughputDashboardNegative, throughputDashboardPositive } from './mock'
import type { ThroughputDashboardData } from './types'

// Throughput dashboard (Multiple location). Status: Pending approval (round 2).
// Key question: how many units has each line made versus plan? Row hero: units in a Metric cell with
// the gap to plan; hourly bars; crew. Positive: all ahead, one line without a crew target. Negative:
// three behind plan, two crews short, long name.
const meta: Meta<{ data: ThroughputDashboardData }> = {
  title: 'Slides/Multiple location/Throughput dashboard',
  ...slideRender<ThroughputDashboardData>(ThroughputDashboard, 'Throughput dashboard'),
}
export default meta
type Story = StoryObj<typeof meta>

export const Positive: Story = { args: { data: throughputDashboardPositive } }
export const Negative: Story = { args: { data: throughputDashboardNegative } }
