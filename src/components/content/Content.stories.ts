import type { Meta, StoryObj } from '@storybook/vue3-vite'
import StoryFrame from '../_story/StoryFrame.vue'
import NewsItem from './NewsItem.vue'

const meta: Meta = { title: 'Components/Content' }
export default meta

// News item: type icon, type in words with author and time, then the text, which wraps.
export const News: StoryObj = {
  name: 'News item',
  render: () => ({
    components: { StoryFrame, NewsItem },
    template: `<StoryFrame :width="1400">
      <NewsItem type="alert" author="Quality" time="7:40 PM" text="Hold on lot 4471-B until the seal integrity check is complete. Do not ship pallets from Line 3 until Quality releases them on the hold board." />
      <NewsItem type="chat" author="Sam Patel" time="6:55 PM" text="Forklift training moved to Thursday at 2:00 PM in the break room." />
      <NewsItem type="high-five" author="Plant manager" time="5:30 PM" text="30 days without a recordable injury. Thank you, everyone." />
    </StoryFrame>`,
  }),
}
