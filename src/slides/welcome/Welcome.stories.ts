import type { Meta, StoryObj } from '@storybook/vue3-vite'
import Welcome from './Welcome.vue'
import { slideRender } from '../_shared/slideStory'
import { welcomeMany, welcomeNegative, welcomeOne, welcomePositive } from './mock'
import type { WelcomeData } from './types'

// Welcome (Other). Status: Pending approval (round 2). Content container: no positive or negative state.
// Key question: who joined us this week? Person cards fill the body. Stories: One new hire, Several
// (one without a photo, a long name), Many (page 1 of 2), No new hires.
const meta: Meta<{ data: WelcomeData }> = {
  title: 'Slides/Other/Welcome',
  ...slideRender<WelcomeData>(Welcome, 'Welcome'),
}
export default meta
type Story = StoryObj<typeof meta>

export const One: Story = { name: 'One new hire', args: { data: welcomeOne } }
export const Several: Story = { name: 'Several new hires', args: { data: welcomePositive } }
export const Many: Story = { name: 'Many new hires', args: { data: welcomeMany } }
export const NoNewHires: Story = { name: 'No new hires', args: { data: welcomeNegative } }
