import {
  LoginRequest,
  LoginResponse
} from './models';

import { baseQuery } from '../baseQuery';

export interface PaginationParams {
  page: number;
  limit: number;
  search: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

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
