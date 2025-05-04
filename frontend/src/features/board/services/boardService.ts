import { Board } from '../types/board'

let mockBoards: Board[] = [
    {
        id: 'board-1',
        name: 'Proyecto DAW',
        columns: [
            {
                id: 'col-1',
                title: 'Por hacer',
                tasks: [{ id: 'task-1', title: 'Diseñar estructura' }],
            },
            {
                id: 'col-2',
                title: 'Por hacer',
                tasks: [{ id: 'task-2', title: 'Diseñar Back' }],
            },
        ],
    },
]

export const boardService = {
    getAll: async (): Promise<Board[]> => {
        return mockBoards
    },

    getById: async (id: string): Promise<Board | undefined> => {
        return mockBoards.find((b) => b.id === id)
    },

    create: async (name: string): Promise<Board> => {
        const newBoard: Board = {
            id: `board-${Date.now()}`,
            name,
            columns: [],
        }
        mockBoards = [...mockBoards, newBoard]
        return newBoard
    },
}
