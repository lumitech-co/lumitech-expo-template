import { LoginRequest, LoginResponse } from 'models';
import { baseQuery } from '../baseQuery';

const login = async (params: LoginRequest) => {
  const response = await baseQuery.post<LoginResponse>('/auth/login', {
    ...params,
  });

  return response?.data;
};

const ping = async () => {
  const response = await baseQuery.get<LoginResponse>('/auth/ping');
  return response?.data;
}

export const AuthService = {
  login,
  ping
};
