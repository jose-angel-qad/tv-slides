# Slide builder progress

## Status

Round 1 (November 28, overnight) built all 27 slides as drafts. Review found that many copied the Run Throughput layout, added data the slides do not need, used unnecessary sub-headers, gave Other slides a negative state, and had weak craft outside the Run Throughput look. The agent was rewritten. Round 1 entries are kept below as history; every slide except Run Throughput is redesigned from its key question.

## Approved examples

- Run Throughput (`src/slides/run-throughput/`)

Add slides here when the user approves them; they become references for style and judgment.

## Round 2 order

Pilot review (November 29): the approach works. Hourly OEE had no feedback. Shift Dashboard feedback became the rules in the agent's "Step 4b. System rules from the pilot review": row hierarchy with a metric cell instead of larger text, one status per element, a run status badge, and one chart geometry for every bar chart.

Long run (overnight), every slide except Run Throughput:

1. Foundations and shared pieces first: `chartGeometry.ts` applied to every existing bar chart; status subtle tokens; Run status badge; table row layout and metric cell.
2. Shift Dashboard: apply the pilot feedback.
3. Hourly OEE: keep the pilot design; apply the chart geometry only.
4. Company Update (pilot slide not started).
5. The rest of Single location: Shift Throughput, Hourly Counts, Units/Man Hour, Run Speed, Counts, Pareto, Discrete Location, Discrete Station, Line Balance, Cycles, Run (Fast Cycles), Shift (Fast Cycles), Operations, X-Bar R.
6. Multiple location: Throughput Dashboard, Run Dashboard, Up/Down Stream, Scoreboard, Leaderboard.
7. Other: News, Welcome.
8. Definitions pending: Maintenance Status, SPC Dashboard, Company Inherited Highlight.

Breadth first: every slide redesigned and passing the review gate before extra scenarios.

## Round 2 log (pilot)

### Hourly OEE (pending approval)
- Question: which hours met the OEE target? (guide, kept)
- Hero: the hourly OEE bar chart, full body. Its title is the answer count ("5 of 6 hours on target").
- Layout: chart alone in one card. Options considered: hero number over the chart (round 1, splits attention), chart plus a per-hour side list (repeats the bar labels). The question is a pattern over time, so the chart gets all the room. Future hours of the shift stay as empty slots, like the current product, so the remaining shift is visible.
- Left out: shift OEE hero and its Status band, Hours on target and Current hour tiles, chart title "OEE per hour" (repeats the header), shift name and times (the hour ticks show the span), side navigation of the current product.
- Own body: Hourly OEE no longer uses `_shared/HourlyMetric.vue`, so Hourly counts and Units/man hour are untouched until they are redesigned.
- Stories: Positive (an hour above 100%, partial current hour), Negative (long location name).
- Reused: Chart card, Hourly bar chart, Chart legend item. Created: none.
- Changed: Hourly bar chart. New optional `gridValues` prop (OEE gridlines at 50% and 100%, axis ends at 100% or the tallest bar). A surface plate behind any value label the target line crosses. Run throughput renders the same except the plate behind 402 and 408.
- Reviews: 1) FAIL, blocking: the target line showed through value labels; minor: empty 9 PM slot, summary size. Fixed the blocking item with the label plate. 2) PASS, no blocking. Minor findings kept as is: the future 9 PM slot (shift span, as in the current product), 101.2% (guide handoff scenario), no status icon on the summary (the bars carry status; one primary feedback only on a main KPI, and this slide has none).
- Checklists: passed A11Y-01 to A11Y-11, A11Y-13 to A11Y-16, A11Y-20; INFO-01 to INFO-03, INFO-05 to INFO-18, INFO-20 to INFO-25; BRAND-01 to BRAND-12. INFO-04 not applicable (no main KPI). INFO-16 partly: labels near the target sit on a plate that hides the line instead of moving off it. Not verified: INFO-19 (only Positive and Negative), A11Y-12, A11Y-17 to A11Y-19.
- Open questions: shift OEE left out, see questions.md.

