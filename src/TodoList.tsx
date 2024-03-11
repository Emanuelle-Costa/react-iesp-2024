import React, { useState, useEffect, useRef, ChangeEvent } from 'react';

interface Todo {
  id: number;
  title: string;
  done: boolean;
}

function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editedText, setEditedText] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);
  const [newTodoText, setNewTodoText] = useState<string>('');

  useEffect(() => {
    fetchTodos();
  }, []);

  function fetchTodos() {
    fetch('http://localhost:3000/tasks')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch todos');
        }
        return response.json();
      })
      .then((data: Todo[]) => setTodos(data))
      .catch(error => console.error('Error fetching todos:', error));
  }

  function addTodo() {
    fetch('http://localhost:3000/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title: newTodoText, done: false }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to add todo');
        }
        return response.json();
      })
      .then((data: Todo) => {
        console.log('Nova Tarefa Adicionada:', data);
        setTodos([...todos, data]);
        setNewTodoText('');
      })
      .catch(error => console.error('Error adding todo:', error));
  }

  function toggleTodoDone(id: number) {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, done: !todo.done } : todo
    );

    setTodos(updatedTodos);
    
    const updatedTodo = updatedTodos.find(todo => todo.id === id);
    updatedTodo && console.log(`Task updated - Title: ${updatedTodo.title}, Done: ${updatedTodo.done}`);

    fetch(`http://localhost:3000/tasks/${id}/done`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    }).catch(error => console.error('Error toggling todo done:', error));
  }

  function startEditing(index: number) {
    setEditingIndex(index);
    setEditedText(todos[index]?.title || '');
  }

  function handleEditedTextChange(event: ChangeEvent<HTMLInputElement>) {
    setEditedText(event.target.value);
  }

  function saveEditedTodo(index: number) {
    const updatedTodos = [...todos];
    updatedTodos[index].title = editedText;
    console.log('Tarefa Editada:', updatedTodos[index]);
    setTodos(updatedTodos);
    setEditingIndex(null);
  
    
    const editedTodo = updatedTodos[index];
    fetch(`http://localhost:3000/tasks/${editedTodo.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title: editedTodo.title }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to save edited todo');
        }
      })
      .catch(error => console.error('Error saving edited todo:', error));
  }
  

  function removeTodo(todo: Todo) {
    const updatedTodos = todos.filter(t => t.id !== todo.id);
    setTodos(updatedTodos);
    fetch(`http://localhost:3000/tasks/${todo.id}`, { method: 'DELETE' })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to delete todo');
        }
      })
      .catch(error => console.error('Error removing todo:', error));
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', flexDirection: 'row', gap: 10 }}>
        <input ref={inputRef} type="text" value={newTodoText} onChange={e => setNewTodoText(e.target.value)} placeholder="Adicionar Todo" />
        <button onClick={addTodo}>Adicionar</button>
      </div>

      <ul>
        {todos.map((todo, index) => (
          <li key={todo.id} style={{ gap: 10, display: 'flex', flexDirection: 'row' }}>
            {editingIndex === index ? (
              <>
                <input type="text" value={editedText} onChange={handleEditedTextChange} />
                <button onClick={() => saveEditedTodo(index)}>Salvar</button>
              </>
            ) : (
              <>
                <span style={{ textDecoration: todo.done ? 'line-through' : 'none' }}>{todo.title}</span>
                <input type="checkbox" checked={todo.done} onChange={() => toggleTodoDone(todo.id)} />
                <button onClick={() => startEditing(index)}>Editar</button>
                <button onClick={() => removeTodo(todo)}>Remover</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
