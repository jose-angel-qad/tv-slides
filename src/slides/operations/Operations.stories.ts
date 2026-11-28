import type { Meta, StoryObj } from '@storybook/vue3-vite'
import Operations from './Operations.vue'
import { slideRender } from '../_shared/slideStory'
import { operationsBasic, operationsNegative, operationsNoItems, operationsPositive } from './mock'
import type { OperationsData } from './types'

// Operations (Single location). Status: Pending approval (round 2).
// Key question: what needs attention on this line right now? Hero: the open items list; Fact card
// with units against plan, OEE and ETA; count trend. Positive: one data sheet pending. Negative:
// breakdown, problems, data sheets, behind plan. Reliability and Compliance off: problems only.
const meta: Meta<{ data: OperationsData }> = {
  title: 'Slides/Single location/Operations',
  ...slideRender<OperationsData>(Operations, 'Operations'),
}
export default meta
type Story = StoryObj<typeof meta>

export const Positive: Story = { args: { data: operationsPositive } }
export const Negative: Story = { args: { data: operationsNegative } }
export const Basic: Story = { name: 'Reliability and Compliance off', args: { data: operationsBasic } }
export const NoOpenItems: Story = { name: 'No open items', args: { data: operationsNoItems } }