### Shift dashboard (pending approval)
- Question: how is each line's shift going, and is it running now? (guide, kept)
- Hero: shift OEE in each row (largest value, with its status icon). Running has the positive icon; a stopped line gets a "Stopped" pill in the negative fill, so "stopped now" never reads like "below target".
- Layout: one row card per location, column headers on the sheet, six rows per page. Options considered: one titled card with a table (round 1, rows squeezed to 72 px), a grid of location cards (values do not line up for comparison). Rows share the page height between 112 and 176 px, so four lines fill the sheet and their bars grow.
- Left out: card title "Shift performance by location", the "Location" column header (the names say it), legend, "11 of 11 on target" text, green check on Running (normal state), per-row hour ticks and side navigation of the current product.
- Stories: Positive (four lines on target, running), Negative (page 1 of 2, two stopped lines, long location name, long shift name, zero downtime).
- Reused: Status value, Mini hourly bars. No longer used here: T4 Table, Chart card, Location table, Chart legend item.
- Changed: Mini hourly bars (current hour at least 8 px; docs allow a column header instead of a text summary).
- Reviews: 1) FAIL, blocking: dead zone under four rows next to cramped 55 px bars. Minor: shift name repeated, page indicator in the header row, target value not shown, wide gap after short names, gray Running, tiny current-hour bar on stopped lines. Fixed: rows grow to fill, bars fill the row, target named once in the OEE header ("OEE, target 80%"), Running in text/primary. Kept: shift name per row (it can differ per location), page indicator at the end of the header row, the tiny current bar (it is real data). 2) FAIL, blocking: location column sized to the longest name left a 400 px gap and squeezed the bars to 430 px; Stopped looked like a running line below target. Fixed: location column narrowed (long names wrap), chart column about 620 px, Stopped as a pill in status/negative/fill with on-fill text and icon, Location header removed, rows up to 184 px. Kept: below-target bars rely on color plus their position under the dashed target line. 3) FAIL, blocking: Running had no status icon (A11Y-10). Fixed: Running uses the positive icon with no fill. Minor fixed: one bar height for every row (120 px up to four rows, 80 px for five or six), current hour at least 8 px. Minor kept: OEE could be larger with four rows (no larger type role fits a row), shift name per row. 4) PASS, no blocking. Minor kept for the user's review: shift name repeated when all lines share it, below-target mini bars marked mostly by color, no legend for the hatched current hour, sparse location column with four short names.
- Checklists: passed A11Y-01 to A11Y-11, A11Y-13 to A11Y-17, A11Y-20; INFO-01 to INFO-03, INFO-06 to INFO-18, INFO-20 to INFO-25; BRAND-01 to BRAND-12. INFO-04 and INFO-05: no single main KPI on a multiple location slide. Stopped uses a status fill, which INFO-05 reserves for the main KPI; logged in questions.md. INFO-10: the row OEE uses the slide title role (Geist Bold 44), no table hero role exists. Not verified: INFO-19 (only Positive and Negative), A11Y-12, A11Y-18, A11Y-19.
- Open questions: see questions.md.

## Round 2 log

### Shared pieces (pending approval)
- Chart geometry: `src/components/data-viz/chartGeometry.ts`. Bar 62% of its slot up to 104 px (the cap keeps Run throughput unchanged), 8 px gap floor, radius `min(10, bar x 0.15)`, shared axis, target line and hatching. Applied to Hourly bar chart (no visible change, bars still 104 px in Hourly OEE and Run throughput), Mini hourly bars (now SVG, 62% bars instead of fixed 4 px gaps), Bar list (end radius 4.8 px, shared hatching, 32 px bars 24 px apart) and Step flow chart (container query units for the 62% width and radius).
- Foundations: `color/status/{positive, warning, negative, neutral}/subtle` and `/subtle-border`, Dark and Light. Contrast of content on subtle: Dark 7.24, 7.62, 5.21, 5.47; Light 4.80, 4.62, 4.59, 5.40. Light warning and negative tints are very light so the content colors keep 4.5:1; the border carries most of the tint. Logged for approval.
- Run status badge (Status), seven states with filled icons; `runState.ts` holds the states.
- Location table (Table) is now the shared row layout; Metric cell (Table) is the row hero.
- Audit: Table column header, Multi-location table row, Run status indicator, Current Leader bar, Mini hourly bar chart, Pareto row set to Pending approval. No audit rows exist for Step flow chart, Metric cell, Run status badge as named, or Chart geometry.

