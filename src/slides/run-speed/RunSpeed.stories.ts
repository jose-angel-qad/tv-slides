import type { Meta, StoryObj } from '@storybook/vue3-vite'
import RunSpeed from './RunSpeed.vue'
import { slideRender } from '../_shared/slideStory'
import { runSpeedNegative, runSpeedNoEta, runSpeedPositive } from './mock'
import type { RunSpeedData } from './types'

// Run speed (Single location): speed slide for the selected location.
// Key question: is the run ahead or behind, and when will it finish? Kept.
// Template T3 Hero + support. Reused: KPI tile large, Stat tile, Chart card.
// Created: Progress bar (Data display), replacing the race track.
//
// Checklists (Light and Dark, 1920 x 1080)
// Passed: A11Y-01 to A11Y-11, A11Y-13 to A11Y-16, A11Y-20; INFO-01 to INFO-18, INFO-20 to INFO-25;
//   BRAND-01 to BRAND-07, BRAND-09 to BRAND-12.
// Failed or not verified:
//   BRAND-09: new component (Progress bar), pending approval.
//   INFO-19: only Positive, Negative and ETA not available are built.
//   A11Y-12, A11Y-17 to A11Y-19: grayscale, tall scripts, Arabic and long languages not tested overnight.
const meta: Meta<{ data: RunSpeedData }> = {
  title: 'Slides/Single location/Run speed',
  ...slideRender<RunSpeedData>(RunSpeed, 'Run speed'),
}
export default meta
type Story = StoryObj<typeof meta>

export const Positive: Story = { args: { data: runSpeedPositive } }
export const Negative: Story = { args: { data: runSpeedNegative } }
export const NoEta: Story = { name: 'ETA not available', args: { data: runSpeedNoEta } }
