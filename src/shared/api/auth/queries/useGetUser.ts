import { useQuery } from "@tanstack/react-query";
import { LoginResponse } from "../models";
import { AuthService } from "../AuthService";
import { QUERY_KEYS } from "../queryKeys";
import { AxiosError } from "axios";

export const getUserQueryFnAuthService = async () => {
  const response = await AuthService.getUser();
  return response?.data;
};

export const useGetUserQueryAuthService = () => {
  return useQuery<LoginResponse, typeof AxiosError>({
    queryFn: getUserQueryFnAuthService,
    queryKey: QUERY_KEYS.GET_USER,
  });
};