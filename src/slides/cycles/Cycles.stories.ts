import type { Meta, StoryObj } from '@storybook/vue3-vite'
import Cycles from './Cycles.vue'
import { slideRender } from '../_shared/slideStory'
import { cyclesNegative, cyclesPositive } from './mock'
import type { CyclesData } from './types'

// Cycles (Single location). Status: Pending approval (round 2).
// Key question: is each asset's cycle on time? One row per asset: time left or overrun (Metric cell),
// the cycle bar and the state badge; the run card holds progress and averages.
// Positive: five assets on time, one inactive. Negative: two overruns, rejected, no product, long names.
const meta: Meta<{ data: CyclesData }> = {
  title: 'Slides/Single location/Cycles',
  ...slideRender<CyclesData>(Cycles, 'Cycles'),
}
export default meta
type Story = StoryObj<typeof meta>

export const Positive: Story = { args: { data: cyclesPositive } }
export const Negative: Story = { args: { data: cyclesNegative } }
