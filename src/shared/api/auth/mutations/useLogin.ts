import { useMutation } from "@tanstack/react-query";
import { LoginRequest, LoginResponse } from "../models";
import { AuthService } from "../AuthService";
import { QUERY_KEYS } from "../queryKeys";
import { AxiosError } from "axios";

export const signInMutationFnAuthService = async (params: LoginRequest) => {
  const response = await AuthService.login(params);

  return response?.data;
};

export const useSignInMutationAuthService = () => {
  return useMutation<LoginResponse, typeof AxiosError, LoginRequest>({
    mutationFn: signInMutationFnAuthService,
    mutationKey: QUERY_KEYS.LOGIN,
  });
};