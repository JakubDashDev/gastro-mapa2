import React, { HTMLAttributes } from "react";
import Loader from "./Loader";
import { FaCheck } from "react-icons/fa";

interface ButtonHTMLAttributes<T> extends HTMLAttributes<T> {
  autoFocus?: boolean;
  disabled?: boolean;
  name?: string;
  type?: "submit" | "reset" | "button";
}

interface PromiseButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  status: "loading" | "error" | "success" | null;
  className: string;
}

function PromiseButton({ children, status, className, ...props }: PromiseButtonProps) {
  const successStyles = status === "success" ? "!bg-green-500" : undefined;
  const errorStyles = status === "error" ? "!bg-red-500" : undefined;
  return (
    <button
      {...props}
      disabled={status === "loading" || props.disabled}
      className={`transition-all flex items-center justify-center text-white disabled:bg-gray-100/30 disabled:text-black-100/20 disabled:dark:bg-gray-800 disabled:dark:text-gray-700 ${className} ${successStyles} ${errorStyles}  `}
    >
      {status === "loading" ? (
        <Loader color="white" />
      ) : status === "error" ? (
        ":("
      ) : status === "success" ? (
        <FaCheck className="text-2xl" />
      ) : (
        children
      )}
    </button>
  );
}

export default PromiseButton;
