import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import TablesPage from './pages/TablesPage'
import ShiftsPage from './pages/ShiftsPage'
import ReservationsPage from './pages/ReservationsPage'
import ReservationFormPage from './pages/ReservationFormPage'
import OccupancyReportPage from './pages/OccupancyReportPage'
import './App.css'

function App() {
  return (
    <>
      <Navbar />
      <main style={{ padding: '1rem' }}>
        <Routes>
          <Route path="/" element={<Navigate to="/tables" replace />} />
          <Route path="/tables" element={<TablesPage />} />
          <Route path="/shifts" element={<ShiftsPage />} />
          <Route path="/reservations" element={<ReservationsPage />} />
          <Route path="/reservations/new" element={<ReservationFormPage />} />
          <Route path="/reports" element={<OccupancyReportPage />} />
        </Routes>
      </main>
    </>
  )
}

export default App