### Hourly OEE (pending approval)
- Pilot design kept. Chart geometry comes through the Hourly bar chart; no visible change (bars 104 px). Body moved into the shared `_shared/HourlyTargetChart.vue`, now also used by Hourly counts and Units/man hour; render unchanged.

### Company update (pending approval)
- Question: what is the company sharing today? (guide, kept)
- Hero: the attached file, contain fit, with the card finish (radius 24, border, elevation) on the file itself. No card padding or caption.
- Layout: options were the file in a titled card (round 1, frame shrinks the file), full bleed (loses the set's finish and the edge of white files), the file alone with the card finish (chosen).
- Left out: card padding and caption row, location in the header (the update's name is the header context), the "file cannot load" story (not a slide state; the frame still says so in a sentence), spinner (static loading text, A11Y-13).
- Stories: Landscape, Portrait, Multi-page PDF, No content, Loading.
- Reused: Empty state message. Changed: Media frame (no padding or caption, `loading` prop, No content message). Story helper `slideRender` takes an optional header context.
- Reviews: 1) PASS, no blocking. Minor kept: loading looks close to No content (static on purpose, A11Y-13; the icon and sentence differ), "Page 1 of 3" small and costs 48 px of page height, white PDF page edge soft in Light, the header repeats the artwork heading (it is the update's name), empty state heading in Geist (Empty state component, unchanged).
- Checklists: passed A11Y-01 to A11Y-11, A11Y-13 to A11Y-16, A11Y-20; INFO-01, INFO-02, INFO-07, INFO-08, INFO-10, INFO-19 (no content and loading built), INFO-20, INFO-21, INFO-24; BRAND-01 to BRAND-08, BRAND-10 to BRAND-12. Not applicable: INFO-03 to INFO-06, INFO-09, INFO-11 to INFO-18, INFO-22, INFO-23, INFO-25. BRAND-09: changed component pending approval. Not verified: A11Y-12, A11Y-17 to A11Y-19.

### Shift dashboard, pilot feedback applied (pending approval)
- Question: how is each line's shift going, and is it running now? (kept)
- Row hero: shift OEE in a Metric cell right after the location (value, "Target 80%", the row's one status icon). Run state as a Run status badge. Downtime plain. Last 12 hours: Mini hourly bars on the shared geometry.
- Shift name: in the OEE header for the common shift ("Shift 2 OEE"); a row on another shift names it under the location.
- Layout: shared Location table (headers on the sheet, row cards, one grid). Rows fill 112 to 184 px; bars 120 px up to four rows, 80 px for five or six.
- Left out: the larger slide-title OEE (pilot), status on downtime, the Stopped fill pill (replaced by the badge).
- Stories: Positive (four lines running on target), Negative (page 1 of 2, Stopped, Breakdown, Changeover, long name, a row on another shift).
- Reused: Location table, Metric cell, Run status badge, Mini hourly bars. Changed: Location table row padding 8 px (six rows with a Metric cell fit the page).
- Reviews: 1) FAIL, blocking: six rows overflowed the sheet. Minor: dead space with four rows, short current-hour bar reads as a nub, shift name as the location header, shift repeated per row. Fixed: row padding 8 px (all rows end at the table edge), shift in the OEE header and only on rows on another shift. 2) PASS. Minor kept: four rows leave space inside 184 px rows (a dead zone below was blocking in the pilot), hero value same size as other cells (the rule asks for a container, not size), "Page 1 of 2" in the hours header, mini bars without labels, Light red OEE value 3.97:1 on the Metric cell over the gradient top (32 px SemiBold is large text, 3:1), row 3 taller with its own shift.
- Checklists: passed A11Y-01 to A11Y-11, A11Y-13 to A11Y-17, A11Y-20; INFO-01 to INFO-03, INFO-06 to INFO-18, INFO-20 to INFO-25; BRAND-01 to BRAND-12. INFO-04, INFO-05: no single main KPI. Not verified: INFO-19, A11Y-12, A11Y-18, A11Y-19.

### Shift throughput (pending approval)
- Question: how many units has this shift made versus plan? (kept)
- Hero: units produced "of" the shift plan, gap to plan in the Status band.
- Layout: hero and one crew tile over the units per hour chart. The question and data are Run throughput's without an ETA, so the same form fits; the hero takes the ETA's width. Options: hero plus two tiles (second would be filler), hero alone with crew in the subtitle (no room for crew status).
- Left out: "Average per hour" tile (round 1), "Current shift" tile (in the hero subtitle), estimated finish.
- Stories: Positive, Negative (behind plan, crew short, long location), No crew target.
- Reused: KPI tile large, Stat tile, Crew size indicator, Chart card, Hourly bar chart, Chart legend item. Changed: Crew size indicator, new `quiet` prop (neutral "Target 6.0" when on or above target).
- Reviews: 1) PASS. Minor kept: No crew target value sits lower than the hero (Stat tile without footer), crew on target is neutral here and positive on Run throughput (question logged), no zero tick (same as Run throughput).
- Checklists: passed A11Y-01 to A11Y-11, A11Y-13 to A11Y-17, A11Y-20; INFO-01 to INFO-18, INFO-20 to INFO-25; BRAND-01 to BRAND-12. Not verified: INFO-19, A11Y-12, A11Y-18, A11Y-19.

