import type { LineBalanceData } from './types'

export const lineBalancePositive: LineBalanceData = {
  location: 'Cabinet Assembly',
  shift: 'Shift 2',
  unit: { singular: 'unit', plural: 'units' },
  wipLimit: 20,
  steps: [
    { id: 's1', name: 'Cut', completed: 142, wipAfter: 6 },
    { id: 's2', name: 'Edge band', completed: 136, wipAfter: 4 },
    { id: 's3', name: 'Drill', completed: 132, wipAfter: 7 },
    { id: 's4', name: 'Assemble', completed: 125, wipAfter: 5 },
    { id: 's5', name: 'Inspect', completed: 120, wipAfter: 3 },
    { id: 's6', name: 'Pack', completed: 117 },
  ],
}

export const lineBalanceNegative: LineBalanceData = {
  ...lineBalancePositive,
  location: 'Cabinet Assembly Building 2 North',
  steps: [
    { id: 's1', name: 'Cut', completed: 148, wipAfter: 5 },
    { id: 's2', name: 'Edge band', completed: 143, wipAfter: 8 },
    { id: 's3', name: 'Drill and dowel insertion', completed: 135, wipAfter: 46 },
    { id: 's4', name: 'Assemble', completed: 89, wipAfter: 6 },
    { id: 's5', name: 'Final inspection and touch-up', completed: 83, wipAfter: 4 },
    { id: 's6', name: 'Pack', completed: 79 },
  ],
}
