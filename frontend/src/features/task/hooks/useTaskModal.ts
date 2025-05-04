import { useState } from 'react'
import { Task } from '../types'

export const useTaskModal = () => {
    const [task, setTask] = useState<Task | null>(null)

    const openTask = (task: Task) => setTask(task)
    const closeTask = () => setTask(null)

    return {
        task,
        openTask,
        closeTask,
        isOpen: !!task,
    }
}
