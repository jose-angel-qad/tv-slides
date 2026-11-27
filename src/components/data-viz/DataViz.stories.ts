import type { Meta, StoryObj } from '@storybook/vue3-vite'
import StoryFrame from '../_story/StoryFrame.vue'
import { guideParameters, guideRender } from '../../stories/docs/guide'
import HourlyBarChart from './HourlyBarChart.vue'
import ChartLegendItem from './ChartLegendItem.vue'
import LineChart from './LineChart.vue'
import BarList from './BarList.vue'

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

// Line chart: count rate with a target, and a control chart with limits and flagged points.
const t0 = new Date(2026, 10, 18, 14).getTime()
const rate = [438, 446, 452, 449, 441, 0, 0, 312, 446, 452, 455, 449, 443, 450, 458, 452, 447, 441, 449].map((value, i) => ({ t: new Date(t0 + i * 1_200_000), value }))
const xbar = [12.02, 12.05, 11.98, 12.01, 12.08, 12.11, 11.96, 12.03, 12.19, 12.04, 11.99, 12.02].map((value, i) => ({ t: new Date(t0 + i * 1_800_000), value }))
export const Line: StoryObj = {
  name: 'Line chart',
  render: () => ({
    components: { StoryFrame, LineChart },
    setup: () => ({ rate, xbar, f2: (n: number) => n.toFixed(2) }),
    template: `<StoryFrame>
      <LineChart :points="rate" :lines="[{ value: 440, label: 'Target' }]" area :width="1792" :height="360" />
      <LineChart :points="xbar" :lines="[{ value: 12.15, label: 'UCL' }, { value: 12.03, label: 'Center' }, { value: 11.91, label: 'LCL' }]" :zero-based="false" show-points flag-outside :format="f2" :width="1792" :height="360" />
    </StoryFrame>`,
  }),
}

// Bar list: ranked rows on one shared scale, value outside the bar, status icon on problem rows.
const barRows = [
  { id: '1', label: 'Changeover', detail: 'Planned', value: 48, valueText: '48m' },
  { id: '2', label: 'Filler jam at the capper infeed star wheel', detail: 'Availability', value: 31, valueText: '31m' },
  { id: '3', label: 'Slow running', detail: 'Performance', value: 22, valueText: '22m' },
  { id: '4', label: 'Overrun', detail: 'Kettle 3', value: 18, valueText: '3:10 over', status: 'negative' },
  { id: '5', label: 'Current cycle', detail: 'Kettle 1', value: 12, valueText: '8:40 left', inProgress: true },
]
export const Bars: StoryObj = {
  name: 'Bar list',
  render: () => ({
    components: { StoryFrame, BarList },
    setup: () => ({ barRows }),
    template: `<StoryFrame :width="1400"><BarList :rows="barRows" :target="40" /></StoryFrame>`,
  }),
}
