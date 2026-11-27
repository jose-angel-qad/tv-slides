# Redzone TV Design System: Project Context

Owner: Jose Martinez, Design System Lead, Redzone (QAD)
Last updated: Nov 20, 2026

## 1. What Redzone TV is

Redzone TV is a display app that manufacturing companies run on TVs across their plants. A tablet scans a QR code on the TV to pair it. The TV then rotates a series of slides configured in Redzone Admin. Slides show production stats, OEE, run progress, throughput, quality, company news, and welcome messages for new hires.

The TV is a passive display. There is no hover, focus, or click. The only relevant states are data states.

## 2. Project goal and scope

Bring Redzone TV into the scope of the Redzone Design System: audit the current product, redesign its components and slides, support Light and Dark modes, and support Apple TV and Windows.

1. Audit of all current slides, components, states, and inconsistencies.
2. Foundations extension for TV: type scale, sizing, spacing, grid, safe areas, status semantics, data viz palette, motion.
3. Slide templates that group current slides into a small set of reusable layouts.
4. Component redesign and documentation.
5. Validation on real TVs at real viewing distances.
6. Handoff and Storybook documentation, consistent with the Redzone Admin docs format.

Out of scope unless stated: research and usability testing (product team), brand governance, and the Redzone Admin screens where slides are configured (in scope only as a preview that reuses TV components).

## 3. Locked Design System decisions

- Foundations is the single source for every product and platform. Everything flows down, never up.
- Two token layers only: Global and Semantic. No Product layer. Platform exceptions are rare and the token name states the platform.
- Foundations defines the font family (Inter) and weights. Type scales live in each platform's component file.
- Color modes: Light and Dark, fully driven by Foundations variables.
- Density modes (Compact, Comfortable) apply to Web only. TV always resolves to Comfortable.
- Shadows and radius are redefined for Redzone. Spacing and sizing follow an 8 px base.
- Component tiers: Native, Hybrid, Custom. Each component lives in the lowest tier possible.
- Semantic tokens stay role-oriented, not component-specific.
- Naming scale: 3xs, 2xs, xs, sm, md, lg, xl, 2xl, 3xl.
- Libraries: Web (Vue), Android (Material 3), iOS (SwiftUI). Which library TV belongs to is still open (see Open questions).

Design principles: hierarchy over uniformity; predictability over surprise; functional clarity over visual expression.

## 4. TV design rules (condensed from Redzone TV Slide Design Guidelines)

Each slide must be readable in 5 seconds from across the plant floor, accessible to everyone, and part of one visual system.

**One question per slide**
- Write down the question the slide answers. The answer is the largest element on screen.
- Every key value shows its status and its gap to target (for example, 92.8% OEE, 2.8 pts above target).
- Single location: one hero plus up to three supporting facts.
- Multiple location: up to 8 rows and 4 metric columns per page. Paginate; never shrink to fit.
- Keep row order stable. Only the Leaderboard re-sorts.

**Legibility at distance**
- Cap height on the physical screen: any text at least distance (ft) / 25; key values at least distance (ft) / 10.
- Never below 24 px at the 1920 x 1080 canvas.
- Provisional reference (55 in screen at 20 ft): text 44 px or more, key values 112 px or more.
- Inter with tabular figures, Regular weight or heavier, three text sizes per slide at most.
- If content does not fit at minimum size, remove content.

**Layout**
- Canvas 1920 x 1080. Safe area: 96 px sides, 64 px top and bottom. Only backgrounds go outside it.
- Same anatomy on every slide: header (title, context, freshness), hero (the answer), support (removed first when space runs out).
- 12 columns with 32 px gutters inside the safe area.
- No navigation arrows, settings icon, app version, or full-width brand bar on the TV.

