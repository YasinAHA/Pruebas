import { Task } from '@features/task/types'
import { X, Trash2 } from 'lucide-react'

interface Props {
    task: Task
    onClose: () => void
    onDelete: (id: string) => void     /* ← nueva prop */
}

const TaskModal = ({ task, onClose, onDelete }: Props) => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md relative">
            {/* cerrar */}
            <button
                onClick={onClose}
                className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
                aria-label="Cerrar modal"
            >
                <X />
            </button>

            <h2 className="text-xl font-semibold mb-4">{task.title}</h2>
            <p className="text-sm text-gray-600 whitespace-pre-line mb-6">
                {task.description || 'Sin descripción.'}
            </p>

            {/* botón Trello‑like */}
            <button
                type="button"
                onClick={() => {
                    onDelete(task.id)
                    onClose()
                }}
                className="flex items-center gap-2 px-4 py-2 text-sm bg-red-600 hover:bg-red-700 text-white rounded w-full justify-center"
            >
                <Trash2 size={16} />
                Eliminar tarjeta
            </button>
        </div>
    </div>
)

export default TaskModal
