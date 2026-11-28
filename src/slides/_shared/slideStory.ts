import type { Meta } from '@storybook/vue3-vite'
import { computed, type Component } from 'vue'
import TvShell from '../../components/shell/TvShell.vue'
import { shellFooter, shellHeader } from '../../components/shell/mock'
import { storyGlobals } from '../../components/_story/storyGlobals'

// Story-only helper: renders a slide inside TvShell, like the Run throughput stories.
// The header shows the slide type and the data's location; the footer tone follows the toolbar.
// Storybook reads the title statically, so stories spread this into an object literal:
//   export default { title: 'Slides/...', ...slideRender(MySlide, 'My slide') }
// `context` picks the header context from the data when it is not a location (Company update: the update's name).
export function slideRender<T extends object>(
  slide: Component,
  slideType: string,
  context?: (data: T) => string | undefined,
): Pick<Meta<{ data: T }>, 'render'> {
  return {
    render: (args) => ({
      components: { slide, TvShell },
      setup: () => ({
        args,
        header: computed(() => ({ ...shellHeader, slideType, location: (context ? context(args.data) : (args.data as { location?: string }).location) ?? shellHeader.location })),
        footer: computed(() => ({ ...shellFooter, tone: storyGlobals.footerTone })),
      }),
      template: '<TvShell :header="header" :footer="footer"><slide :data="args.data" /></TvShell>',
    }),
  }
}
