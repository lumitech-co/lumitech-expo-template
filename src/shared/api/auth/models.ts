export interface Authentication {
  accessToken: string;
  refreshToken: string;
}

export interface User {
  email: string | null;
  id: number;
}

export interface LoginResponse {
  authentication: Authentication;
  user: User;
}

export interface LoginRequest {
  email: string;
  password: string;
}

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
