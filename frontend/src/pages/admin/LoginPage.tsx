import React, { useState } from "react";
import InputField from "../../components/features/InputField";
import { useHandleSubmit } from "./LoginPage.hooks";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../redux/store";
import PromiseButton from "../../components/ui/PromiseButton";

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

  const { handleSubmit, isLoading, error, isError } = useHandleSubmit(state);

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
        {isError && (
          <div className="border border-red-500 bg-red-900/40 text-white p-2 rounded-lg">
            {error && "data" in error
              ? error.data.message
              : "Wystąpił nieoczekiwany błąd 💔. Spróbuj ponownie, jeśli błąd nadal będzie występować skontakuj się z administratorem."}
          </div>
        )}

        <div className="w-1/2">
          <PromiseButton
            type="submit"
            isLoading={isLoading}
            isError={false}
            isSuccess={false}
            disabled={isLoading}
            bgColor="primary-500"
          >
            Zaloguj
          </PromiseButton>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
