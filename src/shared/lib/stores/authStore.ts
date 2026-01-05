import { observable } from "@legendapp/state";
import { ObservablePersistMMKV } from "@legendapp/state/persist-plugins/mmkv";
import { syncObservable } from "@legendapp/state/sync";
import { MMKV } from "react-native-mmkv";

export interface User {
  email: string;
  id: string;
  firstName: string;
}

export interface Authentication {
  accessToken: string;
  refreshToken: string;
}

export interface AuthState {
  user: User;
  authentication: Authentication;
}

const AUTH_STORAGE_ID = "auth-storage";
const AUTH_ENCRYPTION_KEY = "your-encryption-key-min-16-chars";

export const authStorage = new MMKV({
  id: AUTH_STORAGE_ID,
  encryptionKey: AUTH_ENCRYPTION_KEY,
});

const initialAuthState: AuthState = {
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

export const authStore = observable<AuthState>(initialAuthState);

syncObservable(authStore, {
  persist: {
    name: "AUTH",
    plugin: ObservablePersistMMKV,
  },
});

export const resetAuthStore = () => {
  authStore.set(initialAuthState);
};

export const getInitialAuthState = () => initialAuthState;
