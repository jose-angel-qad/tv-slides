import type { Meta, StoryObj } from '@storybook/vue3-vite'
import Changelog from './Changelog.vue'

const meta: Meta = { title: 'Introduction', parameters: { tvCanvas: false } }
export default meta

export const ChangelogPage: StoryObj = {
  name: 'Changelog',
  render: () => ({ components: { Changelog }, template: '<Changelog />' }),
}
