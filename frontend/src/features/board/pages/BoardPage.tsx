import { useParams } from 'react-router-dom'
import {
    DndContext,
    DragOverlay,
    MouseSensor,
    TouchSensor,
    useSensor,
    useSensors,
    type DragStartEvent,
    type DragEndEvent,
} from '@dnd-kit/core'
import Column from '@features/list/components/Column'
import CreateColumnForm from '@features/list/components/CreateColumnForm'
import TaskModal from '@features/task/components/TaskModal'
import TaskCard from '@features/task/components/TaskCard'
import { Task } from '@features/task/types'
import { useBoardState } from '../hooks/useBoardState'
import { useTaskModal } from '@features/task/hooks/useTaskModal'
import { useState } from 'react'

const BoardPage = () => {
    const { id } = useParams()
    const {
        board,
        createTask,
        createColumn,
        moveTask,
        deleteTask,
        deleteColumn,
    } = useBoardState(id)

    /* ---------- sensores con activationConstraint ---------- */
    const sensors = useSensors(
        useSensor(MouseSensor, { activationConstraint: { distance: 6 } }),
        useSensor(TouchSensor, { activationConstraint: { delay: 200, tolerance: 6 } })
    )

    /* ---------- modal de detalle ---------- */
    const { task, isOpen, openTask, closeTask } = useTaskModal()

    /* ---------- overlay de drag ---------- */
    const [activeTask, setActiveTask] = useState<Task | null>(null)

    const handleDragStart = (e: DragStartEvent) => {
        const taskId = e.active.id as string
        const flatTasks = board?.columns.flatMap((c) => c.tasks) ?? []
        const found = flatTasks.find((t) => t.id === taskId) || null
        setActiveTask(found)
    }

    const handleDragEnd = (e: DragEndEvent) => {
        setActiveTask(null)
        moveTask(e) // tu lógica existente para reordenar/mover tareas
    }

    if (!board) return <p className="p-4">Cargando tablero...</p>

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">{board.name}</h1>

            <DndContext
                sensors={sensors}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
            >
                <div className="flex gap-4 overflow-x-auto pb-4">
                    {board.columns.map((col) => (
                        <Column
                            key={col.id}
                            columnId={col.id}
                            title={col.title}
                            tasks={col.tasks}
                            onCreateTask={createTask}
                            onDeleteColumn={deleteColumn}
                            onTaskClick={openTask}
                        />
                    ))}

                    <CreateColumnForm onCreate={createColumn} />
                </div>

                {/* --- Overlay  --- */}
                <DragOverlay dropAnimation={{ duration: 180, easing: 'ease' }}>
                    {activeTask && (
                        <TaskCard
                            taskId={activeTask.id}
                            title={activeTask.title}
                            description={activeTask.description}
                        />
                    )}
                </DragOverlay>
            </DndContext>

            {isOpen && task && (
                <TaskModal task={task} onClose={closeTask} onDelete={deleteTask} />
            )}
        </div>
    )
}

export default BoardPage
