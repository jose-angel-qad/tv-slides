import type { Meta, StoryObj } from '@storybook/vue3-vite'
import RunDashboard from './RunDashboard.vue'
import { slideRender } from '../_shared/slideStory'
import { runDashboardNegative, runDashboardPositive } from './mock'
import type { RunDashboardData } from './types'

// Run dashboard (Multiple location): run OEE, progress and quality overview.
// Key question: how far along is each run, and is quality OK? Kept.
// Template T4 Table. Reused: Chart card, Location table, Status value, Progress bar. Created: none.
// Positive: four runs on target, one complete. Negative: below target, a quality issue, no active
// run, long product and location names.
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
const meta: Meta<{ data: RunDashboardData }> = {
  title: 'Slides/Multiple location/Run dashboard',
  ...slideRender<RunDashboardData>(RunDashboard, 'Run dashboard'),
}
export default meta
type Story = StoryObj<typeof meta>

export const Positive: Story = { args: { data: runDashboardPositive } }
export const Negative: Story = { args: { data: runDashboardNegative } }
