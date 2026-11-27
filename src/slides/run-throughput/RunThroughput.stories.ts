import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { computed } from 'vue'
import RunThroughput from './RunThroughput.vue'
import TvShell from '../../components/shell/TvShell.vue'
import { runThroughputError, runThroughputMillions, runThroughputSuccess, runThroughputWarning } from './mock'
import { shellFooter, shellHeader } from '../../components/shell/mock'
import { storyGlobals } from '../../components/_story/storyGlobals'
import type { RunThroughputData } from './types'

// Run throughput (Single location): unit-based performance for the run.
// Success, Warning and Error match the Figma final slides (section "Thursday 26 Nov - final").
// The states are sample data that show each look; they do not define real thresholds.
const meta: Meta<{ data: RunThroughputData }> = {
  title: 'Slides/Single location/Run throughput',
  render: (args) => ({
    components: { RunThroughput, TvShell },
    // Footer tone comes from the toolbar (Footer: default, red, blue).
    setup: () => ({ args, header: shellHeader, footer: computed(() => ({ ...shellFooter, tone: storyGlobals.footerTone })) }),
    template: '<TvShell :header="header" :footer="footer"><RunThroughput :data="args.data" /></TvShell>',
  }),
}
export default meta

type Story = StoryObj<{ data: RunThroughputData }>

// Dark and Light come from the Theme switch in the toolbar.
export const Success: Story = { args: { data: runThroughputSuccess } }
export const Warning: Story = { args: { data: runThroughputWarning } }
// Named Negative so it does not clash with the Error data state.
export const Negative: Story = { args: { data: runThroughputError } }
export const Millions: Story = { name: 'Edge case, millions of cases', args: { data: runThroughputMillions } }
