import api from './api'
import type { Table } from  '../types'

export const getTables = () =>
  api.get<Table[]>('/tables').then(r => r.data)

export const getTable = (id: number) =>
  api.get<Table>(`/tables/${id}`).then(r => r.data)

export const createTable = (data: Omit<Table, 'id'>) =>
  api.post<Table>('/tables', data).then(r => r.data)

export const updateTable = (id: number, data: Partial<Omit<Table, 'id'>>) =>
  api.patch<Table>(`/tables/${id}`, data).then(r => r.data)