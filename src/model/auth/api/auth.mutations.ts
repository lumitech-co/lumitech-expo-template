import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { AuthService } from "./auth.api";
import { LoginRequest, LoginResponse } from "../auth.types";

export const useSignInMutationAuthService = () => {
  return useMutation<LoginResponse, typeof AxiosError, LoginRequest>({
    mutationFn: AuthService.login,
  });
};
