import React, { useState } from "react";
import InputField from "../../components/features/InputField";
import { useHandleSubmit } from "./LoginPage.hooks";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../redux/store";

function LoginPage() {
  const { userInfo } = useAppSelector((state) => state.auth);

  const [state, setState] = useState({
    username: "",
    email: "",
    password: "",
  });
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState((current) => ({
      ...current,
      [event.target.id]: event.target.value,
    }));
  };

  const { handleSubmit, isLoading, error } = useHandleSubmit(state);

  if (userInfo) return <Navigate to="/dashboard" replace />;

  return (
    <div className="w-screen h-[calc(100dvh)] bg-darkBg flex flex-col items-center justify-center gap-5">
      <h1 className="text-primary-500 text-3xl font-loader">Gastro Mapa</h1>

      <form
        className="w-full sm:w-1/2 lg:w-1/3 shadow-lg rounded-md p-6 flex flex-col items-center justify-center gap-5 bg-white/20"
        onSubmit={(event) => handleSubmit(event)}
      >
        <InputField
          id="username"
          name="username"
          type="text"
          value={state.username}
          onChange={handleChange}
          placeholder="Enter username"
          required
        />
        <InputField
          id="email"
          name="email"
          type="email"
          value={state.email}
          onChange={handleChange}
          placeholder="Enter email"
          required
        />
        <InputField
          id="password"
          name="password"
          type="password"
          value={state.password}
          onChange={handleChange}
          placeholder="Enter password"
          required
        />

        {error && (
          <div className="px-2 py-3 bg-red-300 border border-red-600 rounded-lg">{(error as any).data.message}</div>
        )}

        <button
          type="submit"
          className=" text-white px-10 py-2 rounded-full bg-primary hover:bg-primary-400 transition-colors"
        >
          Zaloguj
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
