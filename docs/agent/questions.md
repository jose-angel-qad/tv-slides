# Open questions

Questions the slide-builder agent could not answer, with the assumption it used. Review them with the design owner, then turn the answers into rules or update the slide.

Format per entry:

```
## <Slide or component>
- Question:
- Options:
- Assumption used:
- Where it shows: <story or file>
```

## Shift dashboard (round 2)
- Question: when every location is on the same shift, should the shift name show once instead of on every row?
- Options: per row always (consistent rows); once in the column header when shared, per row only when shifts differ.
- Assumption used: per row always, since a slide set can mix areas on different shifts.
- Where it shows: `src/slides/shift-dashboard/ShiftDashboard.vue`
- Question: the last 12 hours can include the previous shift (handoff scenario). Should the bars mark where the current shift starts?
- Assumption used: not marked yet. Needs the shift start in the data.
- Question: Stopped uses a pill in status/negative/fill. INFO-05 reserves fills for the main KPI. Is a stopped line an exception that may use a fill on multiple location slides?
- Options: fill pill (stands out from below-target lines on a squint); icon and color only (round 1, reviewers found it too close to a below-target line).
- Assumption used: fill pill. If not allowed, the fallback is the icon-and-text Status value.
- Question: which run statuses exist besides running and stopped? (guide open question)
- Assumption used: only running and stopped.

## Hourly OEE (round 2)
- Question: should the slide show the shift OEE as one large number (design guide Claude idea)?
- Options: shift OEE as hero above the chart (round 1); chart only, with the count of hours on target as its title.
- Assumption used: chart only. Shift OEE answers "how is the shift going", not "which hours met the target", and is already on the Shift dashboard. Easy to add back as a single number next to the count if plants ask for it.
- Where it shows: `src/slides/hourly-oee/HourlyOee.vue`
- Question: should future hours of the shift show as empty slots?
- Assumption used: yes, like the current product, so viewers see how much of the shift is left. A reviewer flagged the empty slot as dead space; drop it if the shift span is not useful.

## Hourly OEE, Hourly counts, Units/man hour (round 1)
- Question: should the hero be the shift value (OEE, total count, average rate) or the number of hours on target?
- Options: shift value as hero with the hourly chart below; hours on target as hero.
- Assumption used: shift value as hero with the Status band; hours on target and the current hour as neutral support tiles. The key question "Which hours met the target?" is answered by the chart and the support tile.
- Where it shows: `src/slides/_shared/HourlyMetric.vue`
- Question: what does the shift gap compare against (target times finished hours, or the pace to date)?
- Assumption used: the mock passes the gap directly (`shiftGap`); OEE in points, counts in units, rates in units per man hour.

## KPI tile, large and Stat tile (all slides)
- Question: product names are never cut (INFO-23), but the tile subtitle is one line with an ellipsis. Run throughput cuts long product names today.
- Options: let the subtitle wrap to two lines (the 380 px tile has no room without shrinking the value); move the product name to a card where it can wrap; allow the ellipsis only in the tile.
- Assumption used: new slides put the full product name where it can wrap (progress bar label, table cell) and keep the tile subtitle short (SKU, shift, start time). Run throughput is unchanged.
- Where it shows: Run speed, Run dashboard, Up/Down stream.

## Counts
- Question: what unit does the vertical axis use, and is there a target rate?
- Options: units per hour; units per minute; percent of target speed.
- Assumption used: units per hour, sampled every 10 minutes, with a target rate line. Stops show as drops to zero.
- Where it shows: `src/slides/counts/`

## Pareto
- Question: with sub-locations, show only the top groups or all of them? And should the slide have a primary status when losses have no target?
- Options: one list of the top 7 for the location; one page per sub-location; a status against a loss budget.
- Assumption used: one list of the top 7 problems by time lost for the location, with "N more not shown". No status anywhere (INFO-03: no target, stays neutral). Problem type is a text label, not a color.
- Where it shows: `src/slides/pareto/`

## Discrete location
- Question: what does the OEE change (for example +13.2%) compare against, and is there a quality target?
- Options: previous shift; same shift last week; OEE target.
- Assumption used: the change is dropped; OEE shows its status against the OEE target. Quality has no target, so it stays neutral.
- Where it shows: `src/slides/discrete-location/`

## Discrete station
- Question: what period does the large steps value cover, and which station states exist besides Idle and Time left?
- Options: this shift; the current run; since the station last went idle.
- Assumption used: steps completed this shift (matches the hourly chart). States: working (time left, positive), idle (warning), over the step time target (negative). The state and timer are the hero.
- Where it shows: `src/slides/discrete-station/`

## Line balance
- Question: are the triangle numbers WIP, and what WIP count makes a bottleneck?
- Options: a fixed WIP limit per location; the largest WIP is always the bottleneck; a WIP limit per step.
- Assumption used: the numbers are WIP between steps; one WIP limit per location (mock 20). Below it the slide says work is flowing.
- Where it shows: `src/slides/line-balance/`

## Cycles
- Question: what is the difference between active and total cycle time, and what does Rejected mean?
- Options: active = time the asset runs, total = including load and unload; Rejected = the batch failed a check.
- Assumption used: show only the active average cycle. Rejected is a warning (needs attention but not late); overrun is negative. Each asset has its own planned cycle; the mock uses one shared value.
- Where it shows: `src/slides/cycles/`

## Run (Fast cycles), Shift (Fast cycles)
- Question: what do the colored dashes under each bar, the green count badge and "Avg. to target" mean? Should shift units be whole numbers?
- Options: show them with labels once defined; drop them.
- Assumption used: dropped. Each asset shows its current (last finished) cycle against the target line; average cycle against target is the KPI. Shift units are whole numbers (INFO-22).
- Where it shows: `src/slides/run-fast-cycles/`, `src/slides/shift-fast-cycles/`

## Operations
- Question: what are the units value (-390 EA) and the time next to the sunrise icon? Do Data sheets and Maintenance show counts?
- Options: units against plan for the run; units against plan for the shift. The sunrise time may be the shift start or the run ETA.
- Assumption used: units against plan for the run (signed, with status); the sunrise time is not shown, the ETA is. Open items are counted and listed by time open; breakdowns are negative, a lone data sheet is a warning.
- Where it shows: `src/slides/operations/`

## X-Bar R
- Question: which statistics are needed, what Cpk target applies, and should USL and LSL be drawn?
- Options: Cp and Cpk only; add Pp and Ppk; draw spec lines on the X-bar chart.
- Assumption used: Cp (neutral) and Cpk (status against 1.33). Spec limits as text in the chart header; UCL, center and LCL are drawn. "In control" means no point outside the control limits (Western Electric rules not applied).
- Where it shows: `src/slides/x-bar-r/`

## Multiple location slides (Shift dashboard and the rest)
- Question: INFO-05 allows one primary feedback per slide, but a multiple location slide has one KPI per row. What is the main KPI?
- Options: no Status band, each row's hero value carries a secondary status; a summary band ("6 of 8 lines on target") above the table; the worst line as hero.
- Assumption used: no Status band. Each row has one hero column (larger value with its status icon) and the other cells stay secondary.
- Where it shows: `src/slides/shift-dashboard/` and the other multiple location slides.
- Question: there is no type role for a table hero value. Is the slide title role (Geist Bold 44) acceptable, or should a table value role be added to Foundations?
- Assumption used: Status value `lg` uses `--rz-tv-type-slide-title`. Foundations unchanged.
- Question: which run statuses exist besides running and stopped?
- Assumption used: Running (positive) and Stopped (negative), always with a word.

## Throughput dashboard
- Question: what does the plus or minus amount compare against (plan to date or pace), and what does the orange tile mean?
- Assumption used: units ahead or behind the plan to date. Orange (warning) is not used; ahead or on plan is positive, behind is negative. Four locations per page (2 x 2 cards); more locations go to the next page.
- Where it shows: `src/slides/throughput-dashboard/`

