export type ProblemType = 'Performance' | 'Quality' | 'Availability' | 'Unallocated' | 'Planned'

export interface ParetoProblem {
  id: string
  name: string
  type: ProblemType
  minutesLost: number
  unitsLost: number
  occurrences: number
}

export interface ParetoData {
  location: string
  shift: string
  unit: { singular: string; plural: string }
  /** Every problem this shift; the slide shows the top 7 by time lost. */
  problems: ParetoProblem[]
}