### Hourly counts (pending approval)
- Question: which hours met the count target? (kept)
- Hero: the hourly bar chart, full body, same form as Hourly OEE (guide: same template). Title is the answer and names the unit: "Bottles per hour: 5 of 7 hours on target".
- Left out: shift total and gap hero (round 1, Shift throughput answers it), hours on target and current hour tiles, shift name and times.
- Stories: Positive (partial current hour), Negative (long location).
- Reused: shared `_shared/HourlyTargetChart.vue` (new, extracted from Hourly OEE), Chart card, Hourly bar chart, Chart legend item. Removed: round 1 `_shared/HourlyMetric.vue`.
- Reviews: 1) PASS. Minor fixed: uneven gridlines (500, 1,500); the shared body now passes about three even steps. 
- Checklists: passed A11Y-01 to A11Y-11, A11Y-13 to A11Y-16, A11Y-20; INFO-01 to INFO-03, INFO-05 to INFO-18, INFO-20 to INFO-25; BRAND-01 to BRAND-12. INFO-04 not applicable. Not verified: INFO-19, A11Y-12, A11Y-17 to A11Y-19.

### Units/man hour (pending approval)
- Question: is labor productivity on target each hour? (kept)
- Hero: the hourly chart, full body; title "Cases per man hour: 5 of 6 hours on target". Rate values, whole-number ticks.
- Left out: shift average hero (round 1), tiles, shift name.
- Stories: Positive, Negative (long location). The current hour carries the rate so far, so it compares with the target.
- Reviews: 1) PASS. Minor fixed: uneven ticks, misleading partial-hour rate in the mock. Minor kept: the title lead "Cases per man hour" is close to the slide title (it adds the unit).
- Checklists: as Hourly counts.

## Round 1 log (drafts, superseded)

### Shift throughput
- Stories: Positive, Negative, No crew target.
- Reused: T3 Hero + support, KPI tile large, Stat tile, Crew size indicator, Chart card, Hourly bar chart, Chart legend item.
- Created: `slideRender` story helper (`src/slides/_shared/slideStory.ts`), format helpers (`formatPercent`, `formatSigned`, `formatClock`).
- Changed: Hourly bar chart (`format`, `tickFormat` props).
- Checklist failures: INFO-19 (only 3 of the 6 data states); A11Y-12, A11Y-17 to A11Y-19 not tested.
- Open questions: none. The ETA tile is replaced by the average per finished hour, since a shift ends at a fixed time.

### Hourly OEE
- Stories: Positive (with an hour above 100%), Negative.
- Reused: T3 Hero + support, KPI tile large, Stat tile, Chart card, Hourly bar chart, Chart legend item.
- Created: shared slide body `src/slides/_shared/HourlyMetric.vue` (also used by Hourly counts and Units/man hour).
- Checklist failures: INFO-19 (2 of 6 data states); A11Y-12, A11Y-17 to A11Y-19 not tested.
- Open questions: hero is shift OEE (Claude idea); key question kept. See questions.md.

### Hourly counts
- Stories: Positive, Negative (long location name).
- Reused: shared `HourlyMetric` body, KPI tile large, Stat tile, Chart card, Hourly bar chart, Chart legend item.
- Created: none.
- Checklist failures: INFO-19 (2 of 6 data states); A11Y-12, A11Y-17 to A11Y-19 not tested.
- Open questions: see "Hourly OEE, Hourly counts, Units/man hour" in questions.md.

