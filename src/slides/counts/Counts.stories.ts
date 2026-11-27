import type { Meta, StoryObj } from '@storybook/vue3-vite'
import Counts from './Counts.vue'
import { slideRender } from '../_shared/slideStory'
import { countsNegative, countsPositive } from './mock'
import type { CountsData } from './types'

// Counts (Single location): location page count trend.
// Key question: is the line producing at a steady rate? Kept, with "right now" made explicit by
// the hero (current rate). Template T3 Hero + support. Reused: KPI tile large, Stat tile,
// Chart card, Chart legend item. Created: Line chart (Data viz).
// Negative shows the line stopped right now.
//
// Checklists (Light and Dark, 1920 x 1080)
// Passed: A11Y-01 to A11Y-11, A11Y-13 to A11Y-16, A11Y-20; INFO-01 to INFO-16, INFO-18, INFO-20 to INFO-25;
//   BRAND-01 to BRAND-08, BRAND-10 to BRAND-12.
// Failed or not verified:
//   INFO-17: a line has no hour bars; the last point is the last 10 minutes, so nothing is partial.
//   BRAND-09: new component (Line chart), pending approval.
//   INFO-19: only Positive and Negative are built.
//   A11Y-12, A11Y-17 to A11Y-19: grayscale, tall scripts, Arabic and long languages not tested overnight.
const meta: Meta<{ data: CountsData }> = {
  title: 'Slides/Single location/Counts',
  ...slideRender<CountsData>(Counts, 'Counts'),
}
export default meta
type Story = StoryObj<typeof meta>

export const Positive: Story = { args: { data: countsPositive } }
export const Negative: Story = { name: 'Negative, stopped now', args: { data: countsNegative } }
