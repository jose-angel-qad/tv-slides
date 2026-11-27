import type { Meta, StoryObj } from '@storybook/vue3-vite'
import StoryFrame from '../_story/StoryFrame.vue'
import { guideParameters, guideRender } from '../../stories/docs/guide'
import SlideHeader from './SlideHeader.vue'
import ScreenNavStrip from './ScreenNavStrip.vue'
import ClockAndRefreshTimer from './ClockAndRefreshTimer.vue'
import FooterBrandBar from './FooterBrandBar.vue'
import { shellFooter, shellFooterBlue, shellFooterCustomer, shellFooterRed, shellHeader } from './mock'

const meta: Meta = { title: 'Components/Shell' }
export default meta
type Story = StoryObj

export const SlideHeaderStory: Story = {
  name: 'Slide header',
  render: () => ({
    components: { StoryFrame, SlideHeader },
    setup: () => ({ header: shellHeader }),
    template: '<StoryFrame><SlideHeader v-bind="header" /></StoryFrame>',
  }),
}

export const NavigationStrip: Story = {
  name: 'Slide navigation',
  render: () => ({
    components: { StoryFrame, ScreenNavStrip },
    template: '<StoryFrame><ScreenNavStrip /></StoryFrame>',
  }),
}

export const ClockAndTimer: Story = {
  name: 'Clock and refresh timer',
  render: () => ({
    components: { StoryFrame, ClockAndRefreshTimer },
    setup: () => ({ now: shellHeader.now }),
    template: '<StoryFrame><ClockAndRefreshTimer :now="now" :dwell-seconds="30" /></StoryFrame>',
  }),
}

// Footer stories place the bar at the bottom of the 1920 x 1080 canvas.
const footerStory = (props: object): Story => ({
  render: () => ({
    components: { StoryFrame, FooterBrandBar },
    setup: () => ({ props }),
    template: '<StoryFrame align="bottom"><FooterBrandBar v-bind="props" /></StoryFrame>',
  }),
})

export const Footer: Story = { name: 'Footer brand bar', ...footerStory(shellFooter) }
export const FooterRed: Story = { name: 'Footer brand bar, red', ...footerStory(shellFooterRed) }
export const FooterBlue: Story = { name: 'Footer brand bar, blue', ...footerStory(shellFooterBlue) }
export const FooterCustomer: Story = { name: 'Footer brand bar, customer logo', ...footerStory(shellFooterCustomer) }

// Guidelines for the Docs page (see the .mdx next to this file). Hidden from the sidebar.
export const SlideHeaderGuide: StoryObj = {
  name: 'Slide header guidelines',
  tags: ['!dev', 'guide'],
  parameters: guideParameters,
  render: guideRender('slide-header'),
}
