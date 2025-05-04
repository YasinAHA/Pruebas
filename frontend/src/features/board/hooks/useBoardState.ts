import { useEffect, useState } from 'react'
import { Board } from '../types/board'
import { Task } from '@features/task/types'
import { boardService } from '../services/boardService'
import { DragEndEvent } from '@dnd-kit/core'

export const useBoardState = (id: string | undefined) => {
    const [board, setBoard] = useState<Board | null>(null)

    useEffect(() => {
        if (!id) return
        boardService.getById(id).then((data) => setBoard(data ?? null))
    }, [id])

    const createColumn = (title: string) => {
        const newColumn = {
            id: `col-${Date.now()}`,
            title,
            tasks: [],
        }

        setBoard((prev) =>
            prev ? { ...prev, columns: [...prev.columns, newColumn] } : null
        )
    }

    const createTask = (columnId: string, title: string) => {
        const newTask: Task = {
            id: `task-${Date.now()}`,
            title,
        }

        setBoard((prev) =>
            prev
                ? {
                    ...prev,
                    columns: prev.columns.map((col) =>
                        col.id === columnId
                            ? { ...col, tasks: [...col.tasks, newTask] }
                            : col
                    ),
                }
                : null
        )
    }

    const deleteTask = (taskId: string) => {
        console.log("Deleting task...: " + taskId)
        
        setBoard((prev) => {
            if (!prev) return null

            const updatedColumns = prev.columns.map((col) => ({
                ...col,
                tasks: col.tasks.filter((t) => t.id !== taskId),
            }))

            return { ...prev, columns: updatedColumns }
        })
    }



    const deleteColumn = (columnId: string) => {
        console.log("Deleting column...: " + columnId)

        setBoard((prev) =>
            prev
                ? {
                    ...prev,
                    columns: prev.columns.filter((col) => col.id !== columnId),
                }
                : null
        )
    }

    const moveTask = (event: DragEndEvent) => {
        const { active, over } = event
        if (!active || !over || active.id === over.id) return

        setBoard((prev) => {
            if (!prev) return null

            const taskId = active.id
            const fromCol = prev.columns.find((col) =>
                col.tasks.some((task) => task.id === taskId)
            )
            const toCol = prev.columns.find(
                (col) => col.id === over.id || col.tasks.some((t) => t.id === over.id)
            )

            if (!fromCol || !toCol) return prev
            const task = fromCol.tasks.find((t) => t.id === taskId)
            if (!task) return prev

            if (fromCol.id === toCol.id) {
                const oldIndex = fromCol.tasks.findIndex((t) => t.id === taskId)
                const newIndex = toCol.tasks.findIndex((t) => t.id === over.id)
                if (newIndex === -1 || oldIndex === newIndex) return prev

                const reordered = [...fromCol.tasks]
                const [moved] = reordered.splice(oldIndex, 1)
                reordered.splice(newIndex, 0, moved)

                const updatedColumns = prev.columns.map((col) =>
                    col.id === fromCol.id ? { ...col, tasks: reordered } : col
                )

                return { ...prev, columns: updatedColumns }
            }

            const newFromTasks = fromCol.tasks.filter((t) => t.id !== taskId)
            const insertIndex = toCol.tasks.findIndex((t) => t.id === over.id)
            const newToTasks = [...toCol.tasks]
            newToTasks.splice(
                insertIndex === -1 ? newToTasks.length : insertIndex,
                0,
                task
            )

            const updatedColumns = prev.columns.map((col) => {
                if (col.id === fromCol.id) return { ...col, tasks: newFromTasks }
                if (col.id === toCol.id) return { ...col, tasks: newToTasks }
                return col
            })

            return { ...prev, columns: updatedColumns }
        })
    }

    return {
        board,
        createTask,
        createColumn,
        moveTask,
        deleteTask,
        deleteColumn,
    }
}
