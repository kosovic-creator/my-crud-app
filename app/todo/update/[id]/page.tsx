/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation';

export default function Update() {
    const params = useParams();
    const id = params?.id as string;
    const [title, setTitle] = useState<string>('');
    const router = useRouter();
    const [todoId, setTodoId] = useState<number>(0);
    const [error, setError] = useState<Error | null>(null);
    const [todo, setTodo] = useState<{ id: number; title: string } | null>(null);

    useEffect(() => {
        async function fetchTodo() {
            try {
                const response = await fetch(`/api/todo/${id}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setTodo(data);
                setTodoId(data.id);
                setTitle(data.title);
            } catch (error) {
                setError(error as Error);
            }
        }
        if (id) fetchTodo();
    }, [id]);

    async function fetchUpdateTodo() {
        try {
            const response = await fetch(`/api/todo/${id}`, {
                method: 'PUT',
                body: JSON.stringify({ title }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log('Updated:', data);
            setTitle('');
            router.push('/todo');
        } catch (error) {
            console.error('Error updating todo:', error);
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <p className="text-2xl font-bold mb-6 text-center text-gray-800">Update Todo Page</p>
                <form
                    className="flex flex-col gap-4"
                    onSubmit={(e) => {
                        e.preventDefault();
                        fetchUpdateTodo();
                    }}
                >
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter todo title"
                        className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <button
                        type="submit"
                        className="bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition"
                    >
                        Update Todo
                    </button>
                </form>
                {error && (
                    <p className="mt-4 text-red-600 text-center">Error: {error.message}</p>
                )}
            </div>
        </div>
    );
}
