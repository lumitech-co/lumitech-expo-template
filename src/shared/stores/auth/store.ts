import { createMMKV } from "react-native-mmkv";
import { immer } from "zustand/middleware/immer";

import { createStore } from "../lib";
import { PersistStorageKeys } from "../models";
import { AuthState, AuthStore } from "./types";

const AUTH_ENCRYPTION_KEY = "your-encryption-key-min-16-chars";

const persistStorage = createMMKV({
  id: PersistStorageKeys.AUTH,
  encryptionKey: AUTH_ENCRYPTION_KEY,
});

const initialState: AuthState = {
  user: {
    email: "",
    id: "",
    firstName: "",
  },
  authentication: {
    accessToken: "",
    refreshToken: "",
  },
};

export const useAuthStore = createStore<AuthStore>(
  immer(set => ({
    ...initialState,
    setUser: user => {
      set(state => {
        state.user = user;
      });
    },
    setToken: token => {
      set(state => {
        state.authentication = token;
      });
    },
    resetUserStorePersist: () => {
      set(state => {
        state.user = initialState.user;
        state.authentication = initialState.authentication;
      });
    },
  })),
  PersistStorageKeys.AUTH,
  persistStorage,
);
