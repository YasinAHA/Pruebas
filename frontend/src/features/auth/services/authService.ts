import { LoginPayload } from '../types/loginPayload'
import { User } from '@shared-types/user'

export const authService = {
  login: async (payload: LoginPayload): Promise<User> => {
    // Simulación: luego reemplaza por API real
    return {
      id: '1',
      name: 'Usuario Demo',
      email: payload.email,
      role: payload.email === 'admin@taskflow.com' ? 'admin' : 'user',
    }
  },
}
