import { useMutation } from '@tanstack/react-query';
import {
  ToastService,
  ExceptionService
} from 'services';
import { useAuthStoreSelectors } from 'stores';
import { LoginRequest } from '../models';
import { AuthService } from '../AuthService';

export const useLogin = () => {
  const { setTokens, setUser } =
    useAuthStoreSelectors();

  const { isPending, mutateAsync: onLogin } = useMutation({
    mutationFn: async (params: LoginRequest) => {
      const response = await AuthService.login({
        email: params.email,
        password: params.password,
      });

      return response?.data;
    },
    onError: error => {
      ToastService.onDanger({
        title: ExceptionService.errorResolver(error),
      });
    },
    onSuccess: data => {
      setTokens({
        accessToken: data.authentication.accessToken,
        refreshToken: data.authentication.refreshToken,
      });
      setUser(data.user);
    },
  });

  return { isPending, onLogin };
};
