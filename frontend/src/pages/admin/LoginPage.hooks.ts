import { useLoginMutation } from "../../services/authApi";
import { setAuth } from "../../redux/authSlice";
import { useAppDispatch } from "../../redux/store";

type State = {
  username: string;
  email: string;
  password: string;
};

export function useHandleSubmit(state: State) {
  const dispatch = useAppDispatch();
  const [login, { isLoading, error }] = useLoginMutation();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    login(state)
      .unwrap()
      .then((res) => dispatch(setAuth(res)));
  };

  return { handleSubmit, isLoading, error };
}
