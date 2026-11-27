import type { Meta, StoryObj } from '@storybook/vue3-vite'
import StoryFrame from '../_story/StoryFrame.vue'
import { guideParameters, guideRender } from '../../stories/docs/guide'
import HourlyBarChart from './HourlyBarChart.vue'
import ChartLegendItem from './ChartLegendItem.vue'

const meta: Meta = { title: 'Components/Data viz' }
export default meta

const at = (h: number) => new Date(2026, 10, 18, h)
const points = [453, 459, 433, 425, 402, 439, 454, 408, 446, 154].map((value, i) => ({ hour: at(11 + i), value }))

export const Hourly: StoryObj = {
  name: 'Hourly bar chart',
  render: () => ({
    components: { StoryFrame, HourlyBarChart },
    setup: () => ({ points }),
    template: `<StoryFrame>
      <HourlyBarChart :points="points" :target="440" :current-index="9" :width="1792" :height="420" />
    </StoryFrame>`,
  }),
}

// Edge cases: target on a gridline (its axis label is hidden), thousands per hour, target near zero.
const big = [4850, 5120, 4410, 4990, 5230, 3980, 5060, 4720, 5010, 1640].map((value, i) => ({ hour: at(11 + i), value }))
const low = [120, 95, 140, 60, 180, 130, 110, 150, 125, 40].map((value, i) => ({ hour: at(11 + i), value }))

export const HourlyEdgeCases: StoryObj = {
  name: 'Hourly bar chart, edge cases',
  render: () => ({
    components: { StoryFrame, HourlyBarChart },
    setup: () => ({ points, big, low }),
    template: `<StoryFrame>
      <HourlyBarChart :points="points" :target="300" :current-index="9" :width="1792" :height="300" />
      <HourlyBarChart :points="big" :target="5000" :current-index="9" :width="1792" :height="300" />
      <HourlyBarChart :points="low" :target="20" :current-index="9" :width="1792" :height="300" />
    </StoryFrame>`,
  }),
}

export const Legend: StoryObj = {
  name: 'Chart legend item',
  render: () => ({
    components: { StoryFrame, ChartLegendItem },
    template: `<StoryFrame>
      <ul style="display: flex; gap: 32px; margin: 0; padding: 0; list-style: none">
        <ChartLegendItem type="on-target" label="On target" />
        <ChartLegendItem type="below-target" label="Below target" />
        <ChartLegendItem type="in-progress" label="In progress" />
        <ChartLegendItem type="target" label="Target" />
      </ul>
    </StoryFrame>`,
  }),
}

// Guidelines for the Docs page (see the .mdx next to this file). Hidden from the sidebar.
export const HourlyBarGuide: StoryObj = {
  name: 'Hourly bar chart guidelines',
  tags: ['!dev', 'guide'],
  parameters: guideParameters,
  render: guideRender('hourly-bar'),
}
