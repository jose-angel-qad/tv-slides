import type { Meta, StoryObj } from '@storybook/vue3-vite'
import StoryFrame from '../_story/StoryFrame.vue'
import EmptyState from './EmptyState.vue'

const meta: Meta = { title: 'Components/Feedback' }
export default meta

// Empty state: one wording and position for every slide with no data yet.
export const Empty: StoryObj = {
  name: 'Empty state message',
  render: () => ({
    components: { StoryFrame, EmptyState },
    template: `<StoryFrame :width="1200">
      <div style="height: 360px; display: flex"><EmptyState title="No news yet" detail="Alerts, chats and high fives from the last 24 hours show here." /></div>
      <div style="height: 360px; display: flex"><EmptyState icon="person" title="No new hires this week" /></div>
    </StoryFrame>`,
  }),
}
