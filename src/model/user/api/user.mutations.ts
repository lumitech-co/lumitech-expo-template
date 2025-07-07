import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { UserApi } from "./user.api";
import {
  CreateUserResponse,
  CreateUserRequest,
  UpdateUserResponse,
  UpdateUserRequest,
  DeleteUserResponse,
} from "../user.types";

export const useCreateUserMutation = () => {
  return useMutation<CreateUserResponse, AxiosError, CreateUserRequest>({
    mutationFn: UserApi.createUser,
  });
};

export const useUpdateUserMutation = () => {
  return useMutation<
    UpdateUserResponse,
    AxiosError,
    { id: number; data: UpdateUserRequest }
  >({
    mutationFn: ({ id, data }) => UserApi.updateUser(id, data),
  });
};

export const useUpdateCurrentUserMutation = () => {
  return useMutation<UpdateUserResponse, AxiosError, UpdateUserRequest>({
    mutationFn: UserApi.updateCurrentUser,
  });
};

export const useDeleteUserMutation = () => {
  return useMutation<DeleteUserResponse, AxiosError, number>({
    mutationFn: UserApi.deleteUser,
  });
};

export const useDeleteCurrentUserMutation = () => {
  return useMutation<DeleteUserResponse, AxiosError, void>({
    mutationFn: UserApi.deleteCurrentUser,
  });
};