### Units/man hour
- Stories: Positive, Negative (long location name).
- Reused: shared `HourlyMetric` body, KPI tile large, Stat tile, Chart card, Hourly bar chart, Chart legend item.
- Created: none.
- Checklist failures: INFO-19 (2 of 6 data states); A11Y-12, A11Y-17 to A11Y-19 not tested.
- Open questions: see "Hourly OEE, Hourly counts, Units/man hour" in questions.md.

### Run speed
- Stories: Positive, Negative (long product and location), ETA not available.
- Reused: T3 Hero + support, KPI tile large, Stat tile, Chart card.
- Created: Progress bar (Data display), with story and Docs page.
- Checklist failures: BRAND-09 (new component pending approval); INFO-19 (3 of 6 states); A11Y-12, A11Y-17 to A11Y-19 not tested.
- Open questions: product name placement (questions.md, KPI tile). The race track and car are dropped.

### Counts
- Stories: Positive, Negative (stopped now).
- Reused: T3 Hero + support, KPI tile large, Stat tile, Chart card, Chart legend item.
- Created: Line chart (Data viz), with story and Docs section. (Bar list and T2 template were committed with Run speed, documented here.)
- Checklist failures: INFO-17 not applicable to a line; BRAND-09 (new component pending approval); INFO-19 (2 of 6 states); A11Y-12, A11Y-17 to A11Y-19 not tested.
- Open questions: y axis unit (questions.md).

### Pareto
- Stories: Positive (few small losses), Negative (8 problems, top 7 shown, long name).
- Reused: Chart card, Stat tile.
- Created: T2 List + support template; Bar list (Data viz) first used here.
- Checklist failures: INFO-04/INFO-05 not applicable (no target, no primary feedback); INFO-17 not applicable; BRAND-09 (new component and template pending approval); INFO-19 (2 of 6 states); A11Y-12, A11Y-17 to A11Y-19 not tested.
- Open questions: sub-locations and the missing status (questions.md).

### Discrete location
- Stories: Positive, Negative (long location name).
- Reused: T3 Hero + support, KPI tile large, Stat tile, Chart card, Hourly bar chart, Chart legend item.
- Created: none.
- Checklist failures: INFO-19 (2 of 6 states); A11Y-12, A11Y-17 to A11Y-19 not tested.
- Open questions: what the OEE change compares against (questions.md). The OEE change is not shown.

### Discrete station
- Stories: Positive (working), Negative (over step time, long names), Idle.
- Reused: T3 Hero + support, KPI tile large, Stat tile, Chart card, Bar list, Hourly bar chart.
- Created: none.
- Checklist failures: INFO-19 (3 of 6 states); A11Y-12, A11Y-17 to A11Y-19 not tested. The hourly chart at half width is tight: below-target value labels with icons nearly touch.
- Open questions: the period of the steps value, station states (questions.md).

### Line balance
- Stories: Positive (flowing), Negative (bottleneck, long step names).
- Reused: T3 Hero + support, KPI tile large, Stat tile, Chart card.
- Created: Step flow chart (Data viz), with story and Docs section.
- Checklist failures: INFO-17 not applicable; BRAND-09 (new component pending approval); INFO-19 (2 of 6 states); A11Y-12, A11Y-17 to A11Y-19 not tested. Long step names that wrap to three lines shorten the bars.
- Open questions: WIP threshold (questions.md).

### Cycles
- Stories: Positive, Negative (overrun, rejected, no product, long names).
- Reused: T2 List + support, Chart card, Bar list, KPI tile large, Stat tile, Chart legend item.
- Created: none.
- Checklist failures: INFO-17 not applicable (active cycles are hatched); INFO-19 (2 of 6 states); A11Y-12, A11Y-17 to A11Y-19 not tested.
- Open questions: active versus total cycle time, Rejected (questions.md). Only the active average is shown.

### Run (Fast cycles)
- Stories: Positive, Negative (over target, one asset not reporting, long product name).
- Reused: T2 List + support, Chart card, Bar list (with target), KPI tile large, Stat tile, Chart legend item.
- Created: shared helpers `_shared/fastCycles.ts` (used by Shift (Fast cycles)).
- Checklist failures: INFO-17 not applicable; INFO-19 (2 of 6 states); A11Y-12, A11Y-17 to A11Y-19 not tested.
- Open questions: colored dashes, green count badge, "Avg. to target" (questions.md). Not shown.

