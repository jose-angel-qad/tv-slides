import type { Meta, StoryObj } from '@storybook/vue3-vite'
import Pareto from './Pareto.vue'
import { slideRender } from '../_shared/slideStory'
import { paretoNegative, paretoOneProblem, paretoPositive } from './mock'
import type { ParetoData } from './types'

// Pareto (Single location). Status: Pending approval (round 2). Data without a target: no status.
// Key question: what is costing this line the most? Ranked bars by time lost fill the body; the card
// title is the total lost. Default: four problems. Many problems: eight (seven shown), long name.
// One problem. Design plan in Pareto.vue.
const meta: Meta<{ data: ParetoData }> = {
  title: 'Slides/Single location/Pareto',
  ...slideRender<ParetoData>(Pareto, 'Pareto'),
}
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { args: { data: paretoPositive } }
export const ManyProblems: Story = { name: 'Many problems', args: { data: paretoNegative } }
export const OneProblem: Story = { name: 'One problem', args: { data: paretoOneProblem } }
