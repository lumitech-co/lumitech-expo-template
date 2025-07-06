import { createSelectors } from '../lib';
import { useAuthStore } from './store';

export const useAuthStoreSelectors = createSelectors(useAuthStore);

export const useSelectUserSelector = () =>
  useAuthStoreSelectors(state => state.user);

export const useSelectUserId = () =>
  useAuthStoreSelectors(state => state.user.id);

export const useSelectAuthentication = () =>
  useAuthStoreSelectors(state => state.authentication);
