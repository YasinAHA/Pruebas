import { Outlet, Link, useNavigate } from 'react-router-dom'
import { useAuth } from '@features/auth/hooks/useAuth'
import { PATHS } from '@routes/paths'

const MainLayout = () => {
  const { isAuthenticated, user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate(PATHS.home, { replace: true }) // redirección SPA friendly
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-gray-800">
      <header className="backdrop-blur-md bg-white/70 border-b border-slate-200 shadow-sm p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to={PATHS.home} className="text-xl font-semibold tracking-tight">
            TaskFlow
          </Link>

          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-700">{user?.name}</span>
              <button
                onClick={handleLogout}
                className="text-sm px-3 py-1 rounded bg-black text-white hover:bg-gray-800 transition"
              >
                Cerrar sesión
              </button>
            </div>
          ) : (
            <Link
              to={PATHS.login}
              className="text-sm px-3 py-1 rounded border border-slate-400 hover:bg-slate-100 transition"
            >
              Iniciar sesión
            </Link>
          )}
        </div>
      </header>

      <main className="flex-1 p-4">
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default MainLayout
