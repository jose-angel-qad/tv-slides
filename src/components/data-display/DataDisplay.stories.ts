import type { Meta, StoryObj } from '@storybook/vue3-vite'
import StoryFrame from '../_story/StoryFrame.vue'
import CrewSizeIndicator from './CrewSizeIndicator.vue'

const meta: Meta = { title: 'Components/Data display' }
export default meta

export const CrewSize: StoryObj = {
  name: 'Crew size indicator',
  render: () => ({
    components: { StoryFrame, CrewSizeIndicator },
    template: `<StoryFrame>
      <div style="display: grid; grid-template-columns: repeat(3, 430px); gap: 24px">
        <CrewSizeIndicator :crew="6.2" :target="6.2" />
        <CrewSizeIndicator :crew="6.6" :target="6.2" />
        <CrewSizeIndicator :crew="4.8" :target="6.2" />
      </div>
    </StoryFrame>`,
  }),
}
