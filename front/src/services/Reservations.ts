import api from './api'
import type { Reservation } from '../types'

export interface CreateReservationDto {
  customerName: string
  partySize: number
  tableId: number
  shiftId: number
}

export const getReservations = () =>
  api.get<Reservation[]>('/reservations').then(r => r.data)

export const getReservation = (id: number) =>
  api.get<Reservation>(`/reservations/${id}`).then(r => r.data)

export const createReservation = (data: CreateReservationDto) =>
  api.post<Reservation>('/reservations', data).then(r => r.data)

export const cancelReservation = (id: number) =>
  api.patch<Reservation>(`/reservations/${id}/cancel`).then(r => r.data)