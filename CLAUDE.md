# Redzone TV slides

Vue 3 + Storybook 10 component library and slides for Redzone TV (1920 x 1080 canvas, Light and Dark).
Figma: TV Component library, file `NdSZgV65miScsprBzqt38n`. Figma wins on visual conflicts.

## Read first

1. Guidelines: `src/stories/docs/guidelines/` (Overview, Accessibility, Information design, Brand expression). Cite rules by ID (A11Y-04, INFO-05, BRAND-08).
2. Foundations: `src/foundations/` (`foundations.css`, `tv-type.css`, `tokens.ts`, `tokens/tv-colors.json`) and the Foundations pages in Storybook.
3. Reference slide: `src/slides/run-throughput/`. Every new slide must look like part of the same set.
4. Slide definitions: `docs/agent/kb-definitions.md` (official) and `docs/agent/slide-design-guide.md` (key question, must show, scenarios).

## Design system rules

- Foundations is the single source. Only two token layers: Global and Semantic (role-oriented). No component tokens.
- Every color, size, space, radius and shadow is a token. No hex values or raw pixel values in components, except fixed geometry documented in a comment.
- Spacing on the 4 px scale (`--rz-spacing-*`, `--rz-space-*`). Size names run 3xs to 3xl.
- Type only through `--rz-tv-type-{role}`. Do not add sizes. Geist for values people look at, Inter for text people read.
- Figures are proportional by default. Tabular only for the clock and numeric table columns (`--rz-tv-figures-table`).
- Status uses content, fill and on-fill tokens. Only the main KPI gets primary feedback (Status band). Color is never the only signal: every status has its icon.
- Reuse before creating. Check `src/components/` and the Components docs before adding anything. A new component needs a story, a Docs entry and a Changelog line.
- Every slide and component works in Light and Dark.

## Writing

- Docs, comments and UI copy in American English, sentence case, no em dashes.
- Reply to the user in Spanish.

## Working in this repo

- Agents work on a branch and never commit to `main` directly. The user merges after approval.
- Storybook runs on port 6006 (`.claude/launch.json`, name `storybook`). Restart it after changing `.storybook/main.ts` or after a branch switch that adds or removes files.
- Checks before every commit: `npx vue-tsc --noEmit -p tsconfig.json`, `npm run tokens:check`, `npx storybook build --quiet -o <scratch dir>`.
- Visual checks: screenshot Storybook with the built-in browser pane, in Light and Dark (`&globals=theme:light`).
- Reference images (local only, gitignored): `references/` (116 captures of the current product, by group) and `docs/agent/kb-examples/` (Knowledge Base examples). They show the current product, which the redesign replaces.
