import { useEffect, useMemo, useState } from "react";
import { TodoContext, TodoContextAction } from "./TodoContext";

export default function TodoProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // useState<Todo[]>: 제네릭으로 상태의 타입을 명시.
  // - `Todo[]`는 Todo 객체들의 배열.
  // - 초기값은 빈 배열([])이며, 이 상태가 'todos'에 저장됨.
  const [todos, setTodos] = useState<Todo[]>(
    JSON.parse(localStorage.getItem("todos") || "[]"),
  );

  // addTodo: 새로운 할 일을 추가하는 함수.
  // - text 매개변수는 추가할 할 일의 문자열 내용.
  // - setTodos에 함수 형식의 업데이트를 사용하면 이전 상태값(todos)을 안전하게 참조할 있음.
  const addTodo = (text: string) => {
    setTodos((todos) => [
      // ...todos: 기존 배열을 그대로 펼쳐서 새로운 항목 뒤에 추가 (불변성 유지)
      ...todos,
      {
        // 간단한 고유 ID로 Date.now()를 사용.
        id: Date.now(),
        text,
        completed: false,
      },
    ]);
  };

  const toggleTodo = (id: number) => {
    setTodos((todos) =>
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const deleteTodo = (id: number) => {
    setTodos((todos) => todos.filter((todo) => todo.id !== id));
  };

  const modifyTodo = (id: number, text: string) => {
    setTodos((todos) =>
      todos.map((todo) => (todo.id === id ? { ...todo, text } : todo)),
    );
  };

  const memoization = useMemo(
    () => ({ addTodo, toggleTodo, modifyTodo, deleteTodo }),
    [],
  );

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <>
      <TodoContextAction value={memoization}>
        <TodoContext value={{ todos }}>{children}</TodoContext>
      </TodoContextAction>
    </>
  );
}
