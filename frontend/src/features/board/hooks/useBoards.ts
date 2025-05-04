import { useEffect, useState } from 'react'
import { Board } from '../types/board'
import { boardService } from '../services/boardService'

export const useBoards = () => {
    const [boards, setBoards] = useState<Board[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        boardService.getAll().then((data) => {
            setBoards(data)
            setLoading(false)
        })
    }, [])

    const addBoard = async (name: string) => {
        const newBoard = await boardService.create(name)
        setBoards((prev) => [...prev, newBoard])
    }

    return { boards, loading, addBoard }
}
