import type { Meta, StoryObj } from '@storybook/vue3-vite'
import DiscreteLocation from './DiscreteLocation.vue'
import { slideRender } from '../_shared/slideStory'
import { discreteLocationNegative, discreteLocationPositive } from './mock'
import type { DiscreteLocationData } from './types'

// Discrete location (Single location). Status: Pending approval (round 2).
// Key question: how many units are finished, and is the line on pace? Hero: units finished with the
// pace in the Status band; Fact card with OEE, cycle time and quality; hourly counts chart.
// Positive: ahead, OEE on target. Negative: behind, OEE below target, long name. Plan in DiscreteLocation.vue.
const meta: Meta<{ data: DiscreteLocationData }> = {
  title: 'Slides/Single location/Discrete location',
  ...slideRender<DiscreteLocationData>(DiscreteLocation, 'Discrete location'),
}
export default meta
type Story = StoryObj<typeof meta>

export const Positive: Story = { args: { data: discreteLocationPositive } }
export const Negative: Story = { args: { data: discreteLocationNegative } }
