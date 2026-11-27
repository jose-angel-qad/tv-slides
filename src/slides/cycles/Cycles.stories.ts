import type { Meta, StoryObj } from '@storybook/vue3-vite'
import Cycles from './Cycles.vue'
import { slideRender } from '../_shared/slideStory'
import { cyclesNegative, cyclesPositive } from './mock'
import type { CyclesData } from './types'

// Cycles (Single location): overview of cycle progress by asset.
// Key question: is each asset's cycle on time? Kept.
// Template T2 List + support. Reused: Chart card, Bar list, KPI tile large, Stat tile, Chart legend item.
// Created: none. Positive: all active or inactive. Negative: overrun, rejected, no product.
//
// Checklists (Light and Dark, 1920 x 1080)
// Passed: A11Y-01 to A11Y-11, A11Y-13 to A11Y-16, A11Y-20; INFO-01 to INFO-16, INFO-18, INFO-20 to INFO-25;
//   BRAND-01 to BRAND-12.
// Failed or not verified:
//   INFO-17: not applicable; active cycles are hatched as in progress.
//   INFO-19: only Positive and Negative are built.
//   A11Y-12, A11Y-17 to A11Y-19: grayscale, tall scripts, Arabic and long languages not tested overnight.
const meta: Meta<{ data: CyclesData }> = {
  title: 'Slides/Single location/Cycles',
  ...slideRender<CyclesData>(Cycles, 'Cycles'),
}
export default meta
type Story = StoryObj<typeof meta>

export const Positive: Story = { args: { data: cyclesPositive } }
export const Negative: Story = { args: { data: cyclesNegative } }
