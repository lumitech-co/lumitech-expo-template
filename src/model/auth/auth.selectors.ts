import { createSelectors } from '@/src/shared/lib/Zustand';
import { useAuthStore } from './auth.store';

export const useAuthStoreSelectors = createSelectors(useAuthStore);

export const useSelectAuthentication = () =>
  useAuthStoreSelectors(state => state.authentication);
