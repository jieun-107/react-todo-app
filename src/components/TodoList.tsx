import TodoListEmpty from "./TodoListEmpty";
import TodoListItem from "./TodoListItem";

export default function TodoList({
  todos,
  toggleTodo,
  deleteTodo,
}: {
  todos: Todo[];
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
}) {
  return (
    <>
      <ul className="todo__list">
        {/* 할 일 목록이 없을 때  */}
        {todos.length === 0 && <TodoListEmpty />}

        {/* 할 일 목록이 있을 때  */}
        {todos.map((todo) => (
          <TodoListItem key={todo.id} todo={todo} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
        ))}
      </ul>
    </>
  );
}
