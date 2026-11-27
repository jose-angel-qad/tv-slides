<script setup lang="ts">
import { computed, ref } from 'vue'
import { CONTRAST_PAIRS, pairContrast } from '../../foundations/contrast'
import { cssVarName, type Mode } from '../../foundations/tokens'
import { useTokenValues } from '../../foundations/useTokenValues'

const props = defineProps<{ mode: Mode }>()
const root = ref<HTMLElement | null>(null)
const values = useTokenValues(root, () => props.mode)

const rows = computed(() =>
  CONTRAST_PAIRS.flatMap((p) => {
    const ratio = pairContrast(values.value, p)
    return ratio == null ? [] : [{ ...p, ratio, pass: ratio >= p.min }]
  }),
)
</script>

<template>
  <section ref="root" class="panel rz-tv" :data-theme="mode">
    <h2>{{ mode === 'dark' ? 'Dark' : 'Light' }}</h2>

    <div class="swatches">
      <div v-for="(hex, key) in values" :key="key" class="swatch">
        <span class="chip" :style="{ background: `var(${cssVarName(String(key))})` }" />
        <span class="name">{{ String(key).replace('color.', '') }}</span>
        <span class="hex">{{ hex }}</span>
      </div>
    </div>

    <table>
      <thead>
        <tr><th>Pair</th><th>Ratio</th><th>Min</th><th /></tr>
      </thead>
      <tbody>
        <tr v-for="r in rows" :key="r.fg + r.bg">
          <td>
            <span
              class="sample"
              :style="{
                color: `var(${cssVarName('color.' + r.fg)})`,
                background: `var(${cssVarName('color.' + r.bg)})`,
              }"
            >Aa 92.8</span>
            {{ r.fg }} on {{ r.bg }}
          </td>
          <td class="num">{{ r.ratio.toFixed(2) }}:1</td>
          <td class="num">{{ r.min }}:1</td>
          <td :class="r.pass ? 'pass' : 'fail'">{{ r.pass ? 'Pass' : 'Fail' }}</td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<style scoped>
.panel {
  padding: 32px;
  border-radius: var(--rz-radius-lg);
  background: var(--rz-color-background-default);
  color: var(--rz-color-text-primary);
  font-size: 16px;
}
h2 {
  margin: 0 0 24px;
  font-size: 24px;
  font-weight: 600;
}
.swatches {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 16px;
  margin-bottom: 32px;
}
.swatch {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.chip {
  height: 64px;
  border-radius: var(--rz-radius-sm);
  box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--rz-color-text-primary) 12%, transparent);
}
.name {
  font-size: 13px;
  font-weight: 500;
}
.hex {
  font-size: 13px;
  color: var(--rz-color-text-secondary);
}
table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}
th {
  text-align: left;
  font-weight: 500;
  color: var(--rz-color-text-secondary);
  padding: 8px;
}
td {
  padding: 8px;
  border-top: 1px solid var(--rz-color-data-axis);
}
.num {
  white-space: nowrap;
}
.sample {
  display: inline-block;
  min-width: 72px;
  margin-right: 8px;
  padding: 4px 8px;
  border-radius: var(--rz-radius-sm);
  font-weight: 600;
  text-align: center;
}
.pass {
  color: var(--rz-color-status-positive-content);
  font-weight: 600;
}
.fail {
  color: var(--rz-color-status-negative-content);
  font-weight: 700;
}
</style>
