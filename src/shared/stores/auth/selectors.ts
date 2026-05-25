import { createSelectors } from "../lib";
import { useAuthStore } from "./store";

export const useAuthStoreSelectors = createSelectors(useAuthStore);

export const useSelectUserStore = () => useAuthStoreSelectors(state => state);

export const useSelectUserId = () => useAuthStoreSelectors(state => state.user.id);

export const useSelectToken = () =>
  useAuthStoreSelectors(state => state.authentication.accessToken);

export const useSelectUser = () => useAuthStoreSelectors(state => state.user);
