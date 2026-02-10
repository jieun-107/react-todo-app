import TodoEditor from "./TodoEditor"; // 입력 폼 컴포넌트
import TodoHeader from "./TodoHeader"; // 상단 헤더(타이틀 등)
import TodoList from "./TodoList"; // 실제 할 일 항목들을 렌더링하는 리스트

export default function Todo() {
  return (
    <>
      <div className="todo">
        {/* 간단한 헤더(타이틀 등) */}
        <TodoHeader />

        {/* 할 일 등록 폼: 내부에서 addTodo 호출 */}
        <TodoEditor />

        {/* 할 일 목록: TodoList가 배열을 받아 각각의 항목을 렌더링 */}
        <TodoList />
      </div>
    </>
  );
}
