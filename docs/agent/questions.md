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

## Hourly OEE, Hourly counts, Units/man hour
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
