import type { Meta, StoryObj } from '@storybook/vue3-vite'
import ShiftFastCycles from './ShiftFastCycles.vue'
import { slideRender } from '../_shared/slideStory'
import { shiftFastCyclesNegative, shiftFastCyclesPositive } from './mock'
import type { ShiftFastCyclesData } from './types'

// Shift (Fast cycles) (Single location). Status: Pending approval (round 2).
// Hero: average cycle time against target (Status band); assets' current cycle on the right with the
// target line. Positive: on target. Negative: over target, one asset not reporting, long names.
const meta: Meta<{ data: ShiftFastCyclesData }> = {
  title: 'Slides/Single location/Shift (Fast cycles)',
  ...slideRender<ShiftFastCyclesData>(ShiftFastCycles, 'Shift (Fast cycles)'),
}
export default meta
type Story = StoryObj<typeof meta>

export const Positive: Story = { args: { data: shiftFastCyclesPositive } }
export const Negative: Story = { args: { data: shiftFastCyclesNegative } }
