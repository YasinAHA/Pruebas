import React from 'react'

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-100 to-slate-300 text-gray-800">
      <h1 className="text-4xl font-bold mb-4">🚀 TaskFlow</h1>
      <p className="text-lg mb-6">Tu tablero colaborativo moderno</p>
      <button className="px-6 py-3 bg-black text-white rounded-xl shadow hover:bg-gray-800 transition">
        Empezar
      </button>
    </div>
  )
}

export default App
