# Slide builder progress

One entry per slide, newest last.

## Order

1. Single location, close to Run Throughput: Shift Throughput, Hourly OEE, Hourly Counts, Units/Man Hour.
2. Single location: Run Speed, Counts, Pareto, Discrete Location, Discrete Station, Line Balance, Cycles, Run (Fast Cycles), Shift (Fast Cycles), Operations, X-Bar R.
3. Multiple location: Shift Dashboard, Throughput Dashboard, Run Dashboard, Up/Down Stream, Scoreboard, Leaderboard.
4. Other: News, Company Update, Welcome.
5. Definitions pending: Maintenance Status, SPC Dashboard, Company Inherited Highlight.

Run Throughput is already built: mark it Pending approval in the audit at the start.

## Log

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
