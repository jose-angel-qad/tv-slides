import type { Preview } from '@storybook/vue3-vite'
import { addons } from 'storybook/preview-api'
import { GLOBALS_UPDATED, SET_GLOBALS } from 'storybook/internal/core-events'
import { ref } from 'vue'
import '@fontsource-variable/inter'
import '@fontsource-variable/geist'
import '../src/foundations/foundations.css'
import '../src/foundations/tv-type.css'
import './docs-theme.css'
import TvCanvas from '../src/components/layout/TvCanvas.vue'
import { applyTokens, syncEditor } from './color-editor'
import type { Mode } from '../src/foundations/tokens'
import { storyGlobals } from '../src/components/_story/storyGlobals'
import type { FooterTone } from '../src/components/shell/footer'

applyTokens()

// Docs pages follow the Theme toolbar too. MDX pages without stories never run the decorator,
// so the theme is set on <html> from the globals events (docs-theme.css styles the docs chrome).
const setDocsTheme = (globals?: Record<string, unknown>) => {
  document.documentElement.dataset.theme = (globals?.theme as Mode | undefined) ?? 'dark'
}
setDocsTheme()
const channel = addons.getChannel()
channel.on(SET_GLOBALS, ({ globals }) => setDocsTheme(globals))
channel.on(GLOBALS_UPDATED, ({ globals }) => setDocsTheme(globals))

const themeRef = ref<Mode>('dark')
const safeRef = ref(false)

const preview: Preview = {
  parameters: {
    layout: 'fullscreen',
    controls: { matchers: { color: /(background|color)$/i } },
    options: {
      storySort: {
        order: [
          'Introduction',
          'Foundations',
          'Guidelines',
          ['Overview', 'Accessibility', 'Information design', 'Brand expression'],
          'Components',
          'Templates',
          'Slides',
        ],
      },
    },
    docs: {
      // Guideline stories (tag 'guide') are placed by hand on each Docs page, not in <Stories />.
      stories: { filter: (story: { tags?: string[] }) => !story.tags?.includes('guide') },
    },
  },
  globalTypes: {
    theme: {
      description: 'Color mode',
      toolbar: {
        title: 'Theme',
        icon: 'mirror',
        items: [
          { value: 'dark', title: 'Dark' },
          { value: 'light', title: 'Light' },
        ],
        dynamicTitle: true,
      },
    },
    colorEditor: {
      description: 'Color editor',
      toolbar: {
        title: 'Color editor',
        icon: 'paintbrush',
        items: [
          { value: 'off', title: 'Color editor: off' },
          { value: 'on', title: 'Color editor: on' },
        ],
        dynamicTitle: true,
      },
    },
    footerTone: {
      description: 'Footer brand bar tone',
      toolbar: {
        title: 'Footer',
        icon: 'paintbrush',
        items: [
          { value: 'default', title: 'Footer: default' },
          { value: 'red', title: 'Footer: red' },
          { value: 'blue', title: 'Footer: blue' },
        ],
        dynamicTitle: true,
      },
    },
    safeArea: {
      description: 'Safe area overlay',
      toolbar: {
        title: 'Safe area',
        icon: 'grid',
        items: [
          { value: 'off', title: 'Safe area: off' },
          { value: 'on', title: 'Safe area: on' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: { theme: 'dark', colorEditor: 'off', footerTone: 'default', safeArea: 'off' },
  decorators: [
    // Globals (theme, safe area) live in module-level refs so a toolbar change updates the
    // mounted story. Storybook re-runs the decorator on a globals change but keeps the Vue app,
    // so values captured once in setup() would go stale.
    (story, ctx) => {
      themeRef.value = (ctx.globals.theme ?? 'dark') as Mode
      safeRef.value = ctx.globals.safeArea === 'on'
      storyGlobals.footerTone = (ctx.globals.footerTone ?? 'default') as FooterTone
      syncEditor(ctx.globals.colorEditor === 'on', themeRef.value)
      setDocsTheme(ctx.globals)
      if (ctx.parameters.tvCanvas === false) {
        return {
          components: { story, TvCanvas },
          setup: () => ({ theme: themeRef }),
          template: '<div class="rz-tv rz-docs-page" :data-theme="theme"><story /></div>',
        }
      }
      // On a Docs page the canvas sits in a 16:9 box instead of the viewport (docs-theme.css).
      const canvas = '<TvCanvas :theme="theme" :show-safe-area="safe"><story /></TvCanvas>'
      return {
        components: { story, TvCanvas },
        setup: () => ({ theme: themeRef, safe: safeRef }),
        template: ctx.viewMode === 'docs' ? `<div class="rz-docs-story">${canvas}</div>` : canvas,
      }
    },
  ],
}

export default preview
