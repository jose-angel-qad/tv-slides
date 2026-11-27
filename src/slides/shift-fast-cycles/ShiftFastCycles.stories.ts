import type { Meta, StoryObj } from '@storybook/vue3-vite'
import ShiftFastCycles from './ShiftFastCycles.vue'
import { slideRender } from '../_shared/slideStory'
import { shiftFastCyclesNegative, shiftFastCyclesPositive } from './mock'
import type { ShiftFastCyclesData } from './types'

// Shift (Fast cycles) (Single location): shift overview for a Fast Cycles location.
// Key question: is the shift on cycle time target? Kept.
// Template T2 List + support. Reused: KPI tile large, Stat tile, Chart card, Bar list, Chart legend item.
// Created: none (shared helpers in `_shared/fastCycles.ts`).
// Negative: over target, one asset not reporting, OEE below target, long names.
//
// Checklists (Light and Dark, 1920 x 1080)
// Passed: A11Y-01 to A11Y-11, A11Y-13 to A11Y-16, A11Y-20; INFO-01 to INFO-16, INFO-18, INFO-20 to INFO-25;
//   BRAND-01 to BRAND-12.
// Failed or not verified:
//   INFO-17: not applicable (no hourly chart).
//   INFO-19: only Positive and Negative are built.
//   A11Y-12, A11Y-17 to A11Y-19: grayscale, tall scripts, Arabic and long languages not tested overnight.
const meta: Meta<{ data: ShiftFastCyclesData }> = {
  title: 'Slides/Single location/Shift (Fast cycles)',
  ...slideRender<ShiftFastCyclesData>(ShiftFastCycles, 'Shift (Fast cycles)'),
}
export default meta
type Story = StoryObj<typeof meta>

export const Positive: Story = { args: { data: shiftFastCyclesPositive } }
export const Negative: Story = { args: { data: shiftFastCyclesNegative } }
