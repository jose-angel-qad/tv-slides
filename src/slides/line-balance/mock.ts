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

// A clear bottleneck: 46 waiting before Assemble (WIP limit 20), long step names.
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

// Many steps with long names (guide handoff scenario).
export const lineBalanceManySteps: LineBalanceData = {
  ...lineBalancePositive,
  steps: [
    { id: 'm1', name: 'Panel cutting', completed: 162, wipAfter: 4 },
    { id: 'm2', name: 'Edge banding and trimming', completed: 158, wipAfter: 9 },
    { id: 'm3', name: 'Drill and dowel insertion', completed: 149, wipAfter: 6 },
    { id: 'm4', name: 'Hardware fitting', completed: 143, wipAfter: 12 },
    { id: 'm5', name: 'Carcass assembly', completed: 131, wipAfter: 5 },
    { id: 'm6', name: 'Door hanging and alignment', completed: 126, wipAfter: 3 },
    { id: 'm7', name: 'Final inspection', completed: 123, wipAfter: 2 },
    { id: 'm8', name: 'Pack', completed: 121 },
  ],
}
