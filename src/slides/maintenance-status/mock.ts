import type { MaintenanceStatusData } from './types'

const limits = { pm: 5, wo: 10, cl: 50, od: 1 }

export const maintenanceStatusPositive: MaintenanceStatusData = {
  location: 'Packaging area',
  limits,
  locations: [
    { id: 'l1', location: 'Line 1', product: '466DHR GOLD PACKS 11 OZ 12 CS', pm: 1, wo: 3, cl: 12, od: 0 },
    { id: 'l2', location: 'Line 2', product: '212KLM CLASSIC PRETZEL TWISTS 16 OZ', pm: 0, wo: 2, cl: 8, od: 0 },
    { id: 'l3', location: 'Line 3', product: '530PQR TRAIL MIX VARIETY 24 CT', pm: 2, wo: 4, cl: 15, od: 0 },
    { id: 'l4', location: 'Bottling Line 4', product: '118SPW SPARKLING WATER LIME 12 OZ 24 PK', pm: 0, wo: 1, cl: 6, od: 0 },
  ],
}

export const maintenanceStatusNegative: MaintenanceStatusData = {
  location: 'Packaging area',
  limits,
  locations: [
    { id: 'l1', location: 'Line 1', product: '466DHR GOLD PACKS 11 OZ 12 CS', pm: 1, wo: 3, cl: 12, od: 0 },
    { id: 'l2', location: 'Line 2', issue: { name: 'Case sealer motor overload', minutes: 46 }, pm: 6, wo: 14, cl: 517, od: 3 },
    { id: 'l3', location: 'Packaging Line 3 West Mezzanine', product: '7781BX ORGANIC VANILLA ALMOND BEVERAGE 32 OZ', pm: 2, wo: 11, cl: 64, od: 1 },
    { id: 'l4', location: 'Bottling Line 4', issue: { name: 'Waiting for maintenance', minutes: 12 }, pm: 0, wo: 1, cl: 6, od: 0 },
  ],
}