**Color, status, and contrast**
- Color is never the only signal. Positive: circle. Warning: triangle. Negative: octagon. Neutral: dash. Add a label when it fits.
- Status is not trend. Up and down arrows are never colored as status.
- Brand color never appears on data. Negative status has its own token, separate from brand red.
- Contrast: 4.5:1 for all text, 7:1 for key values, 3:1 for bars, lines, and icons. No white text on saturated status fills.
- No pure black or pure white surfaces. Design every slide in Light and Dark. Check in grayscale and with color blindness simulation.

**Charts**
- Show a number first. Use a chart only when its shape answers the question faster.
- Label the target line with its value and keep value labels off it.
- Mark the current hour as in progress so a partial bar does not read as a failure.
- Label data directly, few ticks with large labels, bars start at zero.
- One neutral data color plus status colors. No pies, donuts, or gauges.

**Data states**
- Every slide is designed in: live, stale, disconnected, loading, shift not started, empty, and error.
- Freshness is always visible in the header. Stale data is dimmed and shows its last update time.
- Zero and empty are different. Explain empty states in a plain sentence (for example, 2nd shift starts at 6:00 AM).
- Never show raw system messages or a blank screen.

**Motion and burn-in**
- Crossfade between slides. Animate only the hero value when it changes. Nothing flashes or loops.
- Respect reduced motion. Prefer paged news over a scrolling ticker.
- Screens run 24/7: no large static, saturated, or high-contrast elements, and no borders around zones.

**Content**
- Locale-aware number, date, and time formats. Whole numbers for counts, one decimal for percentages and rates.
- Units always visible and consistent.
- Room for 40% text expansion (13 languages). Wrap to two lines before cutting anything; never truncate line or product names.
- Sentence case for UI labels, no unexplained abbreviations. Product and line names render as entered.
- Gamification stays (Victory Points, stars, Run Speed car), with one meaning per symbol. Zero points is neutral, not red.

## 5. Known audit findings

- Two visual generations coexist: sidebar slides and Plant KPI Overview slides.
- The sidebar takes about 20% of the width on a non-interactive device.
- Red is used for both brand and negative status.
- Status relies heavily on red and green alone.
- Secondary text (axis labels, subtitles, targets) is too small for distance viewing.
- Admin-level density on TV (for example, Scoreboard has nine columns).
- Large saturated status fills with white text (Throughput, Discrete slides) fail contrast and raise burn-in risk.
- Current Apple TV build still shows the slide set name, navigation arrows, settings icon, app version, and a full-width brand bar.

## 6. Slide definitions

Each entry lists the slide's purpose (from the Redzone Knowledge Base), the question it should answer (proposed, to validate with product), what it shows today, and the proposed template. "Location" is a production line or area; "Run" is the production of one product; "Shift" is a work period.

Proposed templates (draft):
- **T1 Location table**: one row per location, up to 8 rows and 4 metric columns, paginated.
- **T2 Location tiles**: one tile per location in a grid, one key number per tile.
- **T3 Hero + support**: single location, one hero value and up to three supporting facts.
- **T4 Hourly chart**: single location, one metric over the shift's hours with a target line.
- **T5 Asset progress**: single location, one item per asset or station.
- **T6 Message**: news, images, and people.

### 6.1 Multiple location slides

**Scoreboard** (T1)
- Purpose: overview of shift stats across locations.
- Question: which lines are winning this shift?
- Shows today: location with shift OEE and status star or arrow; start (mins); ramp up (mins); power hour (OEE); counts sparkline; huddles (count); SKUs (count); average changeover (mins); Victory Points.
- Notes: nine columns today. Must be cut to four metric columns or split.

**Leaderboard** (T1)
- Purpose: accumulated Victory Points for the current shift.
- Question: who is leading in Victory Points this shift?
- Shows today: location with shift OEE; hourly bars with stars per hour; points bar; current leader highlight; legend (4, 2, 1, 0 points).
- Notes: the only slide allowed to re-sort rows. Zero points must be neutral, not red.

**Shift Dashboard** (T1)
- Purpose: shift OEE, downtime, status, and hourly OEE.
- Question: how is each line's shift OEE, and is it running now?
- Shows today: location and shift; shift OEE with status; running or stopped status; downtime (mins); last 12 hours of hourly OEE bars with stars.

