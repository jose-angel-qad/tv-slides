import type { Meta, StoryObj } from '@storybook/vue3-vite'
import HourlyOee from './HourlyOee.vue'
import { slideRender } from '../_shared/slideStory'
import { hourlyOeeNegative, hourlyOeePositive } from './mock'
import type { HourlyOeeData } from './types'

// Hourly OEE (Single location): location page hourly OEE. Status: Pending approval (round 2).
// Key question: which hours met the OEE target? The hourly chart is the answer and fills the body;
// its title counts the finished hours on target. Design plan in HourlyOee.vue.
// Positive includes an hour above 100% and a partial current hour; Negative has a long location name.
const meta: Meta<{ data: HourlyOeeData }> = {
  title: 'Slides/Single location/Hourly OEE',
  ...slideRender<HourlyOeeData>(HourlyOee, 'Hourly OEE'),
}
export default meta
type Story = StoryObj<typeof meta>

export const Positive: Story = { args: { data: hourlyOeePositive } }
export const Negative: Story = { args: { data: hourlyOeeNegative } }
