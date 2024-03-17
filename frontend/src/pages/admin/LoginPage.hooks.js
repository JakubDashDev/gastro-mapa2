import { useDispatch } from 'react-redux';
import { useLoginMutation } from '../../services/authApi';
import { setAuth } from '../../redux/authSlice';
import { useNavigate } from 'react-router-dom';

export function useHandleSubmit(state) {
  const dispatch = useDispatch();
  const [login, { isLoading, error }] = useLoginMutation();

  const handleSubmit = (event) => {
    event.preventDefault();
    login(state)
      .unwrap()
      .then((res) => dispatch(setAuth(res)));
  };

  return { handleSubmit, isLoading, error };
}
