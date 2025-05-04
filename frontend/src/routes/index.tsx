import { createBrowserRouter } from 'react-router-dom'
import { PATHS } from './paths'

// Layouts
import MainLayout from '@layouts/MainLayout'

// Páginas públicas y generales
import Home from '@pages/Home'
import NotFound from '@pages/NotFound'

// Autenticación (usamos el index de features/auth)
import { LoginPage } from '@features/auth'

// Rutas protegidas
import ProtectedRoute from './ProtectedRoute'
import { DashboardPage } from '@features/board'
import BoardPage from '@features/board/pages/BoardPage'


export const router = createBrowserRouter([
  {
    path: PATHS.home,
    element: <MainLayout />,
    children: [
      // 🏠 Página principal pública
      { index: true, element: <Home /> },

      // 🔐 Página de login (pública)
      {
        path: PATHS.login,
        element: <LoginPage />,
      },

      // 🔒 Zona protegida (sólo user o admin)
      {
        element: <ProtectedRoute allowedRoles={['user', 'admin']} />,
        children: [
          { path: PATHS.dashboard, element: <DashboardPage /> },
          {
            path: PATHS.board(), // => "/boards/:id"
            element: <BoardPage />,
          },
        ],
      },

      // 🚫 Página 404
      { path: '*', element: <NotFound /> },
    ],
  },
])
