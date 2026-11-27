import type { Meta, StoryObj } from '@storybook/vue3-vite'
import ShiftThroughput from './ShiftThroughput.vue'
import { slideRender } from '../_shared/slideStory'
import { shiftThroughputNegative, shiftThroughputNoCrewTarget, shiftThroughputPositive } from './mock'
import type { ShiftThroughputData } from './types'

// Shift throughput (Single location): unit-based performance for the shift.
// Key question: how many units has this shift made versus plan? (design guide, kept)
// Template T3 Hero + support, same as Run throughput. Reused: KPI tile large, Stat tile,
// Crew size indicator, Chart card, Hourly bar chart, Chart legend item.
//
// Checklists (Light and Dark, 1920 x 1080)
// Passed: A11Y-01 to A11Y-11, A11Y-13 to A11Y-16, A11Y-20; INFO-01 to INFO-18, INFO-20 to INFO-25;
//   BRAND-01 to BRAND-12.
// Failed or not verified:
//   INFO-19: only Positive, Negative and No crew target are built; loading, empty, stale,
//     disconnected and error states are not designed yet.
//   A11Y-12, A11Y-17 to A11Y-19: grayscale, tall scripts, Arabic and long languages not tested overnight.
const meta: Meta<{ data: ShiftThroughputData }> = {
  title: 'Slides/Single location/Shift throughput',
  ...slideRender<ShiftThroughputData>(ShiftThroughput, 'Shift throughput'),
}
export default meta
type Story = StoryObj<typeof meta>

export const Positive: Story = { args: { data: shiftThroughputPositive } }
export const Negative: Story = { args: { data: shiftThroughputNegative } }
export const NoCrewTarget: Story = { name: 'No crew target', args: { data: shiftThroughputNoCrewTarget } }