**Run Dashboard** (T1)
- Purpose: run OEE, progress, and quality overview.
- Question: how far along is each line's current run, and is it healthy?
- Shows today: location with run OEE and status; product image; SKU and product name; run progress (x of y units); quality as a pie.
- Notes: replace the quality pie (no pies allowed).

**Up/Down Stream** (T1)
- Purpose: progress of locations feeding process areas.
- Question: are upstream lines on schedule to feed the next process?
- Shows today: location; product image; run progress (x of y units); running or stopped status; schedule variance (+/- mins) and ETA.

**Throughput Dashboard** (T2)
- Purpose: unit-based performance across locations.
- Question: is each line producing enough units versus plan?
- Shows today: per location tile: crew (actual / target); hourly units bars with stars; units produced; delta versus plan (for example, +254 cases); full saturated status fill.
- Notes: remove saturated fills; status moves to icon and label.

### 6.2 Single location slides

**Pareto** (T3 variant, ranked list)
- Purpose: location problem Pareto.
- Question: what is costing this line the most time right now?
- Shows today: top 7 location problems as ranked bars by category (performance, quality, availability, unallocated, planned); occurrence count; total lost time and lost units per problem.

**Counts** (T4 variant, trend)
- Purpose: location count trend.
- Question: is the line producing steadily right now?
- Shows today: area chart of count rate over time (about the last 2.5 hours).

**Hourly OEE** (T4)
- Purpose: location hourly OEE.
- Question: how did OEE perform each hour this shift?
- Shows today: hourly OEE bars with values and stars; target lines; future hours empty.

**Hourly Counts** (T4)
- Purpose: location hourly counts.
- Question: did we hit the count target each hour?
- Shows today: hourly count bars with values; target line.

**Units/Man Hour** (T4)
- Purpose: location units per man hour.
- Question: is labor productivity on target each hour?
- Shows today: hourly units/man hour bars with values; target line.

**Run Speed** (T3, with gamification)
- Purpose: speed slide for the selected location.
- Question: is the run ahead of or behind pace?
- Shows today: SKU and product; start time; run average rate; unplanned downtime; planned rate; on-schedule rate; race car metaphor (units ahead or behind); ETA; progress (x of y units); current speed versus pace.
- Notes: the car stays, but the numbers lead.

**Cycles** (T5)
- Purpose: cycle progress by asset.
- Question: where is each asset in its cycle?
- Shows today: product and run progress (x of y); active cycle average; total cycle average; per asset rings (for example, Kettle 3 to 6) with active and total cycle progress and time; overrun state.
- Notes: rings are gauges. Replace with linear progress.

**Run (Fast Cycles)** (T5)
- Purpose: run overview for a Fast Cycles location.
- Question: is this run's cycle time on target?
- Shows today: product; cycles completed (x of y) with progress bar; average cycle time; average versus target; per asset current cycle timer bars.

**Shift (Fast Cycles)** (T5)
- Purpose: shift overview for a Fast Cycles location.
- Question: is this shift's cycle performance on target?
- Shows today: shift units with start time; yield and problem count; OEE; average cycle time; average versus target; per asset timer bars with product and over-target status.

**Discrete Location** (T3)
- Purpose: overview of a Step (Discrete) location.
- Question: how many units has this cell finished, and is it on pace?
- Shows today: units finished (hero, saturated fill); current OEE with delta; cycle time; units per hour; quality %; reworked count; quality pie; hourly counts bars.

**Discrete Station** (T3)
- Purpose: a single Step (Discrete) station.
- Question: is this station keeping up with its step time?
- Shows today: steps completed (hero); average step time versus target; quality yield; reworked count; status timer (for example, idle 02:50); quality indicator; top problems with lost time; shift steps completed per hour.
- Notes: too many facts for T3. Must be reduced to one hero and three supports.

