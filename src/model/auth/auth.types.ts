export interface Authentication {
  accessToken: string;
  refreshToken: string;
}

export interface User {
    email: string;
  id: string;
  firstName: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface RegisterResponse {
  authentication: Authentication;
  user: User;
}

export interface LoginResponse extends RegisterResponse {}

export interface AuthState extends RegisterResponse {}