### Shift (Fast cycles)
- Stories: Positive, Negative (over target, one asset not reporting, OEE below target, long names).
- Reused: T2 List + support, Chart card, Bar list, KPI tile large, Stat tile, Chart legend item, `_shared/fastCycles.ts`.
- Created: none.
- Checklist failures: INFO-17 not applicable; INFO-19 (2 of 6 states); A11Y-12, A11Y-17 to A11Y-19 not tested.
- Open questions: see "Run (Fast cycles), Shift (Fast cycles)" in questions.md.

### Operations
- Stories: Positive, Negative (Reliability and Compliance on), Reliability and Compliance off.
- Reused: T3 Hero + support, KPI tile large, Stat tile, Chart card, Bar list, Line chart.
- Created: none.
- Checklist failures: INFO-23 partial (long product names wrap in the half-width chart card and shorten the chart); INFO-17 not applicable; INFO-19 (3 of 6 states); A11Y-12, A11Y-17 to A11Y-19 not tested. The list shows the 3 oldest items and "N more".
- Open questions: units value and sunrise time (questions.md).

### X-Bar R
- Stories: Positive (in control), Negative (out of control, long names).
- Reused: T3 Hero + support, KPI tile large, Stat tile, Chart card, Line chart.
- Changed: Line chart (`flagLow` prop, for range charts).
- Checklist failures: INFO-18 (control charts are not zero based, by design); INFO-17 not applicable; INFO-19 (2 of 6 states); A11Y-12, A11Y-17 to A11Y-19 not tested.
- Open questions: capability target and spec lines (questions.md).

### Shift dashboard
- Stories: Positive (4 locations), Negative (8 locations, page 1 of 2, two stopped, long name).
- Reused: Chart card, Chart legend item, Status icon.
- Created: T4 Table template, Location table (Table), Status value (Status), Mini hourly bars (Data viz), with stories and Docs.
- Checklist failures: INFO-04/INFO-05 (no single main KPI on multiple location slides); INFO-10 (row hero uses the slide title role); BRAND-09 (new components pending approval); INFO-19 (2 of 6 states); A11Y-12, A11Y-17 to A11Y-19 not tested.
- Open questions: primary feedback on multiple location slides, row hero type role, run statuses (questions.md).

### Throughput dashboard
- Stories: Positive (one location without crew target), Negative (three behind plan, crew below target, long name).
- Reused: T4 template, Chart card (one per location), Status value, Mini hourly bars.
- Created: none (the "Throughput location card" is a Chart card composition, not a new component).
- Checklist failures: INFO-04/INFO-05 (no single main KPI); INFO-16 (target in the caption, not on the compact bars); INFO-19 (2 of 6 states); A11Y-12, A11Y-17 to A11Y-19 not tested.
- Open questions: what the plus or minus compares against, the orange tile (questions.md).

### Run dashboard
- Stories: Positive (one run complete), Negative (below target, quality issue, no active run, long names).
- Reused: T4 template, Chart card, Location table, Status value, Progress bar.
- Changed: Progress bar (label takes the free width before wrapping).
- Checklist failures: INFO-04/INFO-05 (no single main KPI); INFO-10 (row hero role); INFO-17 not applicable; INFO-19 (2 of 6 states); A11Y-12, A11Y-17 to A11Y-19 not tested. Product names wrap to two or three lines; with 8 long names the page would need fewer rows.
- Open questions: quality circle and badge (questions.md).

### Up/Down stream
- Stories: Positive (ahead or on time), Negative (behind, a stopped line without ETA, long names).
- Reused: T4 template, Chart card, Location table, Status value, Progress bar.
- Created: none.
- Checklist failures: INFO-04/INFO-05 (no single main KPI); INFO-10 (row hero role); INFO-17 not applicable; INFO-19 (2 of 6 states); A11Y-12, A11Y-17 to A11Y-19 not tested. Product names wrap to two or three lines in the progress column.
- Open questions: sign convention, row order (questions.md).

### Scoreboard
- Stories: Positive (5 locations), Negative (8 locations, below target, metrics with no value yet).
- Reused: T4 template, Chart card, Location table, Status value.
- Created: none.
- Checklist failures: INFO-04/INFO-05 (no single main KPI); INFO-10 (row hero role); INFO-17 not applicable; INFO-19 (2 of 6 states); A11Y-12, A11Y-17 to A11Y-19 not tested. Must show is partial by design (4 columns).
- Open questions: which columns stay (questions.md).

