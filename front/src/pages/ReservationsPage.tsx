import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getReservations, cancelReservation } from '../services/Reservations'
import type { Reservation } from '../types'
import styles from './ReservationsPage.module.css'

function formatDate(dateStr: string) {
  const [year, month, day] = dateStr.split('-')
  return `${day}/${month}/${year}`
}

function ReservationsPage() {
  const [reservations, setReservations] = useState<Reservation[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [cancelling, setCancelling] = useState<number | null>(null)

  useEffect(() => {
    getReservations()
      .then(data => setReservations(data.filter(r => r.status && r.shift)))
      .catch(() => setError('No se pudieron cargar las reservas.'))
      .finally(() => setLoading(false))
  }, [])

  const handleCancel = async (id: number) => {
    if (!confirm('¿Cancelar esta reserva?')) return
    setCancelling(id)
    try {
      const updated = await cancelReservation(id)
      setReservations(prev =>
        prev.map(r => (r.id === id ? updated : r))
      )
    } catch {
      alert('No se pudo cancelar la reserva.')
    } finally {
      setCancelling(null)
    }
  }

  if (loading) return <p className={styles.loading}>Cargando reservas...</p>
  if (error) return <p className={styles.error}>{error}</p>

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Reservas</h1>
        <Link to="/reservations/new" className={styles.newButton}>
          + Nueva reserva
        </Link>
      </div>

      {reservations.length === 0 ? (
        <p className={styles.empty}>No hay reservas registradas.</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Cliente</th>
              <th>Mesa</th>
              <th>Personas</th>
              <th>Fecha</th>
              <th>Turno</th>
              <th>Estado</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {reservations.map(r => (
              <tr key={r.id}>
                <td>{r.customerName}</td>
                <td>Mesa #{r.table.number}</td>
                <td>{r.partySize}</td>
                <td>{formatDate(r.shift.date)}</td>
                <td>{r.shift.startTime} — {r.shift.endTime}</td>
                <td>
                  <span className={`${styles.badge} ${r.status === 'CONFIRMED' ? styles.confirmed : styles.cancelled}`}>
                    {r.status === 'CONFIRMED' ? 'Confirmada' : 'Cancelada'}
                  </span>
                </td>
                <td>
                  {r.status === 'CONFIRMED' && (
                    <button
                      className={styles.cancelButton}
                      onClick={() => handleCancel(r.id)}
                      disabled={cancelling === r.id}
                    >
                      {cancelling === r.id ? 'Cancelando...' : 'Cancelar'}
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default ReservationsPage