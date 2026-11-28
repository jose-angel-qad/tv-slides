import type { Meta, StoryObj } from '@storybook/vue3-vite'
import DiscreteStation from './DiscreteStation.vue'
import { slideRender } from '../_shared/slideStory'
import { discreteStationIdle, discreteStationNegative, discreteStationPositive } from './mock'
import type { DiscreteStationData } from './types'

// Discrete station (Single location). Status: Pending approval (round 2).
// Key question: is this station keeping pace? Hero: station state (Status band) and timer; Fact card
// with steps, average step time and quality; steps per hour chart; top problems.
// Positive: working, on pace. Negative: over step time, slow average, long names. Idle.
const meta: Meta<{ data: DiscreteStationData }> = {
  title: 'Slides/Single location/Discrete station',
  ...slideRender<DiscreteStationData>(DiscreteStation, 'Discrete station'),
}
export default meta
type Story = StoryObj<typeof meta>

export const Positive: Story = { args: { data: discreteStationPositive } }
export const Negative: Story = { args: { data: discreteStationNegative } }
export const Idle: Story = { args: { data: discreteStationIdle } }
