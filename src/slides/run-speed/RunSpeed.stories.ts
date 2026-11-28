import type { Meta, StoryObj } from '@storybook/vue3-vite'
import RunSpeed from './RunSpeed.vue'
import { slideRender } from '../_shared/slideStory'
import { runSpeedNegative, runSpeedNoEta, runSpeedPositive } from './mock'
import type { RunSpeedData } from './types'

// Run speed (Single location). Status: Pending approval (round 2).
// Key question: is the run ahead or behind, and when will it finish? Hero: units ahead or behind pace
// (Status band); Estimated finish tile; progress bar with the pace marker and the speed under it.
// Positive: ahead, finishing early. Negative: behind, late, below pace, long names. ETA not available:
// the line is stopped. Design plan in RunSpeed.vue.
const meta: Meta<{ data: RunSpeedData }> = {
  title: 'Slides/Single location/Run speed',
  ...slideRender<RunSpeedData>(RunSpeed, 'Run speed'),
}
export default meta
type Story = StoryObj<typeof meta>

export const Positive: Story = { args: { data: runSpeedPositive } }
export const Negative: Story = { args: { data: runSpeedNegative } }
export const NoEta: Story = { name: 'ETA not available', args: { data: runSpeedNoEta } }
