import type { Meta, StoryObj } from '@storybook/vue3-vite'
import MaintenanceStatus from './MaintenanceStatus.vue'
import { slideRender } from '../_shared/slideStory'
import { maintenanceStatusNegative, maintenanceStatusPositive } from './mock'
import type { MaintenanceStatusData } from './types'

// Maintenance status (Multiple location). PROPOSAL: the definition is pending (not in the
// Knowledge Base). Built from the audit capture and the design guide.
// Key question: which lines need maintenance attention now? Kept.
// Template T4 Table. Reused: Chart card, Location table, Status value. Created: none.
// Positive: all lines running, counts under their limits. Negative: active issues, counts over limits.
//
// Checklists (Light and Dark, 1920 x 1080)
// Passed: A11Y-01 to A11Y-11, A11Y-13 to A11Y-16, A11Y-20; INFO-01 to INFO-03, INFO-06 to INFO-08,
//   INFO-10 to INFO-16, INFO-18, INFO-20 to INFO-23, INFO-25; BRAND-01 to BRAND-12.
// Failed or not verified:
//   INFO-09: five columns (Now plus four counts) to keep every count in "must show".
//   INFO-24: PM, WO, CL and OD are spelled out with assumed meanings (see questions.md).
//   INFO-04, INFO-05: no single main KPI on a multiple location slide.
//   INFO-19: only Positive and Negative are built.
//   A11Y-12, A11Y-17 to A11Y-19: grayscale, tall scripts, Arabic and long languages not tested overnight.
const meta: Meta<{ data: MaintenanceStatusData }> = {
  title: 'Slides/Multiple location/Maintenance status',
  ...slideRender<MaintenanceStatusData>(MaintenanceStatus, 'Maintenance status'),
}
export default meta
type Story = StoryObj<typeof meta>

export const Positive: Story = { args: { data: maintenanceStatusPositive } }
export const Negative: Story = { args: { data: maintenanceStatusNegative } }
