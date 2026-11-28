import type { Meta, StoryObj } from '@storybook/vue3-vite'
import News from './News.vue'
import { slideRender } from '../_shared/slideStory'
import { newsFew, newsLong, newsNegative, newsPositive } from './mock'
import type { NewsData } from './types'

// News (Other). Status: Pending approval (round 2). Feed: Few items, Many items (paged), Long text, No news.
// Key question: what happened recently that I should know? One row card per item, newest first.
const meta: Meta<{ data: NewsData }> = {
  title: 'Slides/Other/News',
  ...slideRender<NewsData>(News, 'News'),
}
export default meta
type Story = StoryObj<typeof meta>

export const FewItems: Story = { name: 'Few items', args: { data: newsFew } }
export const ManyItems: Story = { name: 'Many items', args: { data: newsPositive } }
export const LongText: Story = { name: 'Long text', args: { data: newsLong } }
export const NoNews: Story = { name: 'No news', args: { data: newsNegative } }
