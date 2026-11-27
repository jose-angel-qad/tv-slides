import type { Meta, StoryObj } from '@storybook/vue3-vite'
import ColorFoundations from './ColorFoundations.vue'
import TypeScale from './TypeScale.vue'
import SpacingScale from './SpacingScale.vue'
import PalettePreview from './PalettePreview.vue'

const meta: Meta = {
  title: 'Foundations',
}
export default meta

type Story = StoryObj

export const Color: Story = {
  render: () => ({ components: { ColorFoundations }, template: '<ColorFoundations />' }),
  parameters: { tvCanvas: false },
}

export const PaletteInContext: Story = {
  name: 'Palette in context',
  render: () => ({ components: { PalettePreview }, template: '<PalettePreview />' }),
}

export const Type: Story = {
  name: 'Typography',
  render: () => ({ components: { TypeScale }, template: '<TypeScale />' }),
  parameters: { tvCanvas: false },
}

export const Spacing: Story = {
  render: () => ({ components: { SpacingScale }, template: '<SpacingScale />' }),
  parameters: { tvCanvas: false },
}
