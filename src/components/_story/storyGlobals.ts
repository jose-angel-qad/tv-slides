import { reactive } from 'vue'
import type { FooterTone } from '../shell/footer'

// Story-only: Storybook toolbar globals mirrored into a reactive object, so mounted stories
// update when the toolbar changes. Written by the decorator in .storybook/preview.ts.
export const storyGlobals = reactive<{ footerTone: FooterTone }>({ footerTone: 'default' })
