import { memo } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import TaskCard from './TaskCard'
import { TaskCardProps } from '@features/task/types'

const SortableTaskCard = memo((props: TaskCardProps) => {
    const {
        setNodeRef,
        attributes,
        listeners,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: props.taskId })

    const style: React.CSSProperties = {
        transform: CSS.Transform.toString(transform),
        transition,
        willChange: transform ? 'transform' : undefined, // GPU en movimiento
    }

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}          /* ← toda la tarjeta es draggable */
            className={`
        ${isDragging ? 'opacity-80 shadow-none' : 'shadow-sm'}
        rounded-md bg-slate-100
      `}
        >
            <TaskCard {...props} />
        </div>
    )
})

export default SortableTaskCard
