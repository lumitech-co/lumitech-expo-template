import { useQuery } from "@tanstack/react-query";
import {  PaginationParams, PaginatedResponse } from "../models";
import { AuthService } from "../AuthService";
import { QUERY_KEYS } from "../queryKeys";
import { AxiosError } from "axios";
import { LoginResponse } from "../models";

export const getUsersQueryFnAuthService = async (params: PaginationParams) => {
  const response = await AuthService.getUsers(params);
  return response?.data;
};

export const useGetUsersQueryAuthService = (params: PaginationParams) => {
  return useQuery<PaginatedResponse<LoginResponse>, typeof AxiosError>({
    queryFn: () => getUsersQueryFnAuthService(params),
    queryKey: QUERY_KEYS.GET_USERS(params),
  });
};