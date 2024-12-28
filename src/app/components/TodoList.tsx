'use client';

import React from 'react';
import { useTodoStore } from '../store/todoStore';
import TodoItem from './TodoItem';

const TodoList = () => {
  const todos = useTodoStore((state) => state.todos);

  return (
    <ul className="space-y-3">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
};

export default TodoList;
