import { MMKV } from "react-native-mmkv";
import { immer } from "zustand/middleware/immer";
import { UserState, UserStore } from "./user.types";
import { createStore } from "@/src/shared/lib/Zustand";

const persistStorage = new MMKV({
  id: 'USER',
});

const initialState: UserState = {
  user: {
    email: "",
    id: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
    name: "",
    role: "admin",
    avatar: undefined,
  },
};

export const useUserStore = createStore<UserStore>(
  immer((set) => ({
    ...initialState,
    setUser: (user) => {
      set((state) => {
        state.user = user;
      });
    },
  })),
  "AUTH_STORAGE",
  persistStorage
);
