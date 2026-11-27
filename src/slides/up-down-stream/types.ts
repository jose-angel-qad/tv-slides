export interface StreamLocation {
  id: string
  location: string
  product: string
  unit: { singular: string; plural: string }
  completed: number
  planned: number
  running: boolean
  /** Minutes ahead (+) or behind (-) schedule. */
  scheduleMinutes: number
  endsAt?: Date
}

export interface UpDownStreamData {
  /** The process area these locations feed. */
  location: string
  /** Rows in process flow order, upstream first. */
  locations: StreamLocation[]
}
