import { observable } from "@legendapp/state";
import { ObservablePersistMMKV } from "@legendapp/state/persist-plugins/mmkv";
import { syncObservable } from "@legendapp/state/sync";
import { Authentication, AuthState, User } from "../auth.types";

const initialState: AuthState = {
  user: {
    email: "",
  id: "",
  firstName: "",
  },
  authentication: {
    accessToken: '',
    refreshToken: ''
  }
};

export const authStore$ = observable(initialState);

export const useAuthStore = () => {
  const resetUserStorePersist = async () => {
    authStore$.set(initialState);
  };

  const setUser = (user: User) => {
    authStore$.user.set(user);
  };

  const setToken = (token: Authentication) => {
    authStore$.authentication.set(token);
  };

  return {
    resetUserStorePersist,
    setUser,
    setToken,
  };
};

syncObservable(authStore$, {
  persist: {
    name: "AUTH",
    plugin: ObservablePersistMMKV,
  },
});
