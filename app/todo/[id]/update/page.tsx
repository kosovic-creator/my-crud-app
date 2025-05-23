
import { useEffect, useState } from 'react'

export default function Update(params: { params: { id: string } }) {
    const { id } = params.params;


    const [title] = useState<string>('');

useEffect(() => {
    async function fetchAddTodo() {
        try {
            await fetch(`/api/todo/${id}`, {
                method: 'PUT',
                body: JSON.stringify({ title }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

        } catch (error) {
            console.error('Error adding todo:', error);
        }
    }

    fetchAddTodo();
}, [title, id]);

    return (
        <div>
            {/* Add your form or UI here */}
            <p>Add Todo Page</p>
        </div>
    );
}
