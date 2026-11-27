<script setup lang="ts">
import { computed } from 'vue'
// Material Symbols, weight 600 (Rounded does not match the Redzone DS).
// Status glyphs are the filled versions so the shape reads at TV distance; navigation stays outlined.
import checkCircleFill from '@material-symbols/svg-600/outlined/check_circle-fill.svg?raw'
import warningFill from '@material-symbols/svg-600/outlined/warning-fill.svg?raw'
import dangerousFill from '@material-symbols/svg-600/outlined/dangerous-fill.svg?raw'
import remove600 from '@material-symbols/svg-600/outlined/remove.svg?raw'
import chevronLeft from '@material-symbols/svg-600/outlined/chevron_left.svg?raw'
import chevronRight from '@material-symbols/svg-600/outlined/chevron_right.svg?raw'
import settings from '@material-symbols/svg-600/outlined/settings.svg?raw'
// Content icons (Other slides): item types and empty states. Outlined, not filled: they are not status.
import campaign from '@material-symbols/svg-600/outlined/campaign.svg?raw'
import chat from '@material-symbols/svg-600/outlined/chat.svg?raw'
import celebration from '@material-symbols/svg-600/outlined/celebration.svg?raw'
import person from '@material-symbols/svg-600/outlined/person.svg?raw'
import image from '@material-symbols/svg-600/outlined/image.svg?raw'
import inbox from '@material-symbols/svg-600/outlined/inbox.svg?raw'

// Inlined as SVG so they render crisply on TVs without a web font. Color is currentColor.
const ICONS = {
  check_circle_fill: checkCircleFill,
  warning_fill: warningFill,
  dangerous_fill: dangerousFill,
  remove: remove600,
  chevron_left: chevronLeft,
  chevron_right: chevronRight,
  settings,
  campaign,
  chat,
  celebration,
  person,
  image,
  inbox,
} as const
export type MaterialIconName = keyof typeof ICONS

const props = withDefaults(defineProps<{ name: MaterialIconName; size?: number; label?: string }>(), { size: 24 })

const svg = computed(() =>
  ICONS[props.name]
    .replace(/width="\d+"/, `width="${props.size}"`)
    .replace(/height="\d+"/, `height="${props.size}"`)
    .replace('<svg ', '<svg fill="currentColor" aria-hidden="true" focusable="false" '),
)
</script>

<template>
  <span
    class="rz-material-icon"
    :role="props.label ? 'img' : undefined"
    :aria-label="props.label"
    :aria-hidden="props.label ? undefined : 'true'"
    :style="{ width: `${props.size}px`, height: `${props.size}px` }"
    v-html="svg"
  />
</template>

<style scoped>
.rz-material-icon {
  flex: none;
  display: inline-flex;
  line-height: 0;
}
.rz-material-icon :deep(svg) {
  display: block;
}
</style>
