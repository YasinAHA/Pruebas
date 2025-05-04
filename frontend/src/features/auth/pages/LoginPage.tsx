import { FormEvent, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { PATHS } from '@routes/paths'
import { useAuth } from '@features/auth/hooks/useAuth'

const LoginPage = () => {
  const { login } = useAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    login(email, password)
    navigate(PATHS.dashboard) // puedes cambiar por otra ruta si lo prefieres
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-300 p-4">
      <div className="w-full max-w-md bg-white/60 backdrop-blur-xl shadow-xl rounded-2xl p-8 border border-slate-200">
        <h1 className="text-3xl font-bold mb-6 text-center">Iniciar sesión</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-slate-500"
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-slate-500"
          />
          <button
            type="submit"
            className="mt-2 bg-black text-white py-3 rounded-md hover:bg-gray-800 transition"
          >
            Entrar
          </button>
        </form>

        <p className="text-sm text-center text-gray-600 mt-4">
          ¿No tienes cuenta?{' '}
          <Link to={PATHS.register} className="text-slate-700 font-medium underline">
            Regístrate
          </Link>
        </p>
      </div>
    </div>
  )
}

export default LoginPage
