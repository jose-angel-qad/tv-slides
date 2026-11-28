import type { Meta, StoryObj } from '@storybook/vue3-vite'
import StoryFrame from '../_story/StoryFrame.vue'
import { guideParameters, guideRender } from '../../stories/docs/guide'
import KpiTile from './KpiTile.vue'
import StatTile from './StatTile.vue'
import FactCard from './FactCard.vue'

const meta: Meta = { title: 'Components/Card' }
export default meta
type Story = StoryObj

// Primary KPI: larger value, feedback only through the Status band. One story per state.
const kpiStory = (bandStatus: string, value: string, bandText: string): Story => ({
  render: () => ({
    components: { StoryFrame, KpiTile },
    setup: () => ({ bandStatus, value, bandText }),
    template: `<StoryFrame :width="932">
      <KpiTile title="Cases produced this run" subtitle="466DHR GOLD PACKS 11 OZ 12 CS" :value="value" unit="of 22,900" :band-status="bandStatus" :band-text="bandText" />
    </StoryFrame>`,
  }),
})
export const KpiTilePositive: Story = { name: 'KPI tile, large, positive', ...kpiStory('positive', '19,230', '6 ahead of plan') }
export const KpiTileWarning: Story = { name: 'KPI tile, large, warning', ...kpiStory('warning', '19,130', '100 behind plan') }
export const KpiTileNegative: Story = { name: 'KPI tile, large, negative', ...kpiStory('negative', '18,970', '260 behind plan') }

// Secondary KPI: smaller value, feedback only through the Status line in the footer.
export const Stat: Story = {
  name: 'Stat tile',
  render: () => ({
    components: { StoryFrame, StatTile },
    template: `<StoryFrame>
      <div style="display: grid; grid-template-columns: repeat(3, 430px); gap: 24px">
        <StatTile title="Estimated finish" value="4:42" unit="AM" subtitle="8h 22m left" status="positive" status-text="On schedule" />
        <StatTile title="Estimated finish" value="4:56" unit="AM" subtitle="8h 36m left" status="warning" status-text="14m late" />
        <StatTile title="Estimated finish" value="5:17" unit="AM" subtitle="8h 57m left" status="negative" status-text="35m late" />
      </div>
      <div style="display: grid; grid-template-columns: repeat(3, 430px); gap: 24px">
        <StatTile title="Estimated finish" value="4:42" unit="AM" subtitle="8h 22m left" :show-status="false" />
        <StatTile title="Average crew" value="6.2" unit="people" :show-status="false" />
      </div>
    </StoryFrame>`,
  }),
}

// Fact card: secondary facts as one group next to a hero tile. Status only when a fact needs attention.
export const Facts: Story = {
  name: 'Fact card',
  render: () => ({
    components: { StoryFrame, FactCard },
    setup: () => ({
      facts: [
        { label: 'OEE', value: '66.2%', detail: 'Target 80%', status: 'negative', statusLabel: 'Below target' },
        { label: 'Cycle time', value: '2:11', detail: '27.5 units/h' },
        { label: 'Quality', value: '93.4%', detail: '11 reworked' },
      ],
    }),
    template: `<StoryFrame :width="560"><FactCard :facts="facts" style="height: 380px" /></StoryFrame>`,
  }),
}

// Guidelines for the Docs page (see the .mdx next to this file). Hidden from the sidebar.
export const KpiTileGuide: StoryObj = {
  name: 'KPI tile, large guidelines',
  tags: ['!dev', 'guide'],
  parameters: guideParameters,
  render: guideRender('kpi-tile'),
}
export const StatTileGuide: StoryObj = {
  name: 'Stat tile guidelines',
  tags: ['!dev', 'guide'],
  parameters: guideParameters,
  render: guideRender('stat-tile'),
}
