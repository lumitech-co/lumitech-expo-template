import {
  LoginRequest,
  LoginResponse
} from './models';

import { baseQuery } from '../baseQuery';

const login = (params: LoginRequest) => {
  return baseQuery.post<LoginResponse>('/auth/login', {
    ...params,
  });
};

export const AuthService = {
  login,
};
