import ComponentGuide, { type GuideId } from './ComponentGuide.vue'

// Docs-only stories: each renders one ComponentGuide section on its component's Docs page.
// Stories using these set `tags: ['!dev', 'guide']` inline (Storybook reads tags statically):
// '!dev' hides them from the sidebar, 'guide' keeps them out of the <Stories /> block.
export const guideParameters = { tvCanvas: false }

export const guideRender = (id: GuideId) => () => ({
  components: { ComponentGuide },
  setup: () => ({ id }),
  template: '<ComponentGuide :id="id" />',
})
