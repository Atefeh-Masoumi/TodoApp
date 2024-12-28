import React from 'react';
import AddTodo from './components/AddTodo';
import TodoList from './components/TodoList';

const Home = () => {
  return (
    <div className="max-w-lg mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Todo List</h1>
      <AddTodo />
      <TodoList />
    </div>
  );
};

export default Home;
