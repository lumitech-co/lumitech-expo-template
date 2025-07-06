import { createSelectors } from "lib/Zustand";
import { useUserStore } from "./user.store";

export const useUserStoreSelectors = createSelectors(useUserStore);

export const useSelectUser = () => useUserStoreSelectors((state) => state.user);

export const useSelectUserId = () =>
  useUserStoreSelectors((state) => state.user.id);
