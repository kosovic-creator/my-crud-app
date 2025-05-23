'use client'
import { useRouter } from 'next/navigation';
import { useState } from 'react'

export default function Add() {


    const [title,setTitle] = useState<string>('');
const router = useRouter();

async function fetchAddTodo() {
    try {
        const response = await fetch(`/api/todo/`, {
            method: 'POST',
            body: JSON.stringify({ title }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Added:', data);
        setTitle('');
        router.push('/todo');
    } catch (error) {
        console.error('Error adding todo:', error);
    }
} return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
            <p className="text-2xl font-bold mb-6 text-center text-gray-800">Add Todo Page</p>
            <form
                className="flex flex-col gap-4"
                onSubmit={(e) => {
                    e.preventDefault();
                    fetchAddTodo();
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
                    Add Todo
                </button>
            </form>
        </div>
    </div>
    );
}
