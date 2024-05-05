import { Fragment, useEffect, useRef, useState } from "react";
import Input from "./Input";
import PromiseButton from "../ui/PromiseButton";
import { useHandlePasswordSubmit, useHandleUpdateUser } from "./UserAccountSettingsForms.hooks";
import { useAppSelector } from "../../redux/store";

export function UsernameForm() {
  const { userInfo } = useAppSelector((state) => state.auth);
  const { trigger, isLoading, isError, isSuccess, error, reset } = useHandleUpdateUser();
  const [isEdit, setIsEdit] = useState(false);
  const [username, setUsername] = useState(userInfo?.username || "");
  const [password, setPassword] = useState("");

  const handleOpen = () => {
    setUsername(userInfo?.username || "");
    setPassword("");
    setIsEdit((current) => !current);
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const data = { username, email: userInfo?.email || "", password };

    trigger(data);
  };

  return (
    <form className="w-full flex flex-col gap-3" onSubmit={handleSubmit}>
      <Input
        id="username"
        name="username"
        label="Nazwa użytkownika"
        type="text"
        value={username}
        onChange={(e) => {
          setUsername(e.target.value), reset();
        }}
        disabled={!isEdit}
        autoFocus={isEdit}
        styles=" border-gray-300"
      />
      {isEdit && (
        <Fragment>
          <Input
            id="usernamePassword"
            name="usernamePassword"
            label="Wprowadź hasło"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value), reset();
            }}
            disabled={!isEdit}
            styles=" border-gray-300"
            autoComplete="off"
            required
          />
          <PromiseButton
            isSuccess={isSuccess}
            isError={isError}
            isLoading={isLoading}
            type="submit"
            bgColor="primary-500"
            hoverColor="bg-primary-400"
            disabled={username === userInfo?.username && !isSuccess}
          >
            Zapisz
          </PromiseButton>
        </Fragment>
      )}
      {error && "data" in error && (
        <div className="w-full py-2 px-5 border border-red-500 bg-red-500/30 text-black rounded-lg">{error.data.message}</div>
      )}
      <button type="button" className="text-blue-500 self-end" onClick={handleOpen}>
        {isEdit ? "Anuluj" : "Zmień"}
      </button>
    </form>
  );
}

export function PasswordForm() {
  const [isEdit, setIsEdit] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("12345678910");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { trigger, isLoading, isError, isSuccess, error, reset } = useHandlePasswordSubmit();

  const handlePasswordEdit = () => {
    setIsEdit((current) => !current);
    setCurrentPassword(isEdit ? "12345678910" : "");
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const data = { currentPassword, password: newPassword, confirmPassword };
    trigger(data);
  };

  return (
    <form className="w-full flex flex-col gap-1" onSubmit={handleSubmit}>
      <Input
        id="currentPassword"
        name="currentPassword"
        label={isEdit ? "Obecne hasło" : "Hasło"}
        type="password"
        value={isEdit ? currentPassword : "12345678910"}
        onChange={(e) => {
          setCurrentPassword(e.target.value), reset();
        }}
        disabled={!isEdit}
        styles=" border-gray-300"
        autoComplete="off"
        required
      />
      {isEdit && (
        <div className="flex flex-col gap-3 mt-2">
          <Input
            id="newPassword"
            name="newPassword"
            label="Nowe hasło"
            type="password"
            value={newPassword}
            onChange={(e) => {
              setNewPassword(e.target.value), reset();
            }}
            styles="border-gray-300"
            autoComplete="off"
            required
          />
          <Input
            id="confirmPassword"
            name="confirmPassword"
            label="Potwierdź hasło"
            type="password"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value), reset();
            }}
            styles="border-gray-300"
            autoComplete="off"
            required
          />
          <PromiseButton
            isSuccess={isSuccess}
            isError={isError}
            isLoading={isLoading}
            type="submit"
            bgColor="primary-500"
            hoverColor="bg-primary-400"
          >
            Zapisz
          </PromiseButton>
          {error && "data" in error && (
            <div className="w-full py-2 px-5 border border-red-500 bg-red-500/30 text-black rounded-lg">{error.data.message}</div>
          )}
        </div>
      )}
      <button type="button" className="text-blue-500 self-end" onClick={handlePasswordEdit}>
        {isEdit ? "Anuluj" : "Zmień"}
      </button>
    </form>
  );
}

export function EmailForm() {
  const { userInfo } = useAppSelector((state) => state.auth);
  const { trigger, isLoading, isError, isSuccess, error, reset } = useHandleUpdateUser();

  const [isEdit, setIsEdit] = useState(false);
  const [email, setEmail] = useState(userInfo?.email || "");
  const [password, setPassword] = useState("");

  const handleOpen = () => {
    setEmail(userInfo?.email || "");
    setPassword("");
    setIsEdit((current) => !current);
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const data = { email, username: userInfo?.username || "", password };

    trigger(data);
  };

  return (
    <form className="w-full flex flex-col gap-3" onSubmit={handleSubmit}>
      <Input
        id="email"
        name="email"
        label="Adres email"
        type="Email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value), reset();
        }}
        disabled={!isEdit}
        styles=" border-gray-300"
        autoComplete="off"
        required
      />

      {isEdit && (
        <Fragment>
          <Input
            id="emailPassword"
            name="emailPassword"
            label="Wprowadź hasło"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value), reset();
            }}
            disabled={!isEdit}
            styles=" border-gray-300"
            autoComplete="off"
            required
          />
          <PromiseButton
            isSuccess={isSuccess}
            isError={isError}
            isLoading={isLoading}
            type="submit"
            bgColor="primary-500"
            hoverColor="bg-primary-400"
            disabled={email === userInfo?.email && !isSuccess}
          >
            Zapisz
          </PromiseButton>
        </Fragment>
      )}
      {error && "data" in error && (
        <div className="w-full py-2 px-5 border border-red-500 bg-red-500/30 text-black rounded-lg">{error.data.message}</div>
      )}
      <button type="button" className="text-blue-500 self-end" onClick={handleOpen}>
        {isEdit ? "Anuluj" : "Zmień"}
      </button>
    </form>
  );
}
