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
  onClick?: () => void;
  bgColor: string;
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
  hoverColor = bgColor,
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
      className={`w-full py-1 transition-all flex justify-center text-white rounded-lg cursor-pointer disabled:bg-gray-800 disabled:cursor-not-allowed disabled:text-gray-600 ${
        isError ? "bg-red-500" : isSuccess ? "bg-green-600" : `bg-${bgColor} hover:bg-${hoverColor}`
      }`}
      onClick={onClick}
    >
      {isLoading ? <Loader /> : isError ? <span>:(</span> : isSuccess ? <FaCheck className="text-2xl" /> : children}
    </button>
  );
}

export default PromiseButton;
