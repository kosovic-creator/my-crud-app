/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react'

export default function GetTodo() {
    const [todo, setTodo] = useState<{ id: number; title: string }[] | null>(null);
    const [error, setError] = useState<Error | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const router = useRouter();

    useEffect(() => {
        async function fetchTodo() {
            try {
                const response = await fetch('/api/todo');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setTodo(data);
            } catch (error) {
                setError(error as Error);
            }
        }
        fetchTodo();
    }, []);

    if (error) {
        return <div>Error: {error.message}</div>;
    }
    if (!todo) {
        return <div>Loading...</div>;
    }

    function handleDelete(id: number) {
        fetch(`/api/todo/${id}`, {
            method: 'DELETE',
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(() => {
                setTodo((prev) => prev ? prev.filter((t) => t.id !== id) : prev);
            })
            .catch((error) => {
                console.error('Error deleting todo:', error);
            });
    }

    // Pagination logic
    const totalPages = Math.ceil(todo.length / itemsPerPage);
    const startIdx = (currentPage - 1) * itemsPerPage;
    const currentTodos = todo.slice(startIdx, startIdx + itemsPerPage);

    return (
        <div className="max-w-2xl mx-auto mt-10 p-6 bg-gray-50 rounded-xl shadow-lg">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-extrabold text-gray-800">Todo List</h1>
                <button
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-semibold shadow transition"
                    onClick={() => {
                        router.push(`/todo/add`);
                    }}
                >
                    Add
                </button>
            </div>
            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow">
                <thead>
                    <tr>
                        <th className="py-3 px-4 border-b bg-gray-100 text-left font-semibold text-gray-700">ID</th>
                        <th className="py-3 px-4 border-b bg-gray-100 text-left font-semibold text-gray-700">Title</th>
                        <th className="py-3 px-4 border-b bg-gray-100 text-left font-semibold text-gray-700">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {currentTodos.map((item: { id: number; title: string }) => (
                        <tr key={item.id} className="hover:bg-gray-50 transition">
                            <td className="py-2 px-4 border-b">{item.id}</td>
                            <td className="py-2 px-4 border-b">{item.title}</td>
                            <td className="py-2 px-4 border-b flex gap-2">
                                <button
                                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-lg font-medium transition"
                                    onClick={() => {
                                        handleDelete(item.id);
                                    }}
                                >
                                    Delete
                                </button>
                                <button
                                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded-lg font-medium transition"
                                    onClick={() => {
                                        router.push(`/todo/update/${item.id}`);
                                    }}
                                >
                                    Update
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* Pagination controls */}
            <div className="flex justify-center items-center gap-2 mt-6">
                <button
                    className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                    onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                    disabled={currentPage === 1}
                >
                    Prev
                </button>
                {[...Array(totalPages)].map((_, idx) => (
                    <button
                        key={idx}
                        className={`px-3 py-1 rounded ${currentPage === idx + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
                        onClick={() => setCurrentPage(idx + 1)}
                    >
                        {idx + 1}
                    </button>
                ))}
                <button
                    className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                    onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    )
}
