import api from './api'
import type { OccupancyReport } from '../types'

export const getOccupancyReport = (date: string) =>
  api.get<OccupancyReport>('/reports/occupancy', { params: { date } }).then(r => r.data)