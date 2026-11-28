import type { Meta, StoryObj } from '@storybook/vue3-vite'
import UnitsManHour from './UnitsManHour.vue'
import { slideRender } from '../_shared/slideStory'
import { unitsManHourNegative, unitsManHourPositive } from './mock'
import type { UnitsManHourData } from './types'

// Units/man hour (Single location). Status: Pending approval (round 2).
// Key question: is labor productivity on target each hour? The hourly chart fills the body, like Hourly OEE (shared body
// `_shared/HourlyTargetChart.vue`). Positive: on target, partial current hour. Negative: below target,
// long location name. Design plan in the slide's .vue file.
const meta: Meta<{ data: UnitsManHourData }> = {
  title: 'Slides/Single location/Units per man hour',
  ...slideRender<UnitsManHourData>(UnitsManHour, 'Units per man hour'),
}
export default meta
type Story = StoryObj<typeof meta>

export const Positive: Story = { args: { data: unitsManHourPositive } }
export const Negative: Story = { args: { data: unitsManHourNegative } }
