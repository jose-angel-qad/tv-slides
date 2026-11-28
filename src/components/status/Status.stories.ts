import type { Meta, StoryObj } from '@storybook/vue3-vite'
import StoryFrame from '../_story/StoryFrame.vue'
import { guideParameters, guideRender } from '../../stories/docs/guide'
import StatusIcon from './StatusIcon.vue'
import StatusLine from './StatusLine.vue'
import StatusBand from './StatusBand.vue'
import StatusValue from './StatusValue.vue'
import RunStatusBadge from './RunStatusBadge.vue'

const meta: Meta = { title: 'Components/Status' }
export default meta
type Story = StoryObj

export const Icon: Story = {
  name: 'Status icon',
  render: () => ({
    components: { StoryFrame, StatusIcon },
    template: `<StoryFrame>
      <div style="display: flex; gap: 48px; align-items: center">
        <StatusIcon status="positive" :size="64" label="Positive" />
        <StatusIcon status="warning" :size="64" label="Warning" />
        <StatusIcon status="negative" :size="64" label="Negative" />
        <StatusIcon status="neutral" :size="64" label="Neutral" />
      </div>
    </StoryFrame>`,
  }),
}

export const Line: Story = {
  name: 'Status line',
  render: () => ({
    components: { StoryFrame, StatusLine },
    template: `<StoryFrame>
      <StatusLine status="positive" text="On schedule" />
      <StatusLine status="warning" text="14m late" />
      <StatusLine status="negative" text="Below target 6.2" />
    </StoryFrame>`,
  }),
}

// Primary KPI only. 932 px wide, like the band inside "KPI tile, large" on the 1920 canvas.
export const Band: Story = {
  name: 'Status band',
  render: () => ({
    components: { StoryFrame, StatusBand },
    template: `<StoryFrame :width="932">
      <StatusBand status="positive" text="6 ahead of plan" />
      <StatusBand status="warning" text="100 behind plan" />
      <StatusBand status="negative" text="260 behind plan" />
    </StoryFrame>`,
  }),
}

// Guidelines for the Docs page (see the .mdx next to this file). Hidden from the sidebar.
export const StatusBandGuide: StoryObj = {
  name: 'Status band guidelines',
  tags: ['!dev', 'guide'],
  parameters: guideParameters,
  render: guideRender('status-band'),
}
export const StatusIconGuide: StoryObj = {
  name: 'Status icon and Status line guidelines',
  tags: ['!dev', 'guide'],
  parameters: guideParameters,
  render: guideRender('status-icon'),
}

// Status value: a value with its secondary status, for table cells and lists.
export const Value: Story = {
  name: 'Status value',
  render: () => ({
    components: { StoryFrame, StatusValue },
    template: `<StoryFrame>
      <div style="display: flex; gap: 48px; align-items: center">
        <StatusValue size="lg" status="positive" text="86.4%" />
        <StatusValue size="lg" status="negative" text="64.2%" />
        <StatusValue status="positive" text="Running" />
        <StatusValue status="negative" text="Stopped" />
        <StatusValue status="warning" text="14m late" />
        <StatusValue text="1,240" />
      </div>
    </StoryFrame>`,
  }),
}

// Run status badge: a line's run state, one per row or card. Secondary feedback.
export const RunBadge: Story = {
  name: 'Run status badge',
  render: () => ({
    components: { StoryFrame, RunStatusBadge },
    template: `<StoryFrame>
      <div style="display: flex; flex-wrap: wrap; gap: 24px; align-items: center">
        <RunStatusBadge state="running" />
        <RunStatusBadge state="slow" />
        <RunStatusBadge state="ramp-up" />
        <RunStatusBadge state="changeover" />
        <RunStatusBadge state="stopped" />
        <RunStatusBadge state="breakdown" />
        <RunStatusBadge state="inactive" />
      </div>
    </StoryFrame>`,
  }),
}
