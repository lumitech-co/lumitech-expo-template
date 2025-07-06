import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { UserService } from "./user.api";
import {
  CreateUserResponse,
  CreateUserRequest,
  UpdateUserResponse,
  UpdateUserRequest,
  DeleteUserResponse,
} from "../user.types";

export const useCreateUserMutation = () => {
  return useMutation<CreateUserResponse, AxiosError, CreateUserRequest>({
    mutationFn: UserService.createUser,
  });
};

export const useUpdateUserMutation = () => {
  return useMutation<
    UpdateUserResponse,
    AxiosError,
    { id: number; data: UpdateUserRequest }
  >({
    mutationFn: ({ id, data }) => UserService.updateUser(id, data),
  });
};

export const useUpdateCurrentUserMutation = () => {
  return useMutation<UpdateUserResponse, AxiosError, UpdateUserRequest>({
    mutationFn: UserService.updateCurrentUser,
  });
};

export const useDeleteUserMutation = () => {
  return useMutation<DeleteUserResponse, AxiosError, number>({
    mutationFn: UserService.deleteUser,
  });
};

export const useDeleteCurrentUserMutation = () => {
  return useMutation<DeleteUserResponse, AxiosError, void>({
    mutationFn: UserService.deleteCurrentUser,
  });
};
