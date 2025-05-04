import { useDroppable } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { Task } from '@features/task/types'
import SortableTaskCard from '@features/task/components/SortableTaskCard'
import CreateTaskForm from '@features/task/components/CreateTaskForm'
import { X } from 'lucide-react'

interface Props {
    columnId: string
    title: string
    tasks: Task[]
    onCreateTask: (columnId: string, title: string) => void
    onTaskClick: (task: Task) => void
    onDeleteColumn: (columnId: string) => void
}

const Column = ({ columnId, title, tasks, onCreateTask, onDeleteColumn, onTaskClick }: Props) => {
    const { setNodeRef } = useDroppable({ id: columnId })

    return (
        <div ref={setNodeRef} className="min-w-[250px] bg-white rounded-xl shadow p-4 relative">
            <button
                onClick={() => onDeleteColumn(columnId)}
                className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
                aria-label="Eliminar columna"
            >
                <X size={16} />
            </button>

            <h3 className="font-semibold text-lg mb-2">{title}</h3>

            <SortableContext items={tasks.map((t) => t.id)} strategy={verticalListSortingStrategy}>
                <div className="space-y-2">
                    {tasks.map((task) => (
                        <SortableTaskCard
                            key={task.id}
                            taskId={task.id}
                            title={task.title}
                            description={task.description}
                            onClick={() => onTaskClick(task)}
                        />
                    ))}
                </div>
            </SortableContext>

            <CreateTaskForm onCreate={(title) => onCreateTask(columnId, title)} />
        </div>
    )
}

export default Column
