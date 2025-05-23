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
        <div>
            {/* Add your form or UI here */}
            <p>Add Todo Page</p>
            <form onSubmit={(e) => {
                e.preventDefault();
                fetchAddTodo();
            }}>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter todo title"
                />
                <button type="submit">Add Todo</button>
            </form>
        </div>
    );
}
