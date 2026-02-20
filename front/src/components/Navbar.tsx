import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav style={{ display: 'flex', gap: '1rem', padding: '1rem', background: '#333', color: '#fff' }}>
      <Link to="/tables" style={{ color: '#fff', textDecoration: 'none' }}>Mesas</Link>
      <Link to="/shifts" style={{ color: '#fff', textDecoration: 'none' }}>Turnos</Link>
      <Link to="/reservations" style={{ color: '#fff', textDecoration: 'none' }}>Reservas</Link>
      <Link to="/reservations/new" style={{ color: '#fff', textDecoration: 'none' }}>Nueva Reserva</Link>
      <Link to="/reports" style={{ color: '#fff', textDecoration: 'none' }}>Reporte</Link>
    </nav>
  )
}

export default Navbar
