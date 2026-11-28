import type { Meta, StoryObj } from '@storybook/vue3-vite'
import LineBalance from './LineBalance.vue'
import { slideRender } from '../_shared/slideStory'
import { lineBalanceManySteps, lineBalanceNegative, lineBalancePositive } from './mock'
import type { LineBalanceData } from './types'

// Line balance (Single location). Status: Pending approval (round 2). Data without a target: Default
// plus extremes. Key question: where is work piling up? The step flow fills the body; the most WIP sits
// in a raised pill and the title names it. Default: flowing. Bottleneck: 46 waiting. Many steps.
const meta: Meta<{ data: LineBalanceData }> = {
  title: 'Slides/Single location/Line balance',
  ...slideRender<LineBalanceData>(LineBalance, 'Line balance'),
}
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { args: { data: lineBalancePositive } }
export const Bottleneck: Story = { args: { data: lineBalanceNegative } }
export const ManySteps: Story = { name: 'Many steps', args: { data: lineBalanceManySteps } }
