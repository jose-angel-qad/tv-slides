import type { Meta, StoryObj } from '@storybook/vue3-vite'
import StoryFrame from '../_story/StoryFrame.vue'
import LocationTable from './LocationTable.vue'
import StatusValue from '../status/StatusValue.vue'

const meta: Meta = { title: 'Components/Table' }
export default meta

const columns = [
  { key: 'oee', label: 'Shift OEE', width: '260px' },
  { key: 'state', label: 'Now', width: '220px' },
  { key: 'downtime', label: 'Downtime, min', width: '220px', align: 'end' as const },
]
const rows = [
  { id: '1', location: 'Line 1', oee: '86.4%', ok: true, state: 'Running', downtime: 14 },
  { id: '2', location: 'Packaging Line 3 West Mezzanine', oee: '64.2%', ok: false, state: 'Stopped', downtime: 96 },
  { id: '3', location: 'Bottling Line 4', oee: '81.5%', ok: true, state: 'Running', downtime: 27 },
]

// One row per location, fixed order. Cells come from slots; the raw value shows without one.
export const Location: StoryObj = {
  name: 'Location table',
  render: () => ({
    components: { StoryFrame, LocationTable, StatusValue },
    setup: () => ({ columns, rows }),
    template: `<StoryFrame :width="1400">
      <LocationTable :columns="columns" :rows="rows">
        <template #cell-oee="{ row }"><StatusValue size="lg" :status="row.ok ? 'positive' : 'negative'" :text="row.oee" /></template>
        <template #cell-state="{ row }"><StatusValue :status="row.ok ? 'positive' : 'negative'" :text="row.state" /></template>
      </LocationTable>
    </StoryFrame>`,
  }),
}
