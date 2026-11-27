import type { Meta, StoryObj } from '@storybook/vue3-vite'
import StoryFrame from '../_story/StoryFrame.vue'
import CrewSizeIndicator from './CrewSizeIndicator.vue'
import ProgressBar from './ProgressBar.vue'

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

// Completed of planned. Text sits outside the fill; the marker shows pace or target.
export const Progress: StoryObj = {
  name: 'Progress bar',
  render: () => ({
    components: { StoryFrame, ProgressBar },
    template: `<StoryFrame :width="1200">
      <ProgressBar :value="15400" :max="22900" label="466DHR GOLD PACKS 11 OZ 12 CS" value-text="15,400 of 22,900 cases" :marker="15060" marker-label="Pace 15,060" />
      <ProgressBar :value="9800" :max="22900" label="7781BX ORGANIC VANILLA ALMOND BEVERAGE 32 OZ ASEPTIC CARTON 6 PACK" value-text="9,800 of 22,900 cases" />
      <ProgressBar :value="640" :max="900" size="sm" in-progress value-text="10:40 of 15:00" />
    </StoryFrame>`,
  }),
}
