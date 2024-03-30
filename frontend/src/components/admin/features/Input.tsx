import React from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  styles?: string;
};

function Input({ label, styles, ...props }: InputProps) {
  return (
    <div className="w-full flex flex-col">
      {label && (
        <label htmlFor={props.id} className="text-white ">
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
        className={`${styles} "w-full flex-1 rounded-lg py-2 px-4 text-sm border-2 border-dashboardSecondary text-gray-300 focus:border-primary-500 focus:outline-none bg-dashboardSecondary "`}
      />
    </div>
  );
}

export default Input;
