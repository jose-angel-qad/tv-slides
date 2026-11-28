import type { Meta, StoryObj } from '@storybook/vue3-vite'
import Leaderboard from './Leaderboard.vue'
import { slideRender } from '../_shared/slideStory'
import { leaderboardNegative, leaderboardPositive, leaderboardStart } from './mock'
import type { LeaderboardData } from './types'

// Leaderboard (Multiple location). Status: Pending approval (round 2). Data without a target.
// Key question: who is winning this shift, and by how much? Ranked bars of points, full body; the
// title names the leader and the margin. Default: clear leader. Tie for first. Start of shift: all at 0.
const meta: Meta<{ data: LeaderboardData }> = {
  title: 'Slides/Multiple location/Leaderboard',
  ...slideRender<LeaderboardData>(Leaderboard, 'Leaderboard'),
}
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { args: { data: leaderboardPositive } }
export const Tie: Story = { name: 'Tie for first', args: { data: leaderboardNegative } }
export const StartOfShift: Story = { name: 'Start of shift', args: { data: leaderboardStart } }
