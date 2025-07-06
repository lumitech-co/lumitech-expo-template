import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { AuthService } from "./auth.api";
import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
} from "../auth.types";

export const useSignInMutationAuthService = () => {
  return useMutation<LoginResponse, typeof AxiosError, LoginRequest>({
    mutationFn: AuthService.login,
  });
};

export const useSignUpMutationAuthService = () => {
  return useMutation<RegisterResponse, typeof AxiosError, RegisterRequest>({
    mutationFn: AuthService.register,
  });
};
