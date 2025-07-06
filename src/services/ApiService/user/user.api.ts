import { 
  CreateUserRequest,
  CreateUserResponse,
  UpdateUserRequest,
  UpdateUserResponse,
  DeleteUserResponse,
  GetUsersRequest,
  GetUsersResponse,
  GetUserResponse 
} from 'models';
import { baseQuery } from '../baseQuery';

const createUser = async (params: CreateUserRequest) => {
  const response = await baseQuery.post<CreateUserResponse>('/users', params);
  return response?.data;
};

const getUser = async () => {
  const response = await baseQuery.get<GetUserResponse>('/user/me');
  return response?.data;
};

const getUserById = async (id: string) => {
  const response = await baseQuery.get<GetUserResponse>(`/users/${id}`);
  return response?.data;
};

const getUsers = async (params: GetUsersRequest = {}) => {
  const response = await baseQuery.get<GetUsersResponse>('/users', {
    params: {
      page: params.page || 1,
      limit: params.limit || 10,
      search: params.search,
      role: params.role,
    },
  });
  return response?.data;
};

const updateUser = async (id: number, params: UpdateUserRequest) => {
  const response = await baseQuery.put<UpdateUserResponse>(`/users/${id}`, params);
  return response?.data;
};

const updateCurrentUser = async (params: UpdateUserRequest) => {
  const response = await baseQuery.put<UpdateUserResponse>('/user/me', params);
  return response?.data;
};

const deleteUser = async (id: number) => {
  const response = await baseQuery.delete<DeleteUserResponse>(`/users/${id}`);
  return response?.data;
};

const deleteCurrentUser = async () => {
  const response = await baseQuery.delete<DeleteUserResponse>('/user/me');
  return response?.data;
};

export const UserService = {
  createUser,
  getUser,
  getUserById,
  getUsers,
  updateUser,
  updateCurrentUser,
  deleteUser,
  deleteCurrentUser,
};
