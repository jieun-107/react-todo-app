/*
  src/components/html/Input.tsx
  재사용 가능한 'Input' 컴포넌트를 정의.
*/

// React의 HTML 입력 속성 타입 중에서 `type` 속성의 타입만 꺼내옴.
// - `React.InputHTMLAttributes<HTMLInputElement>`는 <input> 요소에 올 수 있는 모든 표준 속성과 이벤트 핸들러 타입들을 포함하는 타입
// - 뒤에 `["type"]`를 붙이면 그 타입 중 `type` 속성에 대한 타입(예: 'text' | 'number' | ...) 만을 가져옴.
type ReactInputType = React.InputHTMLAttributes<HTMLInputElement>["type"];

// Input 컴포넌트에 들어갈 props 타입을 정의.
// - `React.ComponentPropsWithoutRef<"input">`는 JSX에서 <input>에 전달할 수 있는 모든 props의 타입.
// - `Omit<..., "type">`는 기본 input props에서 `type` 속성만 제외. (아래에서 다시 정의하기 위해)
// - `type: Exclude<ReactInputType, "radio" | "checkbox">`로 `radio`와 `checkbox` 타입을 제외.
// 결과적으로 이 컴포넌트는 일반적인 input 속성들은 모두 받지만, `type`은 라디오/체크박스 이외의 값만 허용.
type InputProps = Omit<React.ComponentPropsWithoutRef<"input">, "type"> & {
  type: Exclude<ReactInputType, "radio" | "checkbox">;
};

// 기본적으로 전달된 props를 그대로 <input>에 전달.
export default function Input(props: InputProps) {
  // props를 그대로 rest라는 객체로 모아둠.
  const {...rest}  = props;

  return (
    <>
      {/*
        JSX에서 `{...rest}`는 객체에 들어있는 모든 키-값 쌍을
        해당 HTML 요소의 속성으로 펼쳐서 넣어줌.
        예: <Input type="text" placeholder="입력" /> 이면
             <input type="text" placeholder="입력" /> 와 같음.
      */}
      <input {...rest} />
    </>
  )
}

/*
  사용 예시:
    <Input type="text" placeholder="할 일 입력" />

  주의 및 권장 사항:
  - 라벨이 필요한 경우 <label> 요소와 연결하거나 `aria-label`/`aria-labelledby`를 사용해 접근성(a11y)을 챙기세요.
  - 이 컴포넌트는 checkbox와 radio를 처리하지 않으므로 해당 타입이 필요하면 별도의 컴포넌트를 만드세요.
*/
