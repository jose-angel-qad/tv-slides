import type { Meta, StoryObj } from '@storybook/vue3-vite'
import LineBalance from './LineBalance.vue'
import { slideRender } from '../_shared/slideStory'
import { lineBalanceNegative, lineBalancePositive } from './mock'
import type { LineBalanceData } from './types'

// Line balance (Single location): steps completed count and WIP count.
// Key question: where is work piling up? Kept.
// Template T3 Hero + support. Reused: KPI tile large, Stat tile, Chart card.
// Created: Step flow chart (Data viz). Positive: work flowing. Negative: clear bottleneck, long step names.
//
// Checklists (Light and Dark, 1920 x 1080)
// Passed: A11Y-01 to A11Y-11, A11Y-13 to A11Y-16, A11Y-20; INFO-01 to INFO-16, INFO-18, INFO-20 to INFO-25;
//   BRAND-01 to BRAND-08, BRAND-10 to BRAND-12.
// Failed or not verified:
//   INFO-17: not applicable (no hourly chart).
//   BRAND-09: new component (Step flow chart), pending approval.
//   INFO-19: only Positive and Negative are built.
//   A11Y-12, A11Y-17 to A11Y-19: grayscale, tall scripts, Arabic and long languages not tested overnight.
const meta: Meta<{ data: LineBalanceData }> = {
  title: 'Slides/Single location/Line balance',
  ...slideRender<LineBalanceData>(LineBalance, 'Line balance'),
}
export default meta
type Story = StoryObj<typeof meta>

export const Positive: Story = { args: { data: lineBalancePositive } }
export const Negative: Story = { args: { data: lineBalanceNegative } }
