import { useQuery } from "@tanstack/react-query";
import { LoginResponse } from "../models";
import { AuthService } from "../AuthService";
import { QUERY_KEYS } from "../queryKeys";
import { AxiosError } from "axios";

export const getUserByIdQueryFnAuthService = async (id: string) => {
  const response = await AuthService.getUserById(id);
  return response?.data;
};

export const useGetUserByIdQueryAuthService = (id: string) => {
  return useQuery<LoginResponse, typeof AxiosError>({
    queryFn: () => getUserByIdQueryFnAuthService(id),
    queryKey: QUERY_KEYS.GET_USER_BY_ID(id),
  });
};