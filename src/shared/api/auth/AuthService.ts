import {
  LoginRequest,
  LoginResponse,
  PaginatedResponse,
  PaginationParams
} from './models';

import { baseQuery } from '../baseQuery';

const login = (params: LoginRequest) => {
  return baseQuery.post<LoginResponse>('/auth/login', {
    ...params,
  });
};

const getUser = () => {
  return baseQuery.get<LoginResponse>('/auth/user');
};

const getUserById = (id: string) => {
  return baseQuery.get<LoginResponse>(`/auth/user/${id}`);
};

const getUsers = (params: PaginationParams) => {
  return baseQuery.get<PaginatedResponse<LoginResponse>>('/auth/users', {
    params: {
      page: params.page,
      limit: params.limit,
      search: params.search,
    },
  });
};

export const AuthService = {
  login,
  getUser,
  getUserById,
  getUsers,
};
