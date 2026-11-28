import type { Meta, StoryObj } from '@storybook/vue3-vite'
import ShiftThroughput from './ShiftThroughput.vue'
import { slideRender } from '../_shared/slideStory'
import { shiftThroughputNegative, shiftThroughputNoCrewTarget, shiftThroughputPositive } from './mock'
import type { ShiftThroughputData } from './types'

// Shift throughput (Single location). Status: Pending approval (round 2).
// Key question: how many units has this shift made versus plan? Hero: units produced with the gap
// to plan in the Status band; crew tile; units per hour chart. Design plan in ShiftThroughput.vue.
// Positive: ahead of plan, crew on target. Negative: behind plan, crew short, long location name.
// No crew target: the crew shows without a status.
const meta: Meta<{ data: ShiftThroughputData }> = {
  title: 'Slides/Single location/Shift throughput',
  ...slideRender<ShiftThroughputData>(ShiftThroughput, 'Shift throughput'),
}
export default meta
type Story = StoryObj<typeof meta>

export const Positive: Story = { args: { data: shiftThroughputPositive } }
export const Negative: Story = { args: { data: shiftThroughputNegative } }
export const NoCrewTarget: Story = { name: 'No crew target', args: { data: shiftThroughputNoCrewTarget } }
