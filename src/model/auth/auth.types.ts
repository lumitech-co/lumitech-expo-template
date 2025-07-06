import { User } from "../user";

export interface Authentication {
  accessToken: string;
  refreshToken: string;
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

export interface LoginResponse {
  authentication: Authentication;
  user: User;
}

export interface AuthState {
  authentication: Authentication;
}

export interface AuthStore extends AuthState {
  setTokens: (tokens: Authentication) => void;
}
