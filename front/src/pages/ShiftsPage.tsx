import { useEffect, useState } from 'react'
import { getShifts } from '../services/shifts'
import type { Shift } from '../types'
import styles from './ShiftsPage.module.css'

function formatDate(dateStr: string) {
  const [year, month, day] = dateStr.split('-')
  return `${day}/${month}/${year}`
}

function ShiftsPage() {
  const [shifts, setShifts] = useState<Shift[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    getShifts()
      .then(setShifts)
      .catch(() => setError('No se pudieron cargar los turnos.'))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <p className={styles.loading}>Cargando turnos...</p>
  if (error) return <p className={styles.error}>{error}</p>

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Turnos</h1>
      </div>

      {shifts.length === 0 ? (
        <p className={styles.empty}>No hay turnos registrados.</p>
      ) : (
        <div className={styles.grid}>
          {shifts.map(shift => (
            <div key={shift.id} className={styles.card}>
              <p className={styles.cardTitle}>{formatDate(shift.date)}</p>
              <p className={styles.cardDetail}>
                {shift.startTime} — {shift.endTime}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ShiftsPage