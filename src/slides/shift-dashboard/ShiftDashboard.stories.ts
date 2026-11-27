import type { Meta, StoryObj } from '@storybook/vue3-vite'
import ShiftDashboard from './ShiftDashboard.vue'
import { slideRender } from '../_shared/slideStory'
import { shiftDashboardNegative, shiftDashboardPositive } from './mock'
import type { ShiftDashboardData } from './types'

// Shift dashboard (Multiple location): shift OEE, downtime, status and hourly OEE.
// Key question: how is each line's shift going, and is it running now? Kept.
// Template T4 Table (new). Reused: Chart card, Chart legend item, Status icon.
// Created: Location table (Table), Status value (Status), Mini hourly bars (Data viz).
// Positive: 4 locations on target. Negative: 8 locations (page 1 of 2), two stopped, long name.
//
// Checklists (Light and Dark, 1920 x 1080)
// Passed: A11Y-01 to A11Y-11, A11Y-13 to A11Y-16, A11Y-20; INFO-01 to INFO-03, INFO-06 to INFO-18,
//   INFO-20 to INFO-25; BRAND-01 to BRAND-08, BRAND-10 to BRAND-12.
// Failed or not verified:
//   INFO-04, INFO-05: no single main KPI on a multiple location slide; each row has secondary status
//     and the OEE column is the row hero (see questions.md).
//   INFO-10: the row hero value uses the slide title role (Geist Bold 44); no table value role exists.
//   BRAND-09: new components (Location table, Status value, Mini hourly bars) and T4 template, pending approval.
//   INFO-19: only Positive and Negative are built.
//   A11Y-12, A11Y-17 to A11Y-19: grayscale, tall scripts, Arabic and long languages not tested overnight.
const meta: Meta<{ data: ShiftDashboardData }> = {
  title: 'Slides/Multiple location/Shift dashboard',
  ...slideRender<ShiftDashboardData>(ShiftDashboard, 'Shift dashboard'),
}
export default meta
type Story = StoryObj<typeof meta>

export const Positive: Story = { args: { data: shiftDashboardPositive } }
export const Negative: Story = { args: { data: shiftDashboardNegative } }
