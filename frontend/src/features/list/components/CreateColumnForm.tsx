import { useState } from 'react'

interface Props {
    onCreate: (title: string) => void
}

const CreateColumnForm = ({ onCreate }: Props) => {
    const [title, setTitle] = useState('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const trimmed = title.trim()
        if (!trimmed) return
        onCreate(trimmed)
        setTitle('')
    }

    return (
        <form onSubmit={handleSubmit} className="min-w-[250px] bg-white rounded-xl shadow border border-dashed p-4">
            <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Nueva columna"
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded mb-2"
            />
            <button
                type="submit"
                className="w-full text-sm bg-black text-white py-1 rounded hover:bg-gray-800 transition"
            >
                Añadir columna
            </button>
        </form>
    )
}

export default CreateColumnForm
