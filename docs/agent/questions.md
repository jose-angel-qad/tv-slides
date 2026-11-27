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
