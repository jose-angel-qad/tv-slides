# Redzone TV Slide Design Guide

Copy of the Google Doc "Redzone TV Slide Design Guide" (source of truth, may change):
https://docs.google.com/document/d/1ICIVHQYREmD8L_dnkQ5n4OCm9I5LybmQEQYkeC34nO8/edit

Each slide answers one question. Design it so a person on the plant floor gets the answer at a glance, then use the checklist to confirm nothing is missing. Key questions can be challenged: if a better question fits the data and the viewer, propose it and log it in `docs/agent/questions.md`.

"Claude idea" notes are suggestions from an earlier analysis, not decisions.

## Scenarios for every slide

Deliver these for every slide. The sections below list only the extra scenarios each slide needs.

- Live data
- Loading
- No data yet (empty)
- Shift not started
- Stale data, with the last update time
- Disconnected (network banner)
- Error: the slide cannot load
- Slideshow menu shown and hidden
- Long location and product names
- Large numbers
- Multiple location slides: one location and the maximum number of locations
- Every scenario in Light and Dark mode

Overnight minimum: positive (on target) and negative (below target) views in Light and Dark. Add the other scenarios when time allows.

# Multiple location slides

## Scoreboard
Overview of shift stats.
- Key question: Which lines are on track this shift?
- Must show: every location, always in the same order; shift OEE per location, above or below target; start, ramp up, power hour, huddles, SKUs and changeover results per location; Victory Points per location.
- Claude idea: nine columns is too much to read from across the floor. Keep the columns plants use most and drop the counts chart, which has no scale.
- Open questions: which Scoreboard columns are required and which could be removed?
- Handoff scenarios: a location below target; a metric with no value yet (dash).

## Leaderboard
Accumulated Victory Points for the current shift.
- Key question: Who is winning this shift, and by how much?
- Must show: locations ranked by points; points per location; gap to the leader; hourly results that earned the points; what each hour result is worth (4, 2, 1 or 0 points).
- Claude idea: ranked horizontal bars on one shared scale, with the points number at the end of each bar. Mark the leader with a label instead of a red bar.
- Handoff scenarios: tie for first place; everyone at 0 points at the start of the shift.

## Shift Dashboard
Shift OEE, downtime, status, and hourly OEE.
- Key question: How is each line's shift going, and is it running now?
- Must show: shift name; shift OEE, above or below target; running or stopped; downtime so far; OEE for each of the last 12 hours.
- Open questions: which run statuses exist besides running and stopped?
- Handoff scenarios: a stopped line; the last 12 hours include the previous shift.

## Run Dashboard
Run OEE, progress, and quality overview.
- Key question: How far along is each run, and is quality OK?
- Must show: run OEE, above or below target; product code and name; completed of planned, with the unit; quality status.
- Claude idea: replace the quality circle and its number badge with one clear value or label.
- Open questions: what do the quality circle and its number (for example 209) represent?
- Handoff scenarios: run complete; a line with no active run; a quality issue.

## Up/Down Stream
Progress of the locations that feed a process area.
- Key question: Will the lines feeding this area finish on time?
- Must show: product and run progress; running or stopped; minutes ahead or behind schedule; ETA.
- Claude idea: order the rows by process flow, upstream first, and make ahead or behind the largest element in each row.
- Open questions: does a negative value mean ahead or behind schedule?
- Handoff scenarios: ahead of schedule; behind schedule; a stopped line.

## Throughput Dashboard
Unit-based performance.
- Key question: How many units has each line made versus plan?
- Must show: units produced, with the unit; amount ahead or behind plan; units per hour, by hour; crew size against target.
- Claude idea: make units and the gap to plan the main number. The current hour should read as in progress, not as a low hour.
- Open questions: what does the plus or minus amount compare against, plan to date or pace? What does an orange tile mean?
- Handoff scenarios: behind plan; crew below target; no crew target (target 0).

## Maintenance Status
Not in the Knowledge Base.
- Key question: Which lines need maintenance attention now?
- Must show: current status per line (an active issue with its duration, or the running product); PM, WO, CL and OD counts; which counts need attention.
- Claude idea: spell out the four column names on the slide.
- Open questions: what do PM, WO, CL and OD stand for, and when does a count need attention (CL shows red at 517)?
- Handoff scenarios: active issue on a line; all lines running normally; all counts at 0.

## SPC Dashboard
Not in the Knowledge Base. Only captured with no data.
- Key question: Is each monitored characteristic in control?
- Must show: characteristic and location; in or out of control; latest values against the limits (USL, UCL, target, LCL, LSL).
- Open questions: what does the slide show when it has data, one chart or a list of characteristics?
- Handoff scenarios: in control; out of control.

# Single location slides

## Pareto
Location problem Pareto.
- Key question: What is costing this line the most?
- Must show: top problems, sorted by time lost; time and units lost per problem; total lost; problem type (Performance, Quality, Availability, Unallocated or Planned).
- Claude idea: place the problem name outside the bar so short bars stay readable.
- Open questions: with sub-locations, can the slide show only the top groups, or must it show all of them?
- Handoff scenarios: sub-locations that do not fit on one screen; only one problem.

## Counts
Location count trend.
- Key question: Is the line producing at a steady rate?
- Must show: count rate over time; target rate; stops and slowdowns.
- Claude idea: add the current rate as a number above the chart.
- Open questions: what unit does the vertical axis use?
- Handoff scenarios: line stopped right now; target rate changes during the shift.

