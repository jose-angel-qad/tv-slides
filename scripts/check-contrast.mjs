// Checks tokens/tv-colors.json against the contrast pairs. Exits 1 on any failure.
import tokens from '../tokens/tv-colors.json' with { type: 'json' }
import { CONTRAST_PAIRS, pairContrast } from '../src/foundations/contrast.ts'

let failed = 0
for (const mode of ['dark', 'light']) {
  console.log(`\n${mode}`)
  for (const p of CONTRAST_PAIRS) {
    const r = pairContrast(tokens[mode], p)
    const ok = r >= p.min
    if (!ok) failed++
    console.log(`  ${(p.fg + ' / ' + p.bg).padEnd(42)} ${r.toFixed(2).padStart(6)}:1  min ${p.min}  ${ok ? 'pass' : 'FAIL'}`)
  }
}
process.exit(failed ? 1 : 0)
