import type { Meta, StoryObj } from '@storybook/vue3-vite'
import StoryFrame from '../_story/StoryFrame.vue'
import LocationTable from './LocationTable.vue'
import MetricCell from './MetricCell.vue'
import RunStatusBadge from '../status/RunStatusBadge.vue'

const meta: Meta = { title: 'Components/Table' }
export default meta

const columns = [
  { key: 'oee', label: 'Shift OEE', width: '260px' },
  { key: 'state', label: 'Now', width: '260px' },
  { key: 'downtime', label: 'Downtime', width: '200px', align: 'end' as const },
]
const rows = [
  { id: '1', location: 'Line 1', detail: 'Shift 2', oee: '86.4%', ok: true, state: 'running', downtime: '14m' },
  { id: '2', location: 'Packaging Line 3 West Mezzanine', detail: 'Shift 2', oee: '64.2%', ok: false, state: 'stopped', downtime: '1h 36m' },
  { id: '3', location: 'Bottling Line 4', detail: 'Shift 2', oee: '81.5%', ok: true, state: 'running', downtime: '27m' },
]

// Row layout for multiple location slides: headers on the sheet, one row card per location, the
// row hero in a Metric cell right after the name, other cells plain.
export const Location: StoryObj = {
  name: 'Location table',
  render: () => ({
    components: { StoryFrame, LocationTable, MetricCell, RunStatusBadge },
    setup: () => ({ columns, rows }),
    template: `<StoryFrame :width="1400">
      <LocationTable :columns="columns" :rows="rows" :fill="false">
        <template #cell-oee="{ row }">
          <MetricCell :value="row.oee" target="Target 80%" :status="row.ok ? 'positive' : 'negative'" :label="row.ok ? 'On target' : 'Below target'" />
        </template>
        <template #cell-state="{ row }"><RunStatusBadge :state="row.state" /></template>
      </LocationTable>
    </StoryFrame>`,
  }),
}

// The row hero: value and target in a raised container. One status per row, here.
export const Metric: StoryObj = {
  name: 'Metric cell',
  render: () => ({
    components: { StoryFrame, MetricCell },
    template: `<StoryFrame>
      <div style="display: grid; grid-template-columns: repeat(3, 260px); gap: 32px">
        <MetricCell value="86.4%" target="Target 80%" status="positive" label="On target" />
        <MetricCell value="64.2%" target="Target 80%" status="negative" label="Below target" />
        <MetricCell value="1,240" target="Plan 1,300" />
      </div>
    </StoryFrame>`,
  }),
}
