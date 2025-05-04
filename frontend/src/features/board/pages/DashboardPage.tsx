import { useBoards } from '../hooks/useBoards'
import CreateBoardForm from '../components/CreateBoardForm'
import { Link } from 'react-router-dom'
import { PATHS } from '@routes/paths'

const DashboardPage = () => {
  const { boards, loading, addBoard } = useBoards()

  if (loading) return <p>Cargando tableros...</p>

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Tus tableros</h1>

      <CreateBoardForm onCreate={addBoard} />

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-6">
        {boards.map((board) => (
          <Link
            to={PATHS.board(board.id)}
            key={board.id}
            className="block bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition"
          >
            <h2 className="text-lg font-semibold">{board.name}</h2>
            <p className="text-sm text-gray-500">{board.columns.length} columnas</p>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default DashboardPage
