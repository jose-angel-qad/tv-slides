import type { Meta, StoryObj } from '@storybook/vue3-vite'
import CompanyUpdate from './CompanyUpdate.vue'
import { slideRender } from '../_shared/slideStory'
import { companyUpdateNegative, companyUpdatePortrait, companyUpdatePositive } from './mock'
import type { CompanyUpdateData } from './types'

// Company update (Other): an image or PDF from the company.
// Key question: what is the company sharing today? Kept.
// Template T4 (one frame). Reused: Empty state message. Created: Media frame (Content).
// Positive: landscape image. Portrait PDF page 1 of 3. Negative: the file cannot load.
//
// Checklists (Light and Dark, 1920 x 1080)
// Passed: A11Y-01 to A11Y-11, A11Y-13 to A11Y-17, A11Y-20; INFO-01, INFO-02, INFO-07, INFO-08, INFO-10,
//   INFO-20, INFO-21, INFO-24; BRAND-01 to BRAND-08, BRAND-10 to BRAND-12.
// Not applicable: INFO-03 to INFO-06, INFO-09, INFO-11 to INFO-18, INFO-22, INFO-23, INFO-25.
// Failed or not verified:
//   BRAND-09: new component (Media frame), pending approval.
//   INFO-19: loading and stale states are not built.
//   A11Y-12, A11Y-18, A11Y-19: not tested overnight. Text inside an uploaded image cannot follow A11Y rules.
const meta: Meta<{ data: CompanyUpdateData }> = {
  title: 'Slides/Other/Company update',
  ...slideRender<CompanyUpdateData>(CompanyUpdate, 'Company update'),
}
export default meta
type Story = StoryObj<typeof meta>

export const Positive: Story = { args: { data: companyUpdatePositive } }
export const Portrait: Story = { name: 'Portrait PDF page', args: { data: companyUpdatePortrait } }
export const Negative: Story = { name: 'Negative, file cannot load', args: { data: companyUpdateNegative } }
