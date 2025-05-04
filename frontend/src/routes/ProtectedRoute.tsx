import { Navigate, Outlet } from 'react-router-dom'

// Simulación de contexto auth (esto se reemplazará con lógica real)
const useAuth = () => {
  return {
    isAuthenticated: true,
    role: 'user', // o 'admin'
  }
}

type Props = {
  allowedRoles?: string[]
}

const ProtectedRoute: React.FC<Props> = ({ allowedRoles }) => {
  const { isAuthenticated, role } = useAuth()

  if (!isAuthenticated) return <Navigate to="/login" replace />

  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}

export default ProtectedRoute
