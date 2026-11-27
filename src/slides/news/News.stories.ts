import type { Meta, StoryObj } from '@storybook/vue3-vite'
import News from './News.vue'
import { slideRender } from '../_shared/slideStory'
import { newsNegative, newsPositive } from './mock'
import type { NewsData } from './types'

// News (Other): recent alerts, chats and high fives.
// Key question: what happened recently that I should know? Kept.
// Template T4 (one card). Reused: Chart card, Status icon, Material icon (new content icons).
// Created: News item (Content), Empty state message (Feedback).
// Positive: one page of four items. Negative: no news yet (empty state).
//
// Checklists (Light and Dark, 1920 x 1080)
// Passed: A11Y-01 to A11Y-11, A11Y-13 to A11Y-17, A11Y-20; INFO-01, INFO-02, INFO-06 to INFO-08,
//   INFO-10, INFO-11, INFO-20 to INFO-24; BRAND-01 to BRAND-08, BRAND-10 to BRAND-12.
// Not applicable: INFO-03 to INFO-05, INFO-09, INFO-13 to INFO-18, INFO-25 (no values or charts).
// Failed or not verified:
//   BRAND-09: new components (News item, Empty state message), pending approval.
//   INFO-19: only Positive and Negative (empty) are built.
//   A11Y-12, A11Y-18, A11Y-19: grayscale, Arabic and long languages not tested overnight.
const meta: Meta<{ data: NewsData }> = {
  title: 'Slides/Other/News',
  ...slideRender<NewsData>(News, 'News'),
}
export default meta
type Story = StoryObj<typeof meta>

export const Positive: Story = { args: { data: newsPositive } }
export const Negative: Story = { name: 'Negative, no news yet', args: { data: newsNegative } }
