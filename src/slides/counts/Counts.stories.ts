import type { Meta, StoryObj } from '@storybook/vue3-vite'
import Counts from './Counts.vue'
import { slideRender } from '../_shared/slideStory'
import { countsNegative, countsPositive } from './mock'
import type { CountsData } from './types'

// Counts (Single location). Status: Pending approval (round 2).
// Key question: is the line producing at a steady rate? The rate line fills the body with stops and
// slowdowns marked. Positive: one stop, one slowdown. Negative: unsteady, stopped now, long name.
// Design plan in Counts.vue.
const meta: Meta<{ data: CountsData }> = {
  title: 'Slides/Single location/Counts',
  ...slideRender<CountsData>(Counts, 'Counts'),
}
export default meta
type Story = StoryObj<typeof meta>

export const Positive: Story = { args: { data: countsPositive } }
export const Negative: Story = { name: 'Negative, stopped now', args: { data: countsNegative } }
