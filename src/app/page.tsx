// File: pages/index.tsx
"use client"
import React, { useState } from 'react';
import { create } from 'zustand';

// Zustand store
interface Todo {
  id: number;
  text: string;
}
interface TodoStore {
  todos: Todo[];
  addTodo: (text: string) => void;
  deleteTodo: (id: number) => void;
  editTodo: (id: number, newText: string) => void;
}
const useTodoStore = create<TodoStore>((set) => ({
  todos: [],
  addTodo: (text) =>
    set((state) => ({
      todos: [...state.todos, { id: Date.now(), text }],
    })),
  deleteTodo: (id) =>
    set((state) => ({
      todos: state.todos.filter((todo) => todo.id !== id),
    })),
  editTodo: (id, newText) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, text: newText } : todo
      ),
    })),
}));

const Home = () => {
  const { todos, addTodo, deleteTodo, editTodo } = useTodoStore();
  const [newTodo, setNewTodo] = useState('');
  const [isEditing, setIsEditing] = useState<number | null>(null);
  const [editText, setEditText] = useState('');

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      addTodo(newTodo);
      setNewTodo('');
    }
  };

  const handleEditTodo = (id: number, text: string) => {
    setIsEditing(id);
    setEditText(text);
  };

  const handleSaveEdit = () => {
    if (isEditing !== null && editText.trim()) {
      editTodo(isEditing, editText);
      setIsEditing(null);
      setEditText('');
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Todo List</h1>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          className="border rounded-md p-2 flex-1"
          placeholder="New Todo"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
          onClick={handleAddTodo}
        >
          Add
        </button>
      </div>
      <ul className="space-y-2">
        {todos.map((todo) => (
          <li key={todo.id} className="flex justify-between items-center border rounded-md p-2">
            {isEditing === todo.id ? (
              <div className="flex gap-2 items-center flex-1">
                <input
                  type="text"
                  className="border rounded-md p-2 flex-1"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded-md"
                  onClick={handleSaveEdit}
                >
                  Save
                </button>
              </div>
            ) : (
              <span className="flex-1">{todo.text}</span>
            )}
            <div className="flex gap-2">
              <button
                className="bg-yellow-500 text-white px-3 py-1 rounded-md"
                onClick={() => handleEditTodo(todo.id, todo.text)}
              >
                Edit
              </button>
              <button
                className="bg-red-500 text-white px-3 py-1 rounded-md"
                onClick={() => deleteTodo(todo.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
