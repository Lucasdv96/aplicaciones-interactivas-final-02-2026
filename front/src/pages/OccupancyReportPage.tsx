import { useState } from 'react'
import { getOccupancyReport } from '../services/Reports'
import type { OccupancyReport } from '../types'
import styles from './OccupancyReportPage.module.css'

function todayString() {
  return new Date().toISOString().split('T')[0]
}

function OccupancyReportPage() {
  const [date, setDate] = useState(todayString())
  const [report, setReport] = useState<OccupancyReport | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSearch = async () => {
    if (!date) return
    setLoading(true)
    setError(null)
    setReport(null)
    try {
      const data = await getOccupancyReport(date)
      setReport(data)
    } catch {
      setError('No se pudo obtener el reporte.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Reporte de Ocupación</h1>

      <div className={styles.form}>
        <div className={styles.field}>
          <label className={styles.label}>Fecha</label>
          <input
            className={styles.input}
            type="date"
            value={date}
            onChange={e => {
              setDate(e.target.value)
              setReport(null)
              setError(null)
            }}
          />
        </div>
        <button
          className={styles.searchButton}
          onClick={handleSearch}
          disabled={loading || !date}
        >
          {loading ? 'Consultando...' : 'Consultar'}
        </button>
      </div>

      {loading && <p className={styles.loading}>Cargando reporte...</p>}
      {error && <p className={styles.error}>{error}</p>}

      {report && (
        <div className={styles.cards}>
          <div className={styles.card}>
            <p className={styles.cardLabel}>Total de mesas</p>
            <p className={styles.cardValue}>{report.totalTables}</p>
          </div>
          <div className={styles.card}>
            <p className={styles.cardLabel}>Mesas reservadas</p>
            <p className={styles.cardValue}>{report.reservedTables}</p>
          </div>
          <div className={styles.card}>
            <p className={styles.cardLabel}>Mesas disponibles</p>
            <p className={styles.cardValue}>{report.availableTables}</p>
          </div>
          <div className={styles.card}>
            <p className={styles.cardLabel}>Ocupación</p>
            <p className={`${styles.cardValue} ${styles.highlight}`}>
              {report.occupancyPercentage}%
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default OccupancyReportPage