## Run dashboard
- Question: what do the quality circle and its number (for example 209) represent, and what is the quality target?
- Options: first-pass quality percent; count of rejected units; open quality checks.
- Assumption used: first-pass quality percent with its status against a 98% target. The count badge is not shown.
- Where it shows: `src/slides/run-dashboard/`

## Up/Down stream
- Question: does a negative value mean ahead or behind schedule, and should rows follow the process flow?
- Assumption used: positive = ahead, negative = behind, always written in words ("14m ahead", "34m behind") so the sign never has to be read. Rows follow the process flow, upstream first; the order is configured, not sorted.
- Where it shows: `src/slides/up-down-stream/`

## Scoreboard
- Question: which Scoreboard columns are required? INFO-09 allows 4 metric columns; the current slide has nine.
- Options: keep shift OEE, start, average changeover and Victory Points (built); swap in ramp up, power hour, huddles or SKUs per persona; a second page of columns.
- Assumption used: shift OEE (row hero), start in minutes late, average changeover against a 30 min target, Victory Points (neutral). Ramp up, power hour, huddles, SKUs and the counts sparkline are dropped. Start: on time or early is positive, late is negative.
- Where it shows: `src/slides/scoreboard/`

## Leaderboard
- Question: how are points earned each hour (4, 2, 1, 0), and are the hourly bars needed here?
- Assumption used: 4 above target, 2 on target, 1 close to target, 0 below target (labels to confirm). Hourly bars are dropped; each row says the gap to the leader and the last hour's points. Points are neutral: no status, no trophy, no brand red.
- Where it shows: `src/slides/leaderboard/`

## News
- Question: which item types exist, how long do items stay, and how many per page?
- Assumption used: alert (warning icon), chat and high five (outlined icons); items from the last 24 hours; 4 per page, newest first, pages instead of a ticker.
- Where it shows: `src/slides/news/`

## Company update
- Question: how are PDFs with several pages shown?
- Options: one page per slide rotation with "Page 1 of 3"; all pages in sequence within one dwell time; first page only.
- Assumption used: one page per rotation with "Page N of M" in the caption. Never scrolled.
- Where it shows: `src/slides/company-update/`

## Welcome
- Question: how many new hires per page, how long do they stay, and is the old red wordmark header needed?
- Assumption used: 3 per page, shown during their first week. The header is the standard Slide header; the brand stays in the footer.
- Where it shows: `src/slides/welcome/`

## Maintenance status (proposal)
- Question: what do PM, WO, CL and OD stand for, and when does a count need attention (CL shows red at 517)?
- Options: PM = preventive maintenance due, WO = open work orders, CL = checklist items open, OD = overdue tasks (assumed).
- Assumption used: those meanings, spelled out in the headers, with assumed limits (PM 5, WO 10, CL 50, OD 1). At or above the limit is negative with its icon; below stays neutral. Five columns break INFO-09 (4 metric columns); dropping one count is an option.
- Where it shows: `src/slides/maintenance-status/`

## SPC dashboard (proposal)
- Question: what does the slide show when it has data, one chart or a list of characteristics?
- Options: a list of characteristics with their control status (built); one X-bar chart per location; the X-Bar R slide per characteristic.
- Assumption used: a list, one row per characteristic, with control status (hero), latest value, control limits and Cpk against 1.33. The charts live on X-Bar R.
- Where it shows: `src/slides/spc-dashboard/`

## Company inherited highlight (proposal)
- Question: what does this slide show? It was only captured empty and is not in the Knowledge Base.
- Options: a company-level Company Update inherited by every site; a KPI highlight rolled up from the parent company; a recognition message.
- Assumption used: a highlight shared by the company with every site (headline, short message, optional image). Proposed key question: "What is the company celebrating or asking of every site today?"
- Where it shows: `src/slides/company-inherited-highlight/`
