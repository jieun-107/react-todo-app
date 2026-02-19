import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const todoSlice = createSlice({
  name: "todoSlice",
  initialState: {
    todos: [] as Todo[]
  },
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      state.todos.push({
        id: Date.now(),
        text: action.payload,
        completed: false,
      });
    },
    toggleTodo: (state, action: PayloadAction<number>) => {
      const todo = state.todos.find((todo) => todo.id === action.payload);
      if(todo) {
        todo.completed = !todo.completed;
      }
    },
    modifyTodo: (state, action: PayloadAction<{id: number, text: string}>) => {
      const todo = state.todos.find((todo) => todo.id === action.payload.id);
      if(todo) {
        todo.text = action.payload.text
      }
    },
    deleteTodo: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
  },
});

export const { addTodo, toggleTodo, modifyTodo, deleteTodo} = todoSlice.actions;
export default todoSlice.reducer;