**Line Balance** (T4 variant, categorical)
- Purpose: steps completed count and WIP count.
- Question: where is work piling up on this line?
- Shows today: bars of steps completed per step (for example, Cutting, Rework, Gluing, Shrink Wrapping); WIP count between steps; black chart background; rotated labels.

**Run Throughput** (T3) — redesign in progress
- Purpose: unit-based performance for the run.
- Question: is the current run on pace with the plan?
- Shows today: current run (SKU and product); crew size versus target; ETA and time remaining; units produced (hero); delta versus plan; units per hour bars.
- Redesign (Option B): hero = units produced with "x ahead of plan" status pill; supports = time to finish (with end time) and crew size (with target status); hourly chart with labeled target line behind bars, in-progress current hour, octagon on below-target bars.
- Open: target per hour value; whether units produced is per run while the chart covers the shift.

**Shift Throughput** (T3)
- Purpose: unit-based performance for the shift.
- Question: is this shift producing enough units?
- Shows today: current shift; crew size versus target; units produced; delta versus plan; units per hour bars with stars.
- Notes: same anatomy as Run Throughput.

**Operations** (T3)
- Purpose: location operations page. Shows Breakdowns if Reliability is enabled and pending data sheets if Compliance is enabled.
- Question: what needs attention on this line right now?
- Shows today: units delta versus plan; run start time and OEE; product and ETA; count trend chart; entry points for Problems, Data Sheets, Maintenance.
- Notes: the Problems, Data Sheets, and Maintenance tiles look like buttons on a non-interactive device.

**X-Bar R** (T4 variant, SPC)
- Purpose: X-Bar R chart for the selected characteristic.
- Question: is this quality characteristic in control?
- Shows today: characteristic name and control status; X-bar chart and range chart over time; USL, UCL, target, center, LCL, LSL; mean, sigma, Cp, Cpk.
- Notes: the most data-dense slide. Status (in control or not) should be the hero.

### 6.3 Other slides

**News** (T6)
- Purpose: recent news such as alerts, chats, and high fives.
- Question: what happened recently that I should know?
- Shows today: list of items with timestamp, type icon, and text; scrolling ticker at the bottom.
- Notes: prefer paged news over the ticker.

**Company Update** (T6)
- Purpose: show an attached image or PDF.
- Question: what does the company want everyone to see?
- Shows today: a full image or PDF page.
- Notes: define safe area and letterboxing for any aspect ratio.

**Welcome** (T6)
- Purpose: welcome slides for new hires.
- Question: who joined us this week?
- Shows today: heading; new hire avatars; selected person with name and quote.

### 6.4 Not documented, in scope

- **Pairing**: QR code and instructions to pair the TV with a tablet.
- **States**: loading, stale, disconnected, shift not started, empty, and error, for every slide.

## 7. Working color proposal (Option B, draft)

| Role | Dark | Light |
| --- | --- | --- |
| Background | #0C0F14 | #E9EDF2 |
| Surface | #161A21 | #F9FAFB |
| Surface raised | #252B36 | #E4E8EE |
| Text primary | #EEF1F5 | #12161C |
| Text secondary | #9AA3AF | #545E6B |
| Data neutral | #7C93B5 | #7189AD |
| Positive | #4ADE9A | #0B6E3D |
| Negative fill | #FF7466 | #E36A5C |
| Negative text | #FF8A7E | #B42318 |
| Warning | #F5BE4F | #8F5300 |

Status needs paired roles (fill and text) because one color cannot reach 3:1 as a bar and 4.5:1 for text on or beside it in both modes. These values are placeholders until mapped to Foundations variables.

## 8. Open questions

- How Redzone TV runs on Windows (native app, Electron, or browser in kiosk mode). This decides which library TV belongs to.
- Typical screen sizes, resolutions, viewing distances, and lighting in plants.
- Who owns Redzone TV on the product and engineering side.
- Refresh interval that defines stale data, and slide dwell time.
- Whether data visualization foundations move ahead of Phase 5.

## 9. How to work on this project

