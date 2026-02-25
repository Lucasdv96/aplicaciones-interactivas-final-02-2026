import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getTables } from '../services/tables'
import { getShifts } from '../services/shifts'
import { createReservation } from '../services/Reservations'
import type { Table, Shift } from '../types'
import styles from './ReservationFormPage.module.css'
import axios from 'axios'

interface FormData {
  customerName: string
  partySize: string
  tableId: string
  shiftId: string
}

interface FormErrors {
  customerName?: string
  partySize?: string
  tableId?: string
  shiftId?: string
}

function ReservationFormPage() {
  const navigate = useNavigate()

  const [tables, setTables] = useState<Table[]>([])
  const [shifts, setShifts] = useState<Shift[]>([])
  const [loadingData, setLoadingData] = useState(true)

  const [form, setForm] = useState<FormData>({
    customerName: '',
    partySize: '',
    tableId: '',
    shiftId: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [apiError, setApiError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    Promise.all([getTables(), getShifts()])
      .then(([t, s]) => {
        setTables(t.filter(table => table.status === 'AVAILABLE'))
        setShifts(s)
      })
      .finally(() => setLoadingData(false))
  }, [])

  const validate = (): boolean => {
    const newErrors: FormErrors = {}

    if (!form.customerName.trim())
      newErrors.customerName = 'El nombre es obligatorio.'
    if (!form.partySize || Number(form.partySize) < 1)
      newErrors.partySize = 'Ingresá un número válido de personas.'
    if (!form.tableId)
      newErrors.tableId = 'Seleccioná una mesa.'
    if (!form.shiftId)
      newErrors.shiftId = 'Seleccioná un turno.'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    setErrors(prev => ({ ...prev, [name]: undefined }))
    setApiError(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setSubmitting(true)
    try {
      await createReservation({
        customerName: form.customerName.trim(),
        partySize: Number(form.partySize),
        tableId: Number(form.tableId),
        shiftId: Number(form.shiftId),
      })
      navigate('/reservations')
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.data?.message) {
        setApiError(err.response.data.message)
      } else {
        setApiError('Ocurrió un error al crear la reserva.')
      }
    } finally {
      setSubmitting(false)
    }
  }

  if (loadingData) return <p>Cargando datos...</p>

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Nueva Reserva</h1>

      <form className={styles.form} onSubmit={handleSubmit}>
        {apiError && <p className={styles.apiError}>{apiError}</p>}

        <div className={styles.field}>
          <label className={styles.label}>Nombre del cliente</label>
          <input
            className={`${styles.input} ${errors.customerName ? styles.inputError : ''}`}
            name="customerName"
            value={form.customerName}
            onChange={handleChange}
            placeholder="Ej: Juan Pérez"
          />
          {errors.customerName && <span className={styles.errorText}>{errors.customerName}</span>}
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Cantidad de personas</label>
          <input
            className={`${styles.input} ${errors.partySize ? styles.inputError : ''}`}
            name="partySize"
            type="number"
            min={1}
            value={form.partySize}
            onChange={handleChange}
            placeholder="Ej: 3"
          />
          {errors.partySize && <span className={styles.errorText}>{errors.partySize}</span>}
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Mesa</label>
          <select
            className={`${styles.select} ${errors.tableId ? styles.inputError : ''}`}
            name="tableId"
            value={form.tableId}
            onChange={handleChange}
          >
            <option value="">Seleccioná una mesa</option>
            {tables.map(t => (
              <option key={t.id} value={t.id}>
                Mesa #{t.number} — {t.capacity} personas
              </option>
            ))}
          </select>
          {errors.tableId && <span className={styles.errorText}>{errors.tableId}</span>}
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Turno</label>
          <select
            className={`${styles.select} ${errors.shiftId ? styles.inputError : ''}`}
            name="shiftId"
            value={form.shiftId}
            onChange={handleChange}
          >
            <option value="">Seleccioná un turno</option>
            {shifts.map(s => (
              <option key={s.id} value={s.id}>
                {s.date} — {s.startTime} a {s.endTime}
              </option>
            ))}
          </select>
          {errors.shiftId && <span className={styles.errorText}>{errors.shiftId}</span>}
        </div>

        <button
          className={styles.submitButton}
          type="submit"
          disabled={submitting}
        >
          {submitting ? 'Creando...' : 'Crear reserva'}
        </button>
      </form>
    </div>
  )
}

export default ReservationFormPage