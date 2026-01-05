import { use$ } from "@legendapp/state/react";

import { authStore } from "./auth.store";

export const useSelectUserStore = () => {
  return authStore;
};

export const useSelectUserId = () => {
  return use$(authStore.user.id);
};

export const useSelectToken = () => {
  return authStore.authentication.accessToken.get();
};

export const useSelectUser = () => {
  return use$(authStore.user);
};
