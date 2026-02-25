import { useEffect, useState } from 'react'
import { getTables } from '../services/tables'
import type { Table } from '../types'
import styles from './TablesPage.module.css'

const STATUS_LABEL: Record<Table['status'], string> = {
  AVAILABLE: 'Disponible',
  OCCUPIED: 'Ocupada',
  OUT_OF_SERVICE: 'Fuera de servicio',
}

const STATUS_STYLE: Record<Table['status'], string> = {
  AVAILABLE: styles.available,
  OCCUPIED: styles.occupied,
  OUT_OF_SERVICE: styles.outOfService,
}

function TablesPage() {
  const [tables, setTables] = useState<Table[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    getTables()
      .then(setTables)
      .catch(() => setError('No se pudieron cargar las mesas.'))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <p className={styles.loading}>Cargando mesas...</p>
  if (error) return <p className={styles.error}>{error}</p>

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Mesas</h1>
      </div>

      {tables.length === 0 ? (
        <p className={styles.empty}>No hay mesas registradas.</p>
      ) : (
        <div className={styles.grid}>
          {tables.map(table => (
            <div key={table.id} className={styles.card}>
              <p className={styles.cardTitle}>Mesa #{table.number}</p>
              <p>Capacidad: {table.capacity} personas</p>
              <span className={`${styles.badge} ${STATUS_STYLE[table.status]}`}>
                {STATUS_LABEL[table.status]}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default TablesPage