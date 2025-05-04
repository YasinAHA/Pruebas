export type Task = {
    id: string
    title: string
    description?: string
}

export type TaskCardProps = {
    taskId: string
    title: string
    description?: string
    onDelete?: (id: string) => void
    onClick?: () => void
}