import { onBeforeUnmount, onMounted, ref, type Ref } from 'vue'

// Layout size of an element (unaffected by the canvas scale transform).
export function useElementSize(el: Ref<HTMLElement | null>) {
  const width = ref(0)
  const height = ref(0)
  let ro: ResizeObserver | undefined
  const read = () => {
    if (!el.value) return
    width.value = el.value.clientWidth
    height.value = el.value.clientHeight
  }
  onMounted(() => {
    read()
    ro = new ResizeObserver(read)
    if (el.value) ro.observe(el.value)
  })
  onBeforeUnmount(() => ro?.disconnect())
  return { width, height }
}
