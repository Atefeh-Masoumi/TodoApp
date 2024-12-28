import { create } from 'zustand';

export interface Todo {
  id: number;
  text: string;
}

export interface TodoStore {
  todos: Todo[];
  addTodo: (text: string) => void;
  deleteTodo: (id: number) => void;
  editTodo: (id: number, newText: string) => void;
}

export const useTodoStore = create<TodoStore>((set) => ({
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
