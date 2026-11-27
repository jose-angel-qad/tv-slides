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
