import { MMKV } from 'react-native-mmkv';
import { immer } from 'zustand/middleware/immer';
import { Authentication, State, User, UserStore } from './types';
import { PersistStorageKeys } from '../models';
import { createStore } from '../lib';

const persistStorage = new MMKV({
  id: PersistStorageKeys.AUTH,
});

const initialState: State = {
  authentication: {
    accessToken: '',
    refreshToken: '',
  },
  user: {
    email: null,
    id: 0,
  },
};

export const useAuthStore = createStore<UserStore>(
  immer(set => ({
    ...initialState,
    setUser: (user: User) =>
      set(state => {
        state.user = user;
      }),
    setTokens: (tokens: Authentication) => {
      set(state => {
        state.authentication = tokens;
      });
    },
  })),
  'AUTH_STORAGE',
  persistStorage,
);
