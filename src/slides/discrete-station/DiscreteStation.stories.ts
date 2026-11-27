import type { Meta, StoryObj } from '@storybook/vue3-vite'
import DiscreteStation from './DiscreteStation.vue'
import { slideRender } from '../_shared/slideStory'
import { discreteStationIdle, discreteStationNegative, discreteStationPositive } from './mock'
import type { DiscreteStationData } from './types'

// Discrete station (Single location): a single step (discrete) station.
// Key question: is this station keeping pace? Kept, led by the station state and timer.
// Template T3 Hero + support. Reused: KPI tile large, Stat tile, Chart card, Bar list,
// Hourly bar chart. Created: none. Positive: working. Negative: over the step time target. Idle.
//
// Checklists (Light and Dark, 1920 x 1080)
// Passed: A11Y-01 to A11Y-11, A11Y-13 to A11Y-16, A11Y-20; INFO-01 to INFO-18, INFO-20 to INFO-25;
//   BRAND-01 to BRAND-12.
// Failed or not verified:
//   INFO-19: only Positive, Negative and Idle are built.
//   A11Y-12, A11Y-17 to A11Y-19: grayscale, tall scripts, Arabic and long languages not tested overnight.
const meta: Meta<{ data: DiscreteStationData }> = {
  title: 'Slides/Single location/Discrete station',
  ...slideRender<DiscreteStationData>(DiscreteStation, 'Discrete station'),
}
export default meta
type Story = StoryObj<typeof meta>

export const Positive: Story = { args: { data: discreteStationPositive } }
export const Negative: Story = { args: { data: discreteStationNegative } }
export const Idle: Story = { args: { data: discreteStationIdle } }
