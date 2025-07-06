import { MMKV } from 'react-native-mmkv';
import { immer } from 'zustand/middleware/immer';
import { Authentication, AuthState, AuthStore } from '../auth.types';
import { createStore } from '@/src/shared/lib/Zustand';

const persistStorage = new MMKV({
  id: 'AUTH',
});

const initialState: AuthState = {
  authentication: {
    accessToken: '',
    refreshToken: '',
  },
};

export const useAuthStore = createStore<AuthStore>(
  immer(set => ({
    ...initialState,
    setTokens: (tokens: Authentication) => {
      set(state => {
        state.authentication = tokens;
      });
    },
  })),
  'AUTH_STORAGE',
  persistStorage,
);
