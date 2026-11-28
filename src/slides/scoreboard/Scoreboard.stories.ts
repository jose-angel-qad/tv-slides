import type { Meta, StoryObj } from '@storybook/vue3-vite'
import Scoreboard from './Scoreboard.vue'
import { slideRender } from '../_shared/slideStory'
import { scoreboardNegative, scoreboardPositive } from './mock'
import type { ScoreboardData } from './types'

// Scoreboard (Multiple location). Status: Pending approval (round 2).
// Key question: which lines are on track this shift? Row hero: shift OEE in a Metric cell; start,
// changeover and points. Positive: five lines on target. Negative: page 1 of 2, below target, late
// starts, slow changeovers, values not in yet, long name.
const meta: Meta<{ data: ScoreboardData }> = {
  title: 'Slides/Multiple location/Scoreboard',
  ...slideRender<ScoreboardData>(Scoreboard, 'Scoreboard'),
}
export default meta
type Story = StoryObj<typeof meta>

export const Positive: Story = { args: { data: scoreboardPositive } }
export const Negative: Story = { args: { data: scoreboardNegative } }
