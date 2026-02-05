import { useId } from "react";

type CheckboxProps = Omit<React.ComponentPropsWithoutRef<"input">, "type"> & {
  type: "checkbox";
  parentClassName: string;
};
export default function Checkbox(props: CheckboxProps) {
  const { parentClassName, children, ...rest } = props;
  const uuid = useId();
  return (
    <>
      <div className={parentClassName}>
        <input id={uuid} {...rest} />
        <label htmlFor={uuid}>{children}</label>
      </div>
    </>
  );
}
