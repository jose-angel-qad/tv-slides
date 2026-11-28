import type { Meta, StoryObj } from '@storybook/vue3-vite'
import ShiftDashboard from './ShiftDashboard.vue'
import { slideRender } from '../_shared/slideStory'
import { shiftDashboardNegative, shiftDashboardPositive } from './mock'
import type { ShiftDashboardData } from './types'

// Shift dashboard (Multiple location): shift OEE, downtime, status and hourly OEE. Status: Pending approval (round 2).
// Key question: how is each line's shift going, and is it running now? Shift OEE is the hero of
// each row. One row card per location, six per page. Design plan in ShiftDashboard.vue.
// Positive: four lines on target and running. Negative: a full page (1 of 2), two stopped lines,
// a long location name and a long shift name.
const meta: Meta<{ data: ShiftDashboardData }> = {
  title: 'Slides/Multiple location/Shift dashboard',
  ...slideRender<ShiftDashboardData>(ShiftDashboard, 'Shift dashboard'),
}
export default meta
type Story = StoryObj<typeof meta>

export const Positive: Story = { args: { data: shiftDashboardPositive } }
export const Negative: Story = { args: { data: shiftDashboardNegative } }
