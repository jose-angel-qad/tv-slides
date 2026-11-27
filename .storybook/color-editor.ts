// Dev-only color editor. Lives in Storybook; never imported by the TV app.
import { Pane } from 'tweakpane'
import { CONTRAST_PAIRS, pairContrast } from '../src/foundations/contrast'
import {
  DEFAULT_TOKENS,
  TOKEN_STORAGE_KEY,
  cloneTokens,
  decodeOverrides,
  encodeOverrides,
  tokensToCss,
  type Mode,
  type TokenSet,
} from '../src/foundations/tokens'

const STORAGE_KEY = TOKEN_STORAGE_KEY
const STYLE_ID = 'rz-tv-tokens'

const GROUPS: { title: string; prefix: string[] }[] = [
  { title: 'Background and surface', prefix: ['color.background.', 'color.surface.', 'color.border.'] },
  { title: 'Gradient (gradient/surface/default)', prefix: ['color.gradient.'] },
  { title: 'Brand', prefix: ['color.brand.'] },
  { title: 'Text', prefix: ['color.text.'] },
  { title: 'Data', prefix: ['color.data.'] },
  { title: 'Status', prefix: ['color.status.'] },
  { title: 'Elevation (alpha)', prefix: ['elevation.'] },
]

function load(): TokenSet {
  try {
    return decodeOverrides(localStorage.getItem(STORAGE_KEY))
  } catch {
    return cloneTokens(DEFAULT_TOKENS)
  }
}

// Stores only edited values, each with the default it replaced (see encodeOverrides).
function save(t: TokenSet) {
  try {
    const raw = encodeOverrides(t)
    if (raw) localStorage.setItem(STORAGE_KEY, raw)
    else localStorage.removeItem(STORAGE_KEY)
  } catch {
    // Ignore: edits still apply for this session.
  }
}

const tokens: TokenSet = load()

export function applyTokens() {
  let el = document.getElementById(STYLE_ID) as HTMLStyleElement | null
  if (!el) {
    el = document.createElement('style')
    el.id = STYLE_ID
    document.head.appendChild(el)
  }
  el.textContent = tokensToCss(tokens)
}

let pane: Pane | undefined
let host: HTMLDivElement | undefined
let currentMode: Mode | undefined

function readouts(mode: Mode): Record<string, string> {
  const t = tokens[mode]
  const out: Record<string, string> = {}
  for (const p of CONTRAST_PAIRS) {
    const r = pairContrast(t, p)
    if (r == null) continue
    out[`${p.fg} / ${p.bg}`] = `${r.toFixed(2)}:1  ${r >= p.min ? 'pass' : 'FAIL'}  (min ${p.min})`
  }
  return out
}

function build(mode: Mode) {
  pane?.dispose()
  if (!host) {
    host = document.createElement('div')
    host.className = 'rz-color-editor'
    Object.assign(host.style, {
      position: 'fixed',
      top: '8px',
      right: '8px',
      width: '360px',
      maxHeight: 'calc(100vh - 16px)',
      overflowY: 'auto',
      zIndex: '10000',
    })
    document.body.appendChild(host)
  }
  pane = new Pane({ container: host, title: `Color editor (${mode})` })
  const values = tokens[mode]
  const report = readouts(mode)

  for (const g of GROUPS) {
    const folder = pane.addFolder({ title: g.title })
    for (const key of Object.keys(values).filter((k) => g.prefix.some((p) => k.startsWith(p)))) {
      folder.addBinding(values, key, { view: 'color', label: key.replace('color.', '') })
    }
  }

  const c = pane.addFolder({ title: 'Contrast (WCAG 2.1)' })
  for (const k of Object.keys(report)) c.addBinding(report, k, { readonly: true, label: k, interval: 250 })

  pane.on('change', () => {
    Object.assign(report, readouts(mode))
    applyTokens()
    save(tokens)
    // Readonly contrast bindings poll on their own; calling refresh() here re-emits change.
  })

  pane.addBlade({ view: 'separator' })
  pane.addButton({ title: 'Reset to defaults' }).on('click', () => {
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch {
      // ignore
    }
    const d = cloneTokens(DEFAULT_TOKENS)
    for (const m of ['dark', 'light'] as Mode[]) Object.assign(tokens[m], d[m])
    applyTokens()
    build(mode)
  })
  pane.addButton({ title: 'Copy JSON' }).on('click', async () => {
    const json = JSON.stringify(tokens, null, 2)
    try {
      await navigator.clipboard.writeText(json)
    } catch {
      window.prompt('Copy the tokens JSON', json)
    }
  })
  pane.addButton({ title: 'Import JSON' }).on('click', () => {
    const raw = window.prompt('Paste a tv-colors.json object')
    if (!raw) return
    try {
      const parsed = JSON.parse(raw) as Partial<TokenSet>
      for (const m of ['dark', 'light'] as Mode[]) {
        for (const key of Object.keys(tokens[m])) {
          const v = parsed[m]?.[key]
          if (typeof v === 'string' && /^#[0-9a-f]{6}([0-9a-f]{2})?$/i.test(v)) tokens[m][key] = v
        }
      }
      applyTokens()
      save(tokens)
      build(mode)
    } catch {
      window.alert('That is not valid JSON.')
    }
  })
  currentMode = mode
}

export function syncEditor(visible: boolean, mode: Mode) {
  if (!visible) {
    pane?.dispose()
    pane = undefined
    host?.remove()
    host = undefined
    currentMode = undefined
    return
  }
  if (!pane || currentMode !== mode) build(mode)
}
