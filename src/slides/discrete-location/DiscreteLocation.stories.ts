import type { Meta, StoryObj } from '@storybook/vue3-vite'
import DiscreteLocation from './DiscreteLocation.vue'
import { slideRender } from '../_shared/slideStory'
import { discreteLocationNegative, discreteLocationPositive } from './mock'
import type { DiscreteLocationData } from './types'

// Discrete location (Single location): overview of a step (discrete) location.
// Key question: how many units are finished, and is the line on pace? Kept.
// Template T3 Hero + support. Reused: KPI tile large, Stat tile, Chart card, Hourly bar chart,
// Chart legend item. Created: none. The quality pie is replaced by one number (INFO-15).
//
// Checklists (Light and Dark, 1920 x 1080)
// Passed: A11Y-01 to A11Y-11, A11Y-13 to A11Y-16, A11Y-20; INFO-01 to INFO-18, INFO-20 to INFO-25;
//   BRAND-01 to BRAND-12.
// Failed or not verified:
//   INFO-19: only Positive and Negative are built.
//   A11Y-12, A11Y-17 to A11Y-19: grayscale, tall scripts, Arabic and long languages not tested overnight.
const meta: Meta<{ data: DiscreteLocationData }> = {
  title: 'Slides/Single location/Discrete location',
  ...slideRender<DiscreteLocationData>(DiscreteLocation, 'Discrete location'),
}
export default meta
type Story = StoryObj<typeof meta>

export const Positive: Story = { args: { data: discreteLocationPositive } }
export const Negative: Story = { args: { data: discreteLocationNegative } }
