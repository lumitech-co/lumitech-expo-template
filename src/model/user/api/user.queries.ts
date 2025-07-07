import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { QUERY_KEYS } from "./queryKeys";
import { UserApi } from "./user.api";
import {
  GetUserResponse,
  GetUsersRequest,
  GetUsersResponse,
} from "../user.types";

export const useGetCurrentUserQuery = () => {
  return useQuery<GetUserResponse, AxiosError>({
    queryFn: UserApi.getUser,
    queryKey: QUERY_KEYS.GET_CURRENT_USER,
  });
};

export const useGetUserByIdQuery = (id: string) => {
  return useQuery<GetUserResponse, AxiosError>({
    queryFn: () => UserApi.getUserById(id),
    queryKey: QUERY_KEYS.GET_USER_BY_ID(id),
    enabled: !!id,
  });
};

export const useGetUsersQuery = (params: GetUsersRequest = {}) => {
  return useQuery<GetUsersResponse, AxiosError>({
    queryFn: () => UserApi.getUsers(params),
    queryKey: QUERY_KEYS.GET_USERS(params),
  });
};
