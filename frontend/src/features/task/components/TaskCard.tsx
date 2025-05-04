import { TaskCardProps } from '@features/task/types'

const TaskCard = ({ title, description, onClick }: TaskCardProps) => (
    <div
        onClick={onClick}
        className="relative bg-slate-100 p-2 rounded-md shadow-sm hover:bg-slate-200 transition cursor-pointer"
    >
        <p className="text-sm font-medium">{title}</p>
        {description && <p className="text-xs text-gray-500">{description}</p>}
    </div>
)

export default TaskCard
