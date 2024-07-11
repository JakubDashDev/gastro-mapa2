import React, { InputHTMLAttributes } from "react";
import { FaLock } from "react-icons/fa";
import { FieldPath, FieldValues, Path, RegisterOptions, UseFormRegister } from "react-hook-form";

interface IFormInput {
  name: string;
  rating: number | null;
  isCustomRating: boolean;
  youtube: string;
  google: string;
  category: string[];
}

interface Props<T extends FieldValues> extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  field: FieldPath<T>;
  register: UseFormRegister<T>;
  options?: RegisterOptions<T>;
  error?: string;
}

function AdminInput<T extends FieldValues>(props: Props<T>) {
  const { field, register, options, label, error, ...rest } = props;
  return (
    <div className="relative flex flex-col">
      <label>{label}:</label>
      <input
        {...register(field, options)}
        {...rest}
        className={`w-full rounded-md bg-transparent bg-neutral-200 border py-2 px-2 outline-none focus:border-primary-500 disabled:text-gray-400 ${
          error ? "border-red-500 border-2 shadow-sm shadow-red-400" : "border-gray-400"
        }`}
      />
      {options?.disabled && <FaLock className="absolute right-[2%] top-[55%] text-gray-700" />}
      <p className="text-red-500 px-1">{error}</p>
    </div>
  );
}

export default AdminInput;
