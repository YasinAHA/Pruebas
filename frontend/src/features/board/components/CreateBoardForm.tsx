import { useState } from 'react'

interface Props {
    onCreate: (name: string) => void
}

const CreateBoardForm = ({ onCreate }: Props) => {
    const [name, setName] = useState('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!name.trim()) return
        onCreate(name.trim())
        setName('')
    }

    return (
        <form onSubmit={handleSubmit} className="flex gap-2 mt-4">
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nombre del tablero"
                className="flex-1 p-2 rounded border border-slate-300"
            />
            <button
                type="submit"
                className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
            >
                Crear
            </button>
        </form>
    )
}

export default CreateBoardForm
