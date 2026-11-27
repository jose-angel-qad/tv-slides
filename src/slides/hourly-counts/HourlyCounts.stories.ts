import type { Meta, StoryObj } from '@storybook/vue3-vite'
import HourlyCounts from './HourlyCounts.vue'
import { slideRender } from '../_shared/slideStory'
import { hourlyCountsNegative, hourlyCountsPositive } from './mock'
import type { HourlyCountsData } from './types'

// Hourly counts (Single location): location page hourly counts chart.
// Key question: which hours met the count target? Kept. Same template as Hourly OEE
// (shared body `_shared/HourlyMetric.vue`). Reused: KPI tile large, Stat tile, Chart card,
// Hourly bar chart, Chart legend item.
//
// Checklists (Light and Dark, 1920 x 1080)
// Passed: A11Y-01 to A11Y-11, A11Y-13 to A11Y-16, A11Y-20; INFO-01 to INFO-18, INFO-20 to INFO-25;
//   BRAND-01 to BRAND-12.
// Failed or not verified:
//   INFO-19: only Positive and Negative are built.
//   A11Y-12, A11Y-17 to A11Y-19: grayscale, tall scripts, Arabic and long languages not tested overnight.
const meta: Meta<{ data: HourlyCountsData }> = {
  title: 'Slides/Single location/Hourly counts',
  ...slideRender<HourlyCountsData>(HourlyCounts, 'Hourly counts'),
}
export default meta
type Story = StoryObj<typeof meta>

export const Positive: Story = { args: { data: hourlyCountsPositive } }
export const Negative: Story = { args: { data: hourlyCountsNegative } }
