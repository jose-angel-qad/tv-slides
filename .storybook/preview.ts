import type { Preview } from '@storybook/vue3-vite'
import { ref } from 'vue'
import '@fontsource-variable/inter'
import '@fontsource-variable/geist'
import '../src/foundations/foundations.css'
import '../src/foundations/tv-type.css'
import TvCanvas from '../src/components/layout/TvCanvas.vue'
import { applyTokens, syncEditor } from './color-editor'
import type { Mode } from '../src/foundations/tokens'
import { storyGlobals } from '../src/components/_story/storyGlobals'
import type { FooterTone } from '../src/components/shell/footer'

applyTokens()

const themeRef = ref<Mode>('dark')
const safeRef = ref(false)

const preview: Preview = {
  parameters: {
    layout: 'fullscreen',
    controls: { matchers: { color: /(background|color)$/i } },
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
      if (ctx.parameters.tvCanvas === false) {
        return {
          components: { story, TvCanvas },
          setup: () => ({ theme: themeRef }),
          template: '<div class="rz-tv rz-docs-page" :data-theme="theme"><story /></div>',
        }
      }
      return {
        components: { story, TvCanvas },
        setup: () => ({ theme: themeRef, safe: safeRef }),
        template: '<TvCanvas :theme="theme" :show-safe-area="safe"><story /></TvCanvas>',
      }
    },
  ],
}

export default preview
