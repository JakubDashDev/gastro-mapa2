import { useLoginMutation } from "../../services/authApi";
import { setAuth } from "../../redux/authSlice";
import { useAppDispatch } from "../../redux/store";

export function useHandleSubmit(state: string) {
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