## Hourly OEE
Location hourly OEE.
- Key question: Which hours met the OEE target?
- Must show: OEE per hour; target; hours above and below target; current hour shown as in progress.
- Claude idea: add shift OEE as one large number above the chart.
- Handoff scenarios: an hour above 100%; partial current hour.

## Hourly Counts
Location hourly counts chart.
- Key question: Which hours met the count target?
- Must show: count per hour; target per hour; hours above and below target; current hour shown as in progress.
- Claude idea: use the same template as Hourly OEE.
- Handoff scenarios: partial current hour.

## Units/Man Hour
Location units per man hour chart.
- Key question: Is labor productivity on target each hour?
- Must show: units per man hour, per hour; target per hour; hours above and below target.
- Claude idea: use the same template as Hourly OEE.
- Handoff scenarios: partial current hour.

## Run Speed
Speed slide for the selected location.
- Key question: Is the run ahead or behind, and when will it finish?
- Must show: units ahead or behind pace; ETA; current speed against pace; completed of planned; product.
- Claude idea: make ahead or behind and the ETA the two largest numbers. The race track can become one progress bar with the car on it.
- Handoff scenarios: behind pace; ETA not available.

## Cycles
Cycle progress by asset.
- Key question: Is each asset's cycle on time?
- Must show: remaining time or overrun per asset; asset state (Active, Inactive, Overrun, Rejected or No Product); run progress, completed of planned; average active and total cycle time.
- Claude idea: one horizontal bar per asset with its state written next to it. The double ring only works with a legend.
- Open questions: what is the difference between active and total cycle time, and what does Rejected mean?
- Handoff scenarios: overrun; rejected; no product; many assets.

## Run (Fast Cycles)
Run overview for a Fast Cycles location.
- Key question: Is the current run on cycle time target?
- Must show: product; average time against target; current cycle time and status per asset; completed of planned.
- Claude idea: remove the empty panels and give the space to the assets.
- Open questions: what do the colored dashes under each bar and the green number badge mean?
- Handoff scenarios: an asset over target; no asset reporting.

## Shift (Fast Cycles)
Shift overview for a Fast Cycles location.
- Key question: Is the shift on cycle time target?
- Must show: shift units; yield and number of problems; OEE; average time against target; current cycle per asset.
- Open questions: shift units show decimals (3915.18). Should they be whole numbers?
- Handoff scenarios: many assets; assets with no cycle.

## Discrete Location
Overview of a step (discrete) location.
- Key question: How many units are finished, and is the line on pace?
- Must show: units finished; current OEE, above or below target; cycle time and units per hour; quality and reworked units; hourly counts.
- Claude idea: show quality as one number instead of a percentage plus a pie.
- Open questions: what does the OEE change (for example +13.2%) compare against?
- Handoff scenarios: below target.

## Discrete Station
A single step (discrete) station.
- Key question: Is this station keeping pace?
- Must show: station state and timer (Idle, Time left); steps completed; average step time against target; quality yield; top problems; steps per hour.
- Claude idea: lead with the station state. It is the first thing an operator needs.
- Open questions: what period does the large steps number cover? It does not match the hourly total.
- Handoff scenarios: idle; over the step time target.

## Line Balance
Steps completed count and WIP count.
- Key question: Where is work piling up?
- Must show: steps in process order; steps completed per step; WIP between steps; the step with the most WIP.
- Claude idea: highlight the bottleneck and label the WIP numbers, which today sit in unlabeled triangles.
- Handoff scenarios: a clear bottleneck; many steps with long names.

## Run Throughput
Unit-based performance for the run. Reference slide, already built (`src/slides/run-throughput`).
- Key question: How many units has this run made versus plan?
- Must show: product; units produced and gap to plan; ETA; crew size against target; units per hour.
- Claude idea: use one template for Run Throughput and Shift Throughput.
- Handoff scenarios: behind plan; no crew target (target 0); run just started.

## Shift Throughput
Unit-based performance for the shift.
- Key question: How many units has this shift made versus plan?
- Must show: shift name; units produced and gap to plan; crew size against target; units per hour.
- Handoff scenarios: behind plan; no crew target (target 0).

## Operations
Location operations page. Shows breakdowns with Reliability and pending data sheets with Compliance.
- Key question: What needs attention on this line right now?
- Must show: open problems; breakdowns (with Reliability); pending data sheets (with Compliance); units against plan; OEE; product and ETA; count trend.
- Open questions: what are the units value (for example -390 EA) and the time next to the sunrise icon?
- Handoff scenarios: Reliability on and off; Compliance on and off; no open problems.

## X-Bar R
X-Bar R for the selected characteristic.
- Key question: Is this characteristic in control?
- Must show: characteristic name; in or out of control; X-bar and range charts with their limits; Cp and Cpk.
- Handoff scenarios: in control; out of control.

# Other slides

## News
Recent alerts, chats and high fives.
- Key question: What happened recently that I should know?
- Must show: latest items with their time; item type (alert, chat or high five).
- Claude idea: show items one page at a time instead of a scrolling ticker.
- Handoff scenarios: many items; long item text.

## Company Update
An image or PDF from the company.
- Key question: What is the company sharing today?
- Must show: the image or PDF, as large as possible.
- Open questions: how are PDFs with several pages shown?
- Handoff scenarios: portrait image; landscape image; PDF.

## Welcome
Welcome slides for new hires.
- Key question: Who joined us this week?
- Must show: name and photo of each new hire; short introduction.
- Handoff scenarios: one new hire; many new hires; no photo.

## Company Inherited Highlight
Not in the Knowledge Base. Only captured with no data.
- Key question: to be defined.
- Must show: to be defined.
- Open questions: what does this slide show?
