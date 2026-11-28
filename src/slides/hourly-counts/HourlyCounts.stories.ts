import type { Meta, StoryObj } from '@storybook/vue3-vite'
import HourlyCounts from './HourlyCounts.vue'
import { slideRender } from '../_shared/slideStory'
import { hourlyCountsNegative, hourlyCountsPositive } from './mock'
import type { HourlyCountsData } from './types'

// Hourly counts (Single location). Status: Pending approval (round 2).
// Key question: which hours met the count target? The hourly chart fills the body, like Hourly OEE (shared body
// `_shared/HourlyTargetChart.vue`). Positive: on target, partial current hour. Negative: below target,
// long location name. Design plan in the slide's .vue file.
const meta: Meta<{ data: HourlyCountsData }> = {
  title: 'Slides/Single location/Hourly counts',
  ...slideRender<HourlyCountsData>(HourlyCounts, 'Hourly counts'),
}
export default meta
type Story = StoryObj<typeof meta>

export const Positive: Story = { args: { data: hourlyCountsPositive } }
export const Negative: Story = { args: { data: hourlyCountsNegative } }
