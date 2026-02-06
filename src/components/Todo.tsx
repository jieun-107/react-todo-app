import { useEffect, useState } from "react";
import TodoEditor from "./TodoEditor"; // 입력 폼 컴포넌트
import TodoHeader from "./TodoHeader"; // 상단 헤더(타이틀 등)
import TodoList from "./TodoList"; // 실제 할 일 항목들을 렌더링하는 리스트

export default function Todo() {
  // useState<Todo[]>: 제네릭으로 상태의 타입을 명시.
  // - `Todo[]`는 Todo 객체들의 배열.
  // - 초기값은 빈 배열([])이며, 이 상태가 'todos'에 저장됨.
  const [todos, setTodos] = useState<Todo[]>(JSON.parse(localStorage.getItem("todos") || "[]"));

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
    setTodos((todos) => todos.map((todo) => todo.id === id ? { ...todo, text} : todo));
  }

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos]);

  return (
    <>
      <div className="todo">
        {/* 간단한 헤더(타이틀 등) */}
        <TodoHeader />

        {/* 할 일 등록 폼: 내부에서 addTodo 호출 */}
        <TodoEditor addTodo={addTodo} />

        {/* 할 일 목록: TodoList가 배열을 받아 각각의 항목을 렌더링 */}
        <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} modifyTodo={modifyTodo} />
      </div>
    </>
  );
}

/*
  초심자 팁:
  - 불변성(immutability): 상태를 직접 수정하지 말고, 새로운 배열/객체를 만들어서 set 함수로 교체하세요.
  - setState에 함수형 업데이트를 사용하면 이전 상태를 안전하게 참고할 수 있습니다.
  - id를 key로 사용하는 이유: React는 key를 통해 각 항목을 식별해 효율적으로 업데이트합니다.
*/
