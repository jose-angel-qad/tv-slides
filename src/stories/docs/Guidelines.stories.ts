import type { Meta, StoryObj } from '@storybook/vue3-vite'
import ComponentGuide, { type GuideId } from './ComponentGuide.vue'
import Changelog from './Changelog.vue'

const meta: Meta = { title: 'Guidelines', parameters: { tvCanvas: false } }
export default meta
type Story = StoryObj

// Storybook reads story names statically, so each export sets `name` itself.
const guide = (id: GuideId): Story => ({
  render: () => ({ components: { ComponentGuide }, setup: () => ({ id }), template: '<ComponentGuide :id="id" />' }),
})

export const StatusBand: Story = { name: 'Status band', ...guide('status-band') }
export const KpiTile: Story = { name: 'KPI tile, large', ...guide('kpi-tile') }
export const StatTile: Story = { name: 'Stat tile', ...guide('stat-tile') }
export const StatusIcon: Story = { name: 'Status icon', ...guide('status-icon') }
export const HourlyBar: Story = { name: 'Hourly bar chart', ...guide('hourly-bar') }
export const SlideHeader: Story = { name: 'Slide header', ...guide('slide-header') }
export const ChangelogPage: Story = {
  name: 'Changelog',
  render: () => ({ components: { Changelog }, template: '<Changelog />' }),
}
