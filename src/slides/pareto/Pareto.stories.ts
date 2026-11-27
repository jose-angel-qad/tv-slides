import type { Meta, StoryObj } from '@storybook/vue3-vite'
import Pareto from './Pareto.vue'
import { slideRender } from '../_shared/slideStory'
import { paretoNegative, paretoPositive } from './mock'
import type { ParetoData } from './types'

// Pareto (Single location): location page problem Pareto.
// Key question: what is costing this line the most? Kept.
// Template T2 List + support (new). Reused: Chart card, Stat tile. Created: Bar list (Data viz).
// Positive: few, small losses. Negative: one dominant problem, 8 problems (7 shown), long name.
//
// Checklists (Light and Dark, 1920 x 1080)
// Passed: A11Y-01 to A11Y-11, A11Y-13 to A11Y-16, A11Y-20; INFO-01 to INFO-03, INFO-06 to INFO-16,
//   INFO-18, INFO-20 to INFO-25; BRAND-01 to BRAND-08, BRAND-10 to BRAND-12.
// Failed or not verified:
//   INFO-04, INFO-05: no value has a target, so there is no primary feedback (by design, see questions.md).
//   INFO-17: not applicable (no hourly chart).
//   BRAND-09: new component (Bar list) and template (T2), pending approval.
//   INFO-19: only Positive and Negative are built.
//   A11Y-12, A11Y-17 to A11Y-19: grayscale, tall scripts, Arabic and long languages not tested overnight.
const meta: Meta<{ data: ParetoData }> = {
  title: 'Slides/Single location/Pareto',
  ...slideRender<ParetoData>(Pareto, 'Pareto'),
}
export default meta
type Story = StoryObj<typeof meta>

export const Positive: Story = { args: { data: paretoPositive } }
export const Negative: Story = { args: { data: paretoNegative } }
