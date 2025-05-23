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
        .then((data) => {
            console.log('Deleted:', data);
            setTodo((prev) => prev ? prev.filter((t) => t.id !== id) : prev);
        })
        .catch((error) => {
            console.error('Error deleting todo:', error);
        });
}
  return (
      <div className="max-w-2xl mx-auto mt-10">
          <h1 className="text-2xl font-bold mb-6 text-center">Todo List</h1>
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow">
              <thead>
                  <tr>
                      <th className="py-2 px-4 border-b bg-gray-100 text-left">ID</th>
                      <th className="py-2 px-4 border-b bg-gray-100 text-left">Title</th>
                      <th className="py-2 px-4 border-b bg-gray-100 text-left">Action</th>
                  </tr>
              </thead>
              <tbody>
                  {todo.map((item: { id: number; title: string }) => (
              <tr key={item.id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">{item.id}</td>
                  <td className="py-2 px-4 border-b">{item.title}</td>
                  <td className="py-2 px-4 border-b">
                      <button
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition"
                          onClick={() => {
                              handleDelete(item.id);
                          }}
                      >
                          Delete
                      </button>
                      <button
                            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded transition"
                            onClick={() => {
                                window.location.href = `/todo/add`;
                            }}
                        >
                            Add
                        </button>
                  </td>

              </tr>
          ))}
              </tbody>
          </table>
    </div>
  )
}
