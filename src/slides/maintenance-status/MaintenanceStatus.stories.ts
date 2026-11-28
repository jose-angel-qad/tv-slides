import type { Meta, StoryObj } from '@storybook/vue3-vite'
import MaintenanceStatus from './MaintenanceStatus.vue'
import { slideRender } from '../_shared/slideStory'
import { maintenanceStatusNegative, maintenanceStatusPositive } from './mock'
import type { MaintenanceStatusData } from './types'

// Maintenance status (Multiple location). Status: Pending approval (round 2). Proposal: definition pending.
// Key question: which lines need maintenance attention now? Row hero: Run status badge with the issue
// or product; four counts spelled out, a status only at or above their limit.
// Positive: all running, counts under limits. Negative: two active issues, counts over limits, long name.
const meta: Meta<{ data: MaintenanceStatusData }> = {
  title: 'Slides/Multiple location/Maintenance status',
  ...slideRender<MaintenanceStatusData>(MaintenanceStatus, 'Maintenance status'),
}
export default meta
type Story = StoryObj<typeof meta>

export const Positive: Story = { args: { data: maintenanceStatusPositive } }
export const Negative: Story = { args: { data: maintenanceStatusNegative } }
