import type { Meta, StoryObj } from '@storybook/vue3-vite'
import Welcome from './Welcome.vue'
import { slideRender } from '../_shared/slideStory'
import { welcomeNegative, welcomePositive } from './mock'
import type { WelcomeData } from './types'

// Welcome (Other): welcome slides for new hires.
// Key question: who joined us this week? Kept.
// Template T4 (one card). Reused: Chart card, Empty state message, Material icon.
// Created: Person card (Content). Positive: three new hires, one without a photo, one long name.
// Negative: no new hires this week.
//
// Checklists (Light and Dark, 1920 x 1080)
// Passed: A11Y-01 to A11Y-11, A11Y-13 to A11Y-17, A11Y-20; INFO-01, INFO-02, INFO-07, INFO-08, INFO-10,
//   INFO-20 to INFO-24; BRAND-01 to BRAND-08, BRAND-10 to BRAND-12.
// Not applicable: INFO-03 to INFO-06, INFO-09, INFO-11 to INFO-18, INFO-25.
// Failed or not verified:
//   BRAND-09: new component (Person card), pending approval.
//   INFO-19: loading and stale states are not built.
//   A11Y-12, A11Y-18, A11Y-19: not tested overnight. The start date format is hard-coded to en-US.
const meta: Meta<{ data: WelcomeData }> = {
  title: 'Slides/Other/Welcome',
  ...slideRender<WelcomeData>(Welcome, 'Welcome'),
}
export default meta
type Story = StoryObj<typeof meta>

export const Positive: Story = { args: { data: welcomePositive } }
export const Negative: Story = { name: 'Negative, no new hires', args: { data: welcomeNegative } }
