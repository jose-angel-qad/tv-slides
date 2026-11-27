import type { Meta, StoryObj } from '@storybook/vue3-vite'
import ThroughputDashboard from './ThroughputDashboard.vue'
import { slideRender } from '../_shared/slideStory'
import { throughputDashboardNegative, throughputDashboardPositive } from './mock'
import type { ThroughputDashboardData } from './types'

// Throughput dashboard (Multiple location): unit-based performance.
// Key question: how many units has each line made versus plan? Kept.
// Template T4 Table, with one Chart card per location. Reused: Chart card, Status value,
// Mini hourly bars. Created: none. Positive: all ahead, one without a crew target.
// Negative: three behind plan, crew below target, long name.
//
// Checklists (Light and Dark, 1920 x 1080)
// Passed: A11Y-01 to A11Y-11, A11Y-13 to A11Y-16, A11Y-20; INFO-01 to INFO-03, INFO-06 to INFO-15,
//   INFO-17, INFO-18, INFO-20 to INFO-25; BRAND-01 to BRAND-12.
// Failed or not verified:
//   INFO-04, INFO-05: no single main KPI on a multiple location slide (see questions.md).
//   INFO-16: the compact bars have no labeled target line; the target is written in the caption.
//   INFO-19: only Positive and Negative are built.
//   A11Y-12, A11Y-17 to A11Y-19: grayscale, tall scripts, Arabic and long languages not tested overnight.
const meta: Meta<{ data: ThroughputDashboardData }> = {
  title: 'Slides/Multiple location/Throughput dashboard',
  ...slideRender<ThroughputDashboardData>(ThroughputDashboard, 'Throughput dashboard'),
}
export default meta
type Story = StoryObj<typeof meta>

export const Positive: Story = { args: { data: throughputDashboardPositive } }
export const Negative: Story = { args: { data: throughputDashboardNegative } }
