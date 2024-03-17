import React from 'react';

function InputField({
  id,
  name,
  value,
  type,
  label,
  placeholder,
  onChange,
  required,
  disabled,
  autoFocus,
  maxLength,
  minLength,
  otherProps,
  otherStyles,
}) {
  return (
    <div className="w-full flex flex-col gap-1 ">
      {label && <label htmlFor={name}>{label}</label>}
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        required={required}
        disabled={disabled}
        autoFocus={autoFocus}
        maxLength={maxLength}
        minLength={minLength}
        className={`${otherStyles} w-full border border-black/30 px-2 py-2 rounded-lg outline-none focus:border-primary`}
        {...otherProps}
      />
    </div>
  );
}

export default InputField;
