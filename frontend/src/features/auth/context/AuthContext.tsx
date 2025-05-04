import { createContext, useState, ReactNode } from 'react'
import { authService } from '../services/authService'
import { LoginPayload } from '../types/loginPayload'
import { User, Role } from '@shared-types/user'

interface AuthState {
  isAuthenticated: boolean
  user: User | null
}

interface AuthContextProps extends AuthState {
  login: (payload: LoginPayload) => Promise<void>
  logout: () => void
  hasRole: (roles: Role[]) => boolean
}

// ⚠️ named export (solo contexto, no componente)
export const AuthContext = createContext<AuthContextProps | undefined>(undefined)

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [auth, setAuth] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
  })

  const login = async (payload: LoginPayload) => {
    const user = await authService.login(payload)
    setAuth({ isAuthenticated: true, user })
  }

  const logout = () => {
    setAuth({ isAuthenticated: false, user: null })
  }

  const hasRole = (roles: Role[]) => {
    return auth.user ? roles.includes(auth.user.role) : false
  }

  return (
    <AuthContext.Provider value={{ ...auth, login, logout, hasRole }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider // ✅ default export para el componente (requerido por Vite + HMR)
