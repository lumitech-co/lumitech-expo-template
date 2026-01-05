import { resetAuthStore } from "./authStore";

export { authStorage, authStore, getInitialAuthState, resetAuthStore } from "./authStore";
export type { Authentication, AuthState, User } from "./authStore";

export const resetAllStores = () => {
  resetAuthStore();
};
