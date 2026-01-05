import {
  authStore,
  getInitialAuthState,
  resetAuthStore,
  type Authentication,
  type User,
} from "lib";

export { authStore };

export const useAuthStore = () => {
  const resetUserStorePersist = () => {
    resetAuthStore();
  };

  const setUser = (user: User) => {
    authStore.user.set(user);
  };

  const setToken = (token: Authentication) => {
    authStore.authentication.set(token);
  };

  return {
    resetUserStorePersist,
    setUser,
    setToken,
  };
};

export { getInitialAuthState };
