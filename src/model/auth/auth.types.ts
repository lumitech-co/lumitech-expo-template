import type { Authentication, User, AuthState } from "lib";

export type { Authentication, User, AuthState };

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
