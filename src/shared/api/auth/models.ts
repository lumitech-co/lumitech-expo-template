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
