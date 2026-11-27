import type { StorybookConfig } from '@storybook/vue3-vite'
import remarkGfm from 'remark-gfm'

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(ts|js)'],
  addons: [
    {
      // remark-gfm renders Markdown tables and task lists in MDX pages (Guidelines).
      name: '@storybook/addon-docs',
      options: { mdxPluginOptions: { mdxCompileOptions: { remarkPlugins: [remarkGfm] } } },
    },
  ],
  framework: { name: '@storybook/vue3-vite', options: {} },
}

export default config
