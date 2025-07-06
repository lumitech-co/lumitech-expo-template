import { UpdateUserRequest, useSelectUserId, useUserStoreSelectors } from "@/src/model";
import { useMutationEvents, useUpdateUserMutation } from "@/src/services";
import {  } from "@/src/services";

export const useUpdateUser = () => {
  const updateUserMutation = useUpdateUserMutation();
  const setUser = useUserStoreSelectors.use.setUser();

  const onUpdateUser = async (user: UpdateUserRequest) => {
    await updateUserMutation.mutateAsync({
      id: useSelectUserId(),
      data: user,
    });
  };

  useMutationEvents(updateUserMutation, {
    onSuccess: (data) => {
      setUser(data.user);
    },
  });

  return {
    onUpdateUser,
    isPending: updateUserMutation.isPending,
  };
};
