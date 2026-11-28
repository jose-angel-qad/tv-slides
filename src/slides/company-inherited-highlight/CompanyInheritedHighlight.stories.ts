import type { Meta, StoryObj } from '@storybook/vue3-vite'
import CompanyInheritedHighlight from './CompanyInheritedHighlight.vue'
import { slideRender } from '../_shared/slideStory'
import { companyHighlightNegative, companyHighlightPositive, companyHighlightText } from './mock'
import type { CompanyHighlightData } from './types'

// Company inherited highlight (Other). Status: Pending approval (round 2). Proposal: definition pending.
// Content container: With image, Text only, Nothing shared. Design plan in CompanyInheritedHighlight.vue.
const meta: Meta<{ data: CompanyHighlightData }> = {
  title: 'Slides/Other/Company inherited highlight',
  ...slideRender<CompanyHighlightData>(CompanyInheritedHighlight, 'Company highlight'),
}
export default meta
type Story = StoryObj<typeof meta>

export const WithImage: Story = { name: 'With image', args: { data: companyHighlightPositive } }
export const TextOnly: Story = { name: 'Text only', args: { data: companyHighlightText } }
export const NothingShared: Story = { name: 'Nothing shared', args: { data: companyHighlightNegative } }
