import type { Meta, StoryObj } from '@storybook/vue3-vite'
import CompanyInheritedHighlight from './CompanyInheritedHighlight.vue'
import { slideRender } from '../_shared/slideStory'
import { companyHighlightNegative, companyHighlightPositive } from './mock'
import type { CompanyHighlightData } from './types'

// Company inherited highlight (Other). PROPOSAL: the definition is pending and the slide was only
// captured empty. Assumed: a highlight shared by the company with every site.
// Key question (proposed): what is the company celebrating or asking of every site today?
// Template T4 (one card). Reused: Chart card, Empty state message. Created: none.
// Positive: headline, message and image. Negative: nothing shared yet.
//
// Checklists (Light and Dark, 1920 x 1080)
// Passed: A11Y-01 to A11Y-11, A11Y-13 to A11Y-17, A11Y-20; INFO-02, INFO-07, INFO-08, INFO-20, INFO-21,
//   INFO-24; BRAND-01 to BRAND-12.
// Not applicable: INFO-03 to INFO-06, INFO-09, INFO-11 to INFO-18, INFO-22, INFO-23, INFO-25.
// Failed or not verified:
//   INFO-01: the key question is a proposal; the slide has no official definition.
//   INFO-10: the headline uses the secondary KPI value role (Geist SemiBold 104) for text.
//   INFO-19: only Positive and Negative (empty) are built.
//   A11Y-12, A11Y-18, A11Y-19: not tested overnight.
const meta: Meta<{ data: CompanyHighlightData }> = {
  title: 'Slides/Other/Company inherited highlight',
  ...slideRender<CompanyHighlightData>(CompanyInheritedHighlight, 'Company highlight'),
}
export default meta
type Story = StoryObj<typeof meta>

export const Positive: Story = { args: { data: companyHighlightPositive } }
export const Negative: Story = { name: 'Negative, nothing shared', args: { data: companyHighlightNegative } }
