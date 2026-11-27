import { createElement, Fragment, useSyncExternalStore, type ReactNode } from 'react'

// Shows its children only in the language picked in the Storybook toolbar (global "lang").
// Use in MDX as <Lang en>...</Lang> and <Lang es>...</Lang>.
// .storybook/preview.ts writes the global to <html data-lang>, so this component reads it
// from there and re-renders when the toolbar changes.

export type LangCode = 'en' | 'es'
export const DEFAULT_LANG: LangCode = 'en'

const read = (): LangCode => (document.documentElement.dataset.lang as LangCode | undefined) ?? DEFAULT_LANG

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange)
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-lang'] })
  return () => observer.disconnect()
}

export function Lang({ en, es, children }: { en?: boolean; es?: boolean; children?: ReactNode }) {
  const lang = useSyncExternalStore(subscribe, read, () => DEFAULT_LANG)
  const show = (lang === 'en' && en) || (lang === 'es' && es)
  return show ? createElement(Fragment, null, children) : null
}
