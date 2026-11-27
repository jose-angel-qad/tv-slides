import type { Meta, StoryObj } from '@storybook/vue3-vite'
import Leaderboard from './Leaderboard.vue'
import { slideRender } from '../_shared/slideStory'
import { leaderboardNegative, leaderboardPositive, leaderboardStart } from './mock'
import type { LeaderboardData } from './types'

// Leaderboard (Multiple location): accumulated Victory Points for the current shift.
// Key question: who is winning this shift, and by how much? Kept.
// Template T2 List + support. Reused: Chart card, Bar list, Stat tile. Created: none.
// Positive: clear leader. Negative: tie for first, low scores. Start: everyone at 0.
//
// Checklists (Light and Dark, 1920 x 1080)
// Passed: A11Y-01 to A11Y-11, A11Y-13 to A11Y-16, A11Y-20; INFO-01 to INFO-03, INFO-06 to INFO-16,
//   INFO-18, INFO-20 to INFO-25; BRAND-01 to BRAND-12.
// Failed or not verified:
//   INFO-04, INFO-05: gamification has no target, so there is no primary feedback (by design).
//   INFO-17: not applicable.
//   INFO-19: only Positive, Negative (tie) and Start are built.
//   A11Y-12, A11Y-17 to A11Y-19: grayscale, tall scripts, Arabic and long languages not tested overnight.
const meta: Meta<{ data: LeaderboardData }> = {
  title: 'Slides/Multiple location/Leaderboard',
  ...slideRender<LeaderboardData>(Leaderboard, 'Leaderboard'),
}
export default meta
type Story = StoryObj<typeof meta>

export const Positive: Story = { args: { data: leaderboardPositive } }
export const Negative: Story = { name: 'Negative, tie for first', args: { data: leaderboardNegative } }
export const Start: Story = { name: 'Start of shift, all at 0', args: { data: leaderboardStart } }
