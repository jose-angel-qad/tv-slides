import type { Meta, StoryObj } from '@storybook/vue3-vite'
import Scoreboard from './Scoreboard.vue'
import { slideRender } from '../_shared/slideStory'
import { scoreboardNegative, scoreboardPositive } from './mock'
import type { ScoreboardData } from './types'

// Scoreboard (Multiple location): overview of shift stats.
// Key question: which lines are on track this shift? Kept.
// Template T4 Table. Reused: Chart card, Location table, Status value. Created: none.
// Positive: 5 locations on track. Negative: 8 locations, several below target, metrics with no value yet.
//
// Checklists (Light and Dark, 1920 x 1080)
// Passed: A11Y-01 to A11Y-11, A11Y-13 to A11Y-16, A11Y-20; INFO-01 to INFO-03, INFO-06 to INFO-16,
//   INFO-18, INFO-20 to INFO-25; BRAND-01 to BRAND-12.
// Failed or not verified:
//   INFO-04, INFO-05: no single main KPI on a multiple location slide (see questions.md).
//   INFO-10: the row hero uses the slide title role (see Shift dashboard).
//   INFO-17: not applicable.
//   INFO-19: only Positive and Negative are built.
//   A11Y-12, A11Y-17 to A11Y-19: grayscale, tall scripts, Arabic and long languages not tested overnight.
//   Must show is partial: ramp up, power hour, huddles and SKUs are dropped to keep 4 columns.
const meta: Meta<{ data: ScoreboardData }> = {
  title: 'Slides/Multiple location/Scoreboard',
  ...slideRender<ScoreboardData>(Scoreboard, 'Scoreboard'),
}
export default meta
type Story = StoryObj<typeof meta>

export const Positive: Story = { args: { data: scoreboardPositive } }
export const Negative: Story = { args: { data: scoreboardNegative } }
