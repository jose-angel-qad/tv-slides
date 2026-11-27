import type { DiscreteStationData } from './types'

const at = (h: number) => new Date(2026, 10, 18, h)
const hourly = (values: number[]) => values.map((value, i) => ({ hour: at(14 + i), value }))

export const discreteStationPositive: DiscreteStationData = {
  location: 'Final Assembly',
  station: 'Station 4, torque and fastening',
  state: 'working',
  timerSeconds: 134,
  stepTargetSeconds: 240,
  stepsCompleted: 92,
  averageStepSeconds: 228,
  quality: 98.9,
  problems: [
    { id: 'a', name: 'Waiting for parts', minutes: 9 },
    { id: 'b', name: 'Torque tool recalibration', minutes: 6 },
    { id: 'c', name: 'Missing work instruction', minutes: 2 },
  ],
  hourly: hourly([15, 16, 15, 14, 16, 15, 5]),
  targetPerHour: 15,
  currentHourIndex: 6,
}

export const discreteStationNegative: DiscreteStationData = {
  ...discreteStationPositive,
  location: 'Final Assembly Cell 4 Electrical Harness',
  station: 'Station 7, wire harness routing and connector seating',
  state: 'over',
  timerSeconds: 72,
  stepsCompleted: 61,
  averageStepSeconds: 297,
  quality: 94.2,
  problems: [
    { id: 'a', name: 'Connector does not seat on the first try', minutes: 26 },
    { id: 'b', name: 'Waiting for parts', minutes: 18 },
    { id: 'c', name: 'Rework from station 6', minutes: 11 },
  ],
  hourly: hourly([13, 10, 12, 8, 11, 9, 2]),
}

export const discreteStationIdle: DiscreteStationData = { ...discreteStationPositive, state: 'idle', timerSeconds: 392 }
