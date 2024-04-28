import React from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  styles?: string;
  labelClassName?: string;
  error?: string | null | undefined;
};

function Input({ label, labelClassName, styles, error, ...props }: InputProps) {
  return (
    <div className="w-full flex flex-col">
      {label && (
        <label htmlFor={props.id} className={labelClassName}>
          {label}
        </label>
      )}
      <input
        id={props.id}
        name={props.name}
        type={props.type}
        placeholder={props.placeholder}
        maxLength={props.maxLength}
        minLength={props.minLength}
        autoFocus={props.autoFocus}
        value={props.value}
        onChange={props.onChange}
        {...props}
        className={`${styles} ${
          error ? "border-red-500" : undefined
        } "w-full flex-1 rounded-lg py-2 px-4 text-sm border-2 focus:border-primary-500 focus:outline-none disabled:text-gray-500"`}
      />
      {error && <span className="text-red-500 mt-1 mx-1 text-sm">{error}</span>}
    </div>
  );
}

export default Input;
