'use client';

import React, { useState } from 'react';
import { useTodoStore } from '../store/todoStore';

const AddTodo = () => {
  const [newTodo, setNewTodo] = useState('');
  const addTodo = useTodoStore((state) => state.addTodo);

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      addTodo(newTodo);
      setNewTodo('');
    }
  };

  return (
    <div className="bg-white shadow-md rounded-md p-4 mb-6">
      <div className="flex gap-2">
        <input
          type="text"
          className="border rounded-md p-2 flex-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="New Todo"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button
          className="text-blue-500 border border-1 border-blue-500 px-4 py-2 rounded-md hover:bg-blue-200"
          onClick={handleAddTodo}
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default AddTodo;
