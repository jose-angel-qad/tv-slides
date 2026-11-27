import type { Meta, StoryObj } from '@storybook/vue3-vite'
import SpcDashboard from './SpcDashboard.vue'
import { slideRender } from '../_shared/slideStory'
import { spcDashboardNegative, spcDashboardPositive } from './mock'
import type { SpcDashboardData } from './types'

// SPC dashboard (Multiple location). PROPOSAL: the definition is pending and the slide was only
// captured with no data. Built from the design guide as a list of characteristics.
// Key question: is each monitored characteristic in control? Kept.
// Template T4 Table. Reused: Chart card, Location table, Status value. Created: none.
// Positive: all in control. Negative: two out of control, Cpk below target, long name.
//
// Checklists (Light and Dark, 1920 x 1080)
// Passed: A11Y-01 to A11Y-11, A11Y-13 to A11Y-16, A11Y-20; INFO-01 to INFO-03, INFO-06 to INFO-16,
//   INFO-18, INFO-20 to INFO-25; BRAND-01 to BRAND-12.
// Failed or not verified:
//   INFO-04, INFO-05: no single main KPI on a multiple location slide.
//   INFO-10: the row hero uses the slide title role (see Shift dashboard).
//   INFO-19: only Positive and Negative are built.
//   A11Y-12, A11Y-17 to A11Y-19: grayscale, tall scripts, Arabic and long languages not tested overnight.
const meta: Meta<{ data: SpcDashboardData }> = {
  title: 'Slides/Multiple location/SPC dashboard',
  ...slideRender<SpcDashboardData>(SpcDashboard, 'SPC dashboard'),
}
export default meta
type Story = StoryObj<typeof meta>

export const Positive: Story = { args: { data: spcDashboardPositive } }
export const Negative: Story = { args: { data: spcDashboardNegative } }
