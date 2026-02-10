import { useState } from "react";
import Button from "./html/Button"; // 프로젝트 내부의 Button 컴포넌트
import Input from "./html/Input"; // 프로젝트 내부의 Input 컴포넌트
import { useTodoAction } from "../context/todo/useTodo";

// 컴포넌트의 props 타입을 인라인으로 정의.
// - addTodo: 문자열(text)을 받아서 처리하는 함수. 부모 컴포넌트로부터 전달됨.
export default function TodoEditor() {
  // useState 훅: 컴포넌트 내부의 상태(state)를 관리.
  // 여기서는 사용자가 입력한 텍스트를 저장하는 `text` 상태를 사용.
  // TypeScript가 초기값("")을 보고 `text`를 string 타입으로 추론.
  const [text, setText] = useState("");
  const { addTodo } = useTodoAction();

  // 폼 제출(Enter 키 또는 버튼 클릭) 시 호출되는 함수.
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // 페이지 새로고침 막기.

    if (text.trim() === "") return;

    // 부모로부터 받은 addTodo 함수를 호출해 실제 할 일을 추가.
    // addTodo는 외부에서 로직을 처리하므로 이 컴포넌트는 UI와 입력 관리에 집중.
    addTodo(text);

    // 입력 필드를 초기화(빈 문자열로) 해서 사용자가 새 항목을 입력할 수 있도록.
    setText("");
  };

  // JSX 반환: 화면에 표시될 UI
  // - <form> 요소의 onSubmit에 handleSubmit을 연결해 키보드 제출과 버튼 제출 모두 동일하게 처리.
  // - Input 컴포넌트는 '제어 컴포넌트(controlled component)'로 사용.
  //   즉, value를 React state(`text`)로 관리하고 onChange에서 상태를 업데이트.
  return (
    <>
      <form className="todo__form" onSubmit={handleSubmit}>
        <div className="todo__editor">
          <Input
            type="text"
            className="todo__input"
            placeholder="Enter Todo List"
            value={text}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setText(e.target.value)}
          />
          <Button className="todo__button" type="submit">
            Add
          </Button>
        </div>
      </form>
    </>
  );
}