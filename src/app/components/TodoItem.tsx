'use client';

import React, { useState } from 'react';
import { Todo, useTodoStore } from '../store/todoStore';
interface TodoItemProps {
  todo: Todo;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const deleteTodo = useTodoStore((state) => state.deleteTodo);
  const editTodo = useTodoStore((state) => state.editTodo);

  const handleSaveEdit = () => {
    if (editText.trim()) {
      editTodo(todo.id, editText);
      setIsEditing(false);
    }
  };

  return (
    <li className="flex justify-between items-center bg-white shadow-md rounded-md p-4">
      {isEditing ? (
        <div className="flex gap-2 items-center flex-1">
          <input
            type="text"
            className="border rounded-md p-2 flex-1 focus:outline-none focus:ring-2 focus:ring-green-400"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
          />
          <button
            className="text-green-500 border border-1 border-green-500 px-3 py-1 mx-2 rounded-md hover:bg-green-200"
            onClick={handleSaveEdit}
          >
            Save
          </button>
        </div>
      ) : (
        <span className="flex-1 text-gray-700">{todo.text}</span>
      )}
      <div className="flex gap-2">
       {!isEditing && <button
          className="text-amber-500 border-amber-500 border border-1 px-3 py-1 rounded-md hover:bg-amber-200"
          onClick={() => setIsEditing(true)}
        >
         Edit
        </button>}
        <button
          className="text-red-500 border-red-500  border border-1 white px-3 py-1 rounded-md hover:bg-red-200"
          onClick={() => deleteTodo(todo.id)}
        >
          Delete
        </button>
      </div>
    </li>
  );
};

export default TodoItem;
