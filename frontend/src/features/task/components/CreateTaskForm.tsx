import { useState } from 'react'

interface Props {
    onCreate: (title: string) => void
}

const CreateTaskForm = ({ onCreate }: Props) => {
    const [title, setTitle] = useState('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const trimmed = title.trim()
        if (!trimmed) return
        onCreate(trimmed)
        setTitle('')
    }

    return (
        <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-2">
            <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Nueva tarea"
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
            />
            <button
                type="submit"
                className="self-end px-3 py-1 text-sm bg-black text-white rounded hover:bg-gray-800 transition"
            >
                Añadir
            </button>
        </form>
    )
}

export default CreateTaskForm
