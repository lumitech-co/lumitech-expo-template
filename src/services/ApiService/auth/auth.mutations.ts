import { LoginRequest, LoginResponse } from "models";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { AuthService } from "./auth.api";

export const useSignInMutationAuthService = () => {
  return useMutation<LoginResponse, typeof AxiosError, LoginRequest>({
    mutationFn: AuthService.login,
  });
};