### Leaderboard
- Stories: Positive (clear leader), Negative (tie for first), Start of shift (all at 0).
- Reused: T2 List + support, Chart card, Bar list, Stat tile.
- Created: none (points key is a Chart card with a list; it replaces the Points legend).
- Checklist failures: INFO-04/INFO-05 (no target, no primary feedback, by design); INFO-17 not applicable; INFO-19 (3 of 6 states); A11Y-12, A11Y-17 to A11Y-19 not tested.
- Open questions: how points are earned, hourly bars (questions.md).

### News
- Stories: Positive (one page of four items), Negative (no news yet).
- Reused: T4 template, Chart card, Status icon.
- Created: News item (Content), Empty state message (Feedback), six content icons in Material icon.
- Checklist failures: BRAND-09 (new components pending approval); INFO-19 (2 of 6 states); A11Y-12, A11Y-18, A11Y-19 not tested.
- Open questions: item types and their icons (questions.md).

### Company update
- Stories: Positive (landscape image), Portrait PDF page (1 of 3), Negative (file cannot load).
- Reused: T4 template, Empty state message.
- Created: Media frame (Content). Docs section in Content; no separate story (the slide stories cover it).
- Checklist failures: BRAND-09 (new component pending approval); INFO-19 (loading and stale not built); A11Y-12, A11Y-18, A11Y-19 not tested.
- Open questions: multi-page PDFs (questions.md).

### Welcome
- Stories: Positive (three new hires, one without photo, one long name), Negative (no new hires).
- Reused: T4 template, Chart card, Empty state message, Material icon.
- Created: Person card (Content).
- Checklist failures: BRAND-09 (new component pending approval); INFO-19 (loading and stale not built); A11Y-12, A11Y-18, A11Y-19 not tested; the name uses the slide title role.
- Open questions: maximum new hires (questions.md).

### Maintenance status (proposal, definition pending)
- Stories: Positive (all running, counts under limits), Negative (active issues, counts over limits, long names).
- Reused: T4 template, Chart card, Location table, Status value.
- Created: none.
- Checklist failures: INFO-09 (five columns); INFO-24 (abbreviations spelled out with assumed meanings); INFO-04/INFO-05 (no single main KPI); INFO-19 (2 of 6 states); A11Y-12, A11Y-17 to A11Y-19 not tested.
- Open questions: PM, WO, CL, OD and their limits (questions.md).

### SPC dashboard (proposal, definition pending)
- Stories: Positive (all in control), Negative (two out of control, Cpk below target, long name).
- Reused: T4 template, Chart card, Location table, Status value.
- Created: none (the "SPC statistics list" is a Location table composition).
- Checklist failures: INFO-04/INFO-05 (no single main KPI); INFO-10 (row hero role); INFO-19 (2 of 6 states); A11Y-12, A11Y-17 to A11Y-19 not tested.
- Open questions: one chart or a list (questions.md).

### Company inherited highlight (proposal, definition pending)
- Stories: Positive (headline, message, image), Negative (nothing shared).
- Reused: T4 template, Chart card, Empty state message.
- Created: none.
- Checklist failures: INFO-01 (proposed key question); INFO-10 (headline uses the secondary KPI value role for text); INFO-19 (2 of 6 states); A11Y-12, A11Y-18, A11Y-19 not tested.
- Open questions: what the slide is (questions.md).

## Night summary
- 27 of 27 slides have a commit with Positive and Negative stories, checked in Light and Dark at 1920 x 1080.
- New components: Progress bar, Bar list, Line chart, Step flow chart, Mini hourly bars, Location table, Status value, Empty state message, News item, Media frame, Person card; templates T2 List + support and T4 Table. Changed: Hourly bar chart, Material icon.
- Not done anywhere: loading, stale, disconnected, error and slideshow menu states (INFO-19); grayscale, Arabic, tall script and long language checks.
- The audit tab Components has no rows for Step flow chart, Line chart (logged on "Count trend area chart"), Status value (logged on "Trend indicator"), the T2 and T4 templates or the content icons. Only column I was edited, so these are listed here only.
