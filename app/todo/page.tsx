'use client'
import{ useState, useEffect } from 'react'

export default function GetTodo() {
    const [todo, setTodo] = useState<{ id: number; title: string }[] | null>(null);
    const [error, setError] = useState<Error | null>(null);

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

  return (
    <div>

      <h1>Todo List</h1>
      <ul>
        {todo.map((item: { id: number; title: string }) => (
          <li key={item.id}>
            {item.title} (ID: {item.id})
          </li>
        ))}
      </ul>

    </div>
  )
}
