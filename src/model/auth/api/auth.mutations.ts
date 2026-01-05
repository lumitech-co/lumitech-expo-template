import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { AuthApi } from "./auth.api";
import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
} from "../auth.types";

export const useSignInMutation = () => {
  return useMutation<LoginResponse, AxiosError, LoginRequest>({
    mutationFn: AuthApi.login,
  });
};

export const useSignUpMutation = () => {
  return useMutation<RegisterResponse, AxiosError, RegisterRequest>({
    mutationFn: AuthApi.register,
  });
};
