import { onBeforeUnmount, onMounted, ref, type Ref } from 'vue'
import { DEFAULT_TOKENS, cssVarName, type Mode } from './tokens'

// Reads the live token values for a mode from CSS, so docs follow the color editor.
export function useTokenValues(el: Ref<HTMLElement | null>, mode: () => Mode) {
  const values = ref<Record<string, string>>({ ...DEFAULT_TOKENS[mode()] })
  let observer: MutationObserver | undefined

  function read() {
    if (!el.value) return
    const cs = getComputedStyle(el.value)
    const next: Record<string, string> = {}
    for (const key of Object.keys(DEFAULT_TOKENS[mode()])) {
      next[key] = cs.getPropertyValue(cssVarName(key)).trim().toUpperCase() || DEFAULT_TOKENS[mode()][key]
    }
    values.value = next
  }

  onMounted(() => {
    read()
    observer = new MutationObserver(read)
    observer.observe(document.head, { childList: true, subtree: true, characterData: true })
  })
  onBeforeUnmount(() => observer?.disconnect())

  return values
}
