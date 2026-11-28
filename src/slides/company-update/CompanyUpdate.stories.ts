import type { Meta, StoryObj } from '@storybook/vue3-vite'
import CompanyUpdate from './CompanyUpdate.vue'
import { slideRender } from '../_shared/slideStory'
import {
  companyUpdateEmpty,
  companyUpdateLandscape,
  companyUpdateLoading,
  companyUpdatePdf,
  companyUpdatePortrait,
} from './mock'
import type { CompanyUpdateData } from './types'

// Company update (Other): an image or PDF from the company. Status: Pending approval (round 2).
// Key question: what is the company sharing today? Content container: no positive or negative state.
// The file fills the body at its own aspect ratio with the card finish on the file. Design plan in CompanyUpdate.vue.
const meta: Meta<{ data: CompanyUpdateData }> = {
  title: 'Slides/Other/Company update',
  ...slideRender<CompanyUpdateData>(CompanyUpdate, 'Company update', (d) => d.title ?? ''),
}
export default meta
type Story = StoryObj<typeof meta>

export const Landscape: Story = { args: { data: companyUpdateLandscape } }
export const Portrait: Story = { args: { data: companyUpdatePortrait } }
export const MultiPagePdf: Story = { name: 'Multi-page PDF', args: { data: companyUpdatePdf } }
export const NoContent: Story = { name: 'No content', args: { data: companyUpdateEmpty } }
export const Loading: Story = { args: { data: companyUpdateLoading } }
