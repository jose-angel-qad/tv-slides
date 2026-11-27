import type { Meta, StoryObj } from '@storybook/vue3-vite'
import Operations from './Operations.vue'
import { slideRender } from '../_shared/slideStory'
import { operationsBasic, operationsNegative, operationsPositive } from './mock'
import type { OperationsData } from './types'

// Operations (Single location): location operations page. Breakdowns with Reliability,
// pending data sheets with Compliance.
// Key question: what needs attention on this line right now? Kept.
// Template T3 Hero + support. Reused: KPI tile large, Stat tile, Chart card, Bar list, Line chart.
// Created: none. Stories: Positive, Negative (Reliability and Compliance on), Reliability and
// Compliance off.
//
// Checklists (Light and Dark, 1920 x 1080)
// Passed: A11Y-01 to A11Y-11, A11Y-13 to A11Y-16, A11Y-20; INFO-01 to INFO-16, INFO-18, INFO-20 to INFO-22,
//   INFO-24, INFO-25; BRAND-01 to BRAND-12.
// Failed or not verified:
//   INFO-23: the product name is one context line in a half-width card; a long name wraps but
//     competes with the chart height.
//   INFO-17: not applicable (line chart).
//   INFO-19: only three states are built.
//   A11Y-12, A11Y-17 to A11Y-19: grayscale, tall scripts, Arabic and long languages not tested overnight.
const meta: Meta<{ data: OperationsData }> = {
  title: 'Slides/Single location/Operations',
  ...slideRender<OperationsData>(Operations, 'Operations'),
}
export default meta
type Story = StoryObj<typeof meta>

export const Positive: Story = { args: { data: operationsPositive } }
export const Negative: Story = { args: { data: operationsNegative } }
export const Basic: Story = { name: 'Reliability and Compliance off', args: { data: operationsBasic } }
