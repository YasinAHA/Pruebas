export interface User {
  id: string
  name: string
  email: string
  role: 'user' | 'admin'
}

export type Role = 'user' | 'admin'
