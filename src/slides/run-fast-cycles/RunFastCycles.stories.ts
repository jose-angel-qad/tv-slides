import type { Meta, StoryObj } from '@storybook/vue3-vite'
import RunFastCycles from './RunFastCycles.vue'
import { slideRender } from '../_shared/slideStory'
import { runFastCyclesNegative, runFastCyclesPositive } from './mock'
import type { RunFastCyclesData } from './types'

// Run (Fast cycles) (Single location). Status: Pending approval (round 2).
// Hero: average cycle time against target (Status band); assets' current cycle on the right with the
// target line. Positive: on target. Negative: over target, one asset not reporting, long names.
const meta: Meta<{ data: RunFastCyclesData }> = {
  title: 'Slides/Single location/Run (Fast cycles)',
  ...slideRender<RunFastCyclesData>(RunFastCycles, 'Run (Fast cycles)'),
}
export default meta
type Story = StoryObj<typeof meta>

export const Positive: Story = { args: { data: runFastCyclesPositive } }
export const Negative: Story = { args: { data: runFastCyclesNegative } }
