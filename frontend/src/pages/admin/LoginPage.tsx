import React, { useState } from "react";
import InputField from "../../components/features/InputField";
import AdminInput from "../../components/features/AdminInput";
import { useHandleSubmit } from "./LoginPage.hooks";
import { Navigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import PromiseButton from "../../components/ui/PromiseButton";
import { SubmitHandler, useForm } from "react-hook-form";
import { useLoginMutation } from "../../services/authApi";
import { setAuth } from "../../redux/authSlice";
import { FaBan, FaExclamationCircle, FaExclamationTriangle, FaInfo } from "react-icons/fa";

interface IFormInput {
  username: string;
  email: string;
  password: string;
}

function LoginPage() {
  const dispatch = useAppDispatch();
  const { userInfo } = useAppSelector((state) => state.auth);
  const { register, handleSubmit, formState } = useForm<IFormInput>();
  const [login, { isLoading, isSuccess, isError, error }] = useLoginMutation();

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    login(data)
      .unwrap()
      .then((res) => dispatch(setAuth(res)));
  };

  if (userInfo) return <Navigate to="/dashboard" replace />;
  return (
    <div className="w-screen h-[calc(100dvh)] bg-darkBg flex flex-col items-center justify-center gap-5 border border-gray-500">
      <h1 className="text-primary-500 text-3xl font-loader">Gastro Mapa</h1>

      <form
        className="w-full sm:w-1/2 lg:w-1/3 shadow-lg rounded-md p-6 flex flex-col justify-center gap-5 bg-neutral-200 "
        onSubmit={handleSubmit(onSubmit)}
      >
        <AdminInput
          field="username"
          label="Nazwa użytkownika"
          placeholder="Nazwa użytkownika"
          id="username"
          name="username"
          type="text"
          register={register}
          options={{ required: { value: true, message: "To pole jest wymagane!" } }}
          error={formState.errors.username?.message}
        />
        <AdminInput
          field="email"
          label="Email"
          placeholder="email@email.com"
          id="email"
          name="email"
          type="email"
          register={register}
          options={{ required: { value: true, message: "To pole jest wymagane!" } }}
          error={formState.errors.email?.message}
        />
        <AdminInput
          field="password"
          label="Hasło"
          placeholder="Hasło"
          id="password"
          name="password"
          type="password"
          register={register}
          options={{ required: { value: true, message: "To pole jest wymagane!" } }}
          error={formState.errors.password?.message}
        />
        {isError && (
          <div className="w-full bg-red-300 text-gray-900 flex items-center justify-center gap-2 py-2 rounded-md">
            <FaBan className="text-xl" />
            <span>{error && "data" in error && error.data.message}</span>
          </div>
        )}

        <div className="w-full flex items-center justify-center">
          <PromiseButton
            status={isLoading ? "loading" : isSuccess ? "success" : null}
            type="submit"
            className="bg-primary-500 hover:bg-primary-400 rounded-lg py-2 w-1/2"
          >
            Zaloguj
          </PromiseButton>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
