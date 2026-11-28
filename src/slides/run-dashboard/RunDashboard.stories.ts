import type { Meta, StoryObj } from '@storybook/vue3-vite'
import RunDashboard from './RunDashboard.vue'
import { slideRender } from '../_shared/slideStory'
import { runDashboardNegative, runDashboardPositive } from './mock'
import type { RunDashboardData } from './types'

// Run dashboard (Multiple location). Status: Pending approval (round 2).
// Key question: how far along is each run, and is quality OK? Row hero: percent done in a Metric cell;
// product with its progress bar; OEE and quality with a status only when below target.
// Positive: runs on target, one complete. Negative: below target, quality issue, no active run, long names.
const meta: Meta<{ data: RunDashboardData }> = {
  title: 'Slides/Multiple location/Run dashboard',
  ...slideRender<RunDashboardData>(RunDashboard, 'Run dashboard'),
}
export default meta
type Story = StoryObj<typeof meta>

export const Positive: Story = { args: { data: runDashboardPositive } }
export const Negative: Story = { args: { data: runDashboardNegative } }
