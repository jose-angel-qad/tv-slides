import type { Meta, StoryObj } from '@storybook/vue3-vite'
import HourlyOee from './HourlyOee.vue'
import { slideRender } from '../_shared/slideStory'
import { hourlyOeeNegative, hourlyOeePositive } from './mock'
import type { HourlyOeeData } from './types'

// Hourly OEE (Single location): location page hourly OEE.
// Key question: which hours met the OEE target? Kept, answered in two levels: shift OEE as the
// hero (Claude idea from the design guide), hours on target and the chart as support.
// Template T3 Hero + support. Reused: KPI tile large, Stat tile, Chart card, Hourly bar chart
// (now with format props), Chart legend item. Positive includes an hour above 100%.
//
// Checklists (Light and Dark, 1920 x 1080)
// Passed: A11Y-01 to A11Y-11, A11Y-13 to A11Y-16, A11Y-20; INFO-01 to INFO-18, INFO-20 to INFO-25;
//   BRAND-01 to BRAND-12.
// Failed or not verified:
//   INFO-19: only Positive and Negative are built.
//   A11Y-12, A11Y-17 to A11Y-19: grayscale, tall scripts, Arabic and long languages not tested overnight.
const meta: Meta<{ data: HourlyOeeData }> = {
  title: 'Slides/Single location/Hourly OEE',
  ...slideRender<HourlyOeeData>(HourlyOee, 'Hourly OEE'),
}
export default meta
type Story = StoryObj<typeof meta>

export const Positive: Story = { args: { data: hourlyOeePositive } }
export const Negative: Story = { args: { data: hourlyOeeNegative } }
