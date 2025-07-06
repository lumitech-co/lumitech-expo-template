import * as SecureStore from 'expo-secure-store';
import { StorageKey } from './models';

export const SecureStorageService = {
  setItem: async (key: StorageKey, value: string) => {
    await SecureStore.setItemAsync(key, value);
    return true;
  },
  getItem: async (key: StorageKey) => {
    const value = await SecureStore.getItemAsync(key);
    return value;
  },
  removeItem: async (key: StorageKey) => {
    await SecureStore.deleteItemAsync(key);
  },
  removeAllItems: async () => {
    // Note: expo-secure-store doesn't have a clear all method
    // You'd need to track keys and remove them individually
    console.warn('SecureStorageService: removeAllItems not implemented');
  },
};