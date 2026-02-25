import api from './api'
import type { Shift } from  '../types'

export const getShifts = () =>
  api.get<Shift[]>('/shifts').then(r => r.data)

export const getShift = (id: number) =>
  api.get<Shift>(`/shifts/${id}`).then(r => r.data)

export const createShift = (data: Omit<Shift, 'id'>) =>
  api.post<Shift>('/shifts', data).then(r => r.data)

export const updateShift = (id: number, data: Partial<Omit<Shift, 'id'>>) =>
  api.patch<Shift>(`/shifts/${id}`, data).then(r => r.data)

export const deleteShift = (id: number) =>
  api.delete(`/shifts/${id}`)