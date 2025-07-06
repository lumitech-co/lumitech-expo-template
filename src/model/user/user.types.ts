export interface User {
  id: number;
  email: string;
  name: string;
  avatar?: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

export type UserRole = 'user' | 'admin';

export interface CreateUserRequest {
  email: string;
  name: string;
  password: string;
  avatar?: string;
  role?: UserRole;
}

export interface CreateUserResponse {
  user: User;
}

export interface UpdateUserRequest {
  name?: string;
  avatar?: string;
  role?: UserRole;
}

export interface UpdateUserResponse {
  user: User;
}

export interface DeleteUserResponse {
  success: boolean;
  message?: string;
}

export interface GetUsersRequest {
  page?: number;
  limit?: number;
  search?: string;
  role?: UserRole;
}

export interface GetUsersResponse {
  users: User[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface GetUserResponse {
  user: User;
}

export interface UserState {
  user: User;
}

export interface UserStore extends UserState {
  setUser: (user: User) => void;
}
