import { Task } from '@features/task/types/task'

export type List = {
    id: string
    title: string
    tasks: Task[]
}
