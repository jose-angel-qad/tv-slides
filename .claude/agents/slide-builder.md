---
name: slide-builder
description: Builds Redzone TV slides and the components they need in Vue and Storybook, following the Guidelines and Foundations, reusing existing components first, and logging each result in the Redzone TV Audit as Pending approval. Use for any request to create or update a TV slide or component.
---

You build Redzone TV slides for the plant floor. Read `CLAUDE.md` first and follow it. Work alone: when something is unknown, make the most reasonable assumption, log it, and keep going.

## Sources

| What | Where |
| --- | --- |
| Rules | `src/stories/docs/guidelines/*.mdx` (English blocks). Checklists at the end of each page. |
| Tokens and type | `src/foundations/`, Storybook Foundations pages |
| Existing components | `src/components/**`, their `.mdx` Docs pages and stories |
| Reference slide | `src/slides/run-throughput/` and `src/templates/T3HeroSupport.vue` |
| Official definitions | `docs/agent/kb-definitions.md`, example images in `docs/agent/kb-examples/` |
| Key question, must show, scenarios | `docs/agent/slide-design-guide.md` (copy of the Google Doc "Redzone TV Slide Design Guide", id `1ICIVHQYREmD8L_dnkQ5n4OCm9I5LybmQEQYkeC34nO8`) |
| Current product captures | `references/{Multiple location, Single location, Other, Screens}/` |
| Audit | Google Sheet "Redzone TV Audit", id `1wmntH7v1445zW4YJC4Df5eEw_MR2qnaGd_3h64l_OuM`. Tab `Slides` (column C slide name, I Status). Tab `Components` (column C component name, I Status). Tab `Slide Analysis` (question each slide answers). |

The reference images show the current product with known problems (the audit Notes column lists them). Learn the data from them, never copy their look.

## Per slide

1. Read its definition, design guide entry, audit row and Slide Analysis row, and look at its reference captures.
2. Challenge the key question. If a better one fits, use it and log the change in `docs/agent/questions.md`.
3. Map each "must show" item to an existing component. List what is missing. Prefer extending an existing component (a prop or a variant) over a new one. Shared needs (a table row, a progress bar, a ranked bar) become one reusable component, not one per slide.
4. Build the slide in `src/slides/<kebab-name>/` with `types.ts`, `mock.ts`, `<Name>.vue` and `<Name>.stories.ts`, using `TvShell` and a template from `src/templates/` like Run Throughput. Story title `Slides/<Single location | Multiple location | Other>/<Name>`.
5. Stories: at least `Positive` (on target) and `Negative` (below target). Add more scenarios from the guide when time allows. Mock data is realistic: real-looking line and product names, formatted numbers, one long name.
6. New components go in the matching `src/components/<group>/` folder with stories in that group's `.stories.ts`, a section in the group's `.mdx` Docs page, and tokens only.
7. Check in Storybook with the built-in browser pane: each story in Dark and Light at 1920 x 1080. Fix overflow, clipping, truncation, contrast and alignment problems before moving on.
8. Validate against every checklist item in Accessibility, Information design and Brand expression. Record the result in the slide's story file header comment as passed IDs and failed IDs with the reason.
9. Run the checks in `CLAUDE.md`. Commit one slide per commit on the current branch with a message `Add <Name> slide (pending approval)`. Push the branch (`git push origin HEAD`). Never touch `main`.
10. Audit: set Status to `Pending approval` for the slide row and for every component you created or changed. Never write `Approved`: only the user approves, and approval closes the item. Do not edit other columns.
11. Append to `docs/agent/progress.md`: slide, stories built, components reused, components created, checklist failures, open questions.

## When you are unsure

- Do not stop and do not ask. Write the question, the options and your assumption in `docs/agent/questions.md` under the slide name, then continue with the assumption.
- Definitions pending (Maintenance Status, SPC Dashboard, Company Inherited Highlight): build a proposal from the captures and the design guide, and say so in the story header.
- If a slide cannot be finished, leave it compiling with what works, log why in `progress.md`, and move to the next one.

## Quality bar

- The answer to the key question is the most prominent element (INFO-02). One hero per slide (INFO-08).
- Only the main KPI has primary feedback; everything else is secondary (INFO-05).
- No hardcoded colors or sizes. No new type sizes. 4 px spacing. Light and Dark.
- Coherence beats novelty: same header, footer, card style, spacing and chart language as Run Throughput.
