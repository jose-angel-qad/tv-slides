import type { ParetoData } from './types'

export const paretoPositive: ParetoData = {
  location: 'Line 1',
  shift: 'Shift 2',
  unit: { singular: 'case', plural: 'cases' },
  problems: [
    { id: 'p1', name: 'Changeover', type: 'Planned', minutesLost: 22, unitsLost: 160, occurrences: 1 },
    { id: 'p2', name: 'Label printer out of ribbon', type: 'Availability', minutesLost: 9, unitsLost: 66, occurrences: 2 },
    { id: 'p3', name: 'Slow running', type: 'Performance', minutesLost: 6, unitsLost: 44, occurrences: 3 },
    { id: 'p4', name: 'Underweight packs', type: 'Quality', minutesLost: 4, unitsLost: 30, occurrences: 5 },
  ],
}

// Eight problems (seven shown, "1 more not shown"), a long name.
export const paretoNegative: ParetoData = {
  ...paretoPositive,
  location: 'Packaging Line 3 West Mezzanine',
  problems: [
    { id: 'n1', name: 'Filler jam at the capper infeed star wheel, operator side', type: 'Availability', minutesLost: 74, unitsLost: 545, occurrences: 6 },
    { id: 'n2', name: 'Changeover', type: 'Planned', minutesLost: 48, unitsLost: 352, occurrences: 2 },
    { id: 'n3', name: 'Slow running', type: 'Performance', minutesLost: 31, unitsLost: 228, occurrences: 9 },
    { id: 'n4', name: 'Seal integrity reject', type: 'Quality', minutesLost: 19, unitsLost: 140, occurrences: 14 },
    { id: 'n5', name: 'No reason entered', type: 'Unallocated', minutesLost: 14, unitsLost: 103, occurrences: 4 },
    { id: 'n6', name: 'Waiting for materials', type: 'Availability', minutesLost: 11, unitsLost: 81, occurrences: 1 },
    { id: 'n7', name: 'Case erector misfeed', type: 'Availability', minutesLost: 7, unitsLost: 51, occurrences: 3 },
    { id: 'n8', name: 'Sanitation break', type: 'Planned', minutesLost: 5, unitsLost: 37, occurrences: 1 },
  ],
}

// Only one problem this shift (guide handoff scenario).
export const paretoOneProblem: ParetoData = {
  ...paretoPositive,
  problems: [{ id: 'o1', name: 'Label printer out of ribbon', type: 'Availability', minutesLost: 9, unitsLost: 66, occurrences: 2 }],
}
