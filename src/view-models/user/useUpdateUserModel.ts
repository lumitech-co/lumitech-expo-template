import {
  UpdateUserRequest,
  UpdateUserResponse,
  useSelectUserId,
  useUserStoreSelectors,
  useUpdateUserMutation,
} from "models";
import { useMutationEvents } from "api";

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
    onSuccess: (data: UpdateUserResponse) => {
      setUser(data.user);
    },
  });

  return {
    onUpdateUser,
    isPending: updateUserMutation.isPending,
  };
};
