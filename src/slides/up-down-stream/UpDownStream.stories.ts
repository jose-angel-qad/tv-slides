import type { Meta, StoryObj } from '@storybook/vue3-vite'
import UpDownStream from './UpDownStream.vue'
import { slideRender } from '../_shared/slideStory'
import { upDownStreamNegative, upDownStreamPositive } from './mock'
import type { UpDownStreamData } from './types'

// Up/Down stream (Multiple location): progress of the locations that feed a process area.
// Key question: will the lines feeding this area finish on time? Kept.
// Template T4 Table. Reused: Chart card, Location table, Status value, Progress bar. Created: none.
// Positive: all ahead or on time. Negative: behind schedule, a stopped line (no ETA), long names.
//
// Checklists (Light and Dark, 1920 x 1080)
// Passed: A11Y-01 to A11Y-11, A11Y-13 to A11Y-16, A11Y-20; INFO-01 to INFO-03, INFO-06 to INFO-16,
//   INFO-18, INFO-20 to INFO-25; BRAND-01 to BRAND-12.
// Failed or not verified:
//   INFO-04, INFO-05: no single main KPI on a multiple location slide (see questions.md).
//   INFO-10: the row hero uses the slide title role (see Shift dashboard).
//   INFO-17: not applicable.
//   INFO-19: only Positive and Negative are built.
//   A11Y-12, A11Y-17 to A11Y-19: grayscale, tall scripts, Arabic and long languages not tested overnight.
const meta: Meta<{ data: UpDownStreamData }> = {
  title: 'Slides/Multiple location/Up-Down stream',
  ...slideRender<UpDownStreamData>(UpDownStream, 'Up/Down stream'),
}
export default meta
type Story = StoryObj<typeof meta>

export const Positive: Story = { args: { data: upDownStreamPositive } }
export const Negative: Story = { args: { data: upDownStreamNegative } }
