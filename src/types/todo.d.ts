interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface TodoContextType {
  todos: Todo[];
}

interface TodoContextActionType {
  addTodo: (text: string) => void;
  toggleTodo: (id: number) => void;
  modifyTodo: (id: number, text: string) => void;
  deleteTodo: (id: number) => void;
}