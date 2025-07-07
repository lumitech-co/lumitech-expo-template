import { baseQuery } from "api";
import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
} from "../auth.types";

const login = async (params: LoginRequest) => {
  const response = await baseQuery.post<LoginResponse>("/auth/login", {
    ...params,
  });

  return response?.data;
};

const register = async (params: RegisterRequest) => {
  const response = await baseQuery.post<RegisterResponse>("/auth/register", {
    ...params,
  });

  return response?.data;
};

const ping = async () => {
  const response = await baseQuery.get<LoginResponse>("/auth/ping");
  return response?.data;
};

export const AuthApi = {
  login,
  register,
  ping,
};
