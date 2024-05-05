import { setAuth } from "../../redux/authSlice";
import { useAppDispatch } from "../../redux/store";
import { useUpdateMeMutation, useUpdatePasswordMutation } from "../../services/authApi";

type useHandlePasswordSubmitProps = {
  currentPassword: string;
  confirmPassword: string;
  password: string;
};

export const useHandlePasswordSubmit = () => {
  const dispatch = useAppDispatch();
  const [updatePassword, { isLoading, isError, isSuccess, error, reset }] = useUpdatePasswordMutation();

  const trigger = (data: useHandlePasswordSubmitProps) => {
    updatePassword(data)
      .unwrap()
      .then((res) => dispatch(setAuth(res)));
  };

  return { trigger, isLoading, isError, isSuccess, error, reset };
};

export const useHandleUpdateUser = () => {
  const dispatch = useAppDispatch();

  const [updateMe, { isLoading, isError, isSuccess, error, reset }] = useUpdateMeMutation();

  const trigger = (data: { username: string; email: string; password: string }) => {
    updateMe(data)
      .unwrap()
      .then((res) => dispatch(setAuth(res)));
  };

  return { trigger, isLoading, isError, isSuccess, error, reset };
};