- Stack: Figma (variables), Storybook 10 with MDX, Vue, Cursor on macOS, GitHub, Vercel.
- Build every slide at a fixed 1920 x 1080 canvas, in Light and Dark, with all data states as Storybook stories.
- After each change, render the slide in the browser at 1920 x 1080, take a screenshot, critique it against Section 4, and iterate before moving on.
- Use Foundations variables only. Never hardcode colors in components.
- Give rationale before implementation and work step by step. Keep it simple.
- All copy and documentation in American English, professional and concise. Never use em dashes.

Reference systems: Apple tvOS HIG, Google TV / Android TV guidelines, Microsoft Designing for Xbox and TV, Atlassian, Material 3, Fluent 2, Polaris, WCAG 2.1.

## 10. Editable color tokens (dev tool)

The Option B colors are the starting point, and they must stay editable while we design. Build a color control that changes them live.

### 10.1 Token source

Create `tokens/tv-colors.json` with these values. Names are semantic and role-oriented, following the Design System convention. Each token becomes a CSS variable: `color.surface.default` becomes `--rz-color-surface-default`.

```json
{
  "dark": {
    "color.background.default": "#0C0F14",
    "color.surface.default": "#161A21",
    "color.surface.raised": "#252B36",
    "color.text.primary": "#EEF1F5",
    "color.text.secondary": "#9AA3AF",
    "color.text.on-data": "#0C0F14",
    "color.data.neutral": "#7C93B5",
    "color.data.axis": "#2C333E",
    "color.status.positive": "#4ADE9A",
    "color.status.warning": "#F5BE4F",
    "color.status.negative-fill": "#FF7466",
    "color.status.negative-text": "#FF8A7E"
  },
  "light": {
    "color.background.default": "#E9EDF2",
    "color.surface.default": "#F9FAFB",
    "color.surface.raised": "#E4E8EE",
    "color.text.primary": "#12161C",
    "color.text.secondary": "#545E6B",
    "color.text.on-data": "#12161C",
    "color.data.neutral": "#7189AD",
    "color.data.axis": "#C8CFD8",
    "color.status.positive": "#0B6E3D",
    "color.status.warning": "#8F5300",
    "color.status.negative-fill": "#E36A5C",
    "color.status.negative-text": "#B42318"
  }
}
```

Rules:
- Components read only CSS variables. No hex values anywhere in components.
- Soft status backgrounds (pills) are derived, not tokens: `color-mix(in srgb, var(--rz-color-status-positive) 14%, transparent)`.
- The target line uses `--rz-color-text-secondary`.
- Light or Dark is a Storybook toolbar global that sets `data-theme` on the slide root.

### 10.2 Color control requirements

- Dev only. It lives in Storybook and must never ship in the Apple TV or Windows build.
- Use Tweakpane in a global Storybook decorator. Show or hide it with a Storybook toolbar toggle ("Color editor").
- One folder per role group (Background and surface, Text, Data, Status). Each token gets a color picker and a hex field.
- Edits apply live to every slide through the CSS variables. The panel edits the mode currently selected in the toolbar.
- Show a live contrast readout with pass or fail next to each pair below.
- Buttons: Reset to defaults, Copy JSON (same shape as `tv-colors.json`), and Import JSON.
- Persist edits in localStorage so they survive reloads. Reset clears them.

### 10.3 Contrast pairs to monitor

| Foreground | Background | Minimum |
| --- | --- | --- |
| text.primary | surface.default | 7:1 (key values) |
| text.primary | background.default | 7:1 |
| text.secondary | surface.default | 4.5:1 |
| text.secondary | background.default | 4.5:1 |
| text.on-data | data.neutral | 4.5:1 |
| text.on-data | status.negative-fill | 4.5:1 |
| status.positive | surface.default | 4.5:1 |
| status.warning | surface.default | 4.5:1 |
| status.negative-text | surface.default | 4.5:1 |
| data.neutral | surface.default | 3:1 (bars) |
| status.negative-fill | surface.default | 3:1 (bars) |

Use the WCAG 2.1 relative luminance formula.
