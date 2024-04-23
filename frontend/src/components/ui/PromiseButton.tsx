import { useSpring, animated, useTransition } from "@react-spring/web";
import React, { useEffect, useState } from "react";
import { FaCheck, FaX } from "react-icons/fa6";
import Loader from "./Loader";

type PromiseButtonType = {
  isSuccess: boolean;
  isError?: boolean;
  isLoading?: boolean;
  disabled?: boolean;
  type: "submit" | "reset" | "button" | undefined;
  onClick?: (...args: any) => void;
  bgColor?: string;
  textColor?: string;
  textHover?: string;
  hoverColor?: string;
  children: React.ReactNode;
};

function PromiseButton({
  isSuccess,
  isError,
  isLoading,
  disabled,
  type,
  onClick,
  bgColor,
  textColor = "text-white",
  textHover,
  hoverColor,
  children,
}: PromiseButtonType) {
  //??? idk for what it is
  // useEffect(() => {
  //   setTimeout(() => (isError = false), 1000);
  // }, [isError]);

  return (
    <button
      type={type}
      disabled={isLoading || disabled}
      className={`${textColor} w-full py-1 px-2 transition-all flex justify-center rounded-lg cursor-pointer disabled:bg-gray-800 disabled:cursor-not-allowed disabled:text-gray-600 ${
        isError
          ? "bg-red-500"
          : isSuccess
          ? "bg-green-600 text-white"
          : `bg-${bgColor} hover:bg-${hoverColor} hover:${textHover}`
      }`}
      onClick={onClick}
    >
      {isLoading ? <Loader /> : isError ? <span>:(</span> : isSuccess ? <FaCheck className="text-2xl" /> : children}
    </button>
  );
}

export default PromiseButton;
