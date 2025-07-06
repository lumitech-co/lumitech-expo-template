/* eslint-disable no-console */
import Constants from 'expo-constants';
import { z } from 'zod';
import { isDev } from './General';

export const envSchema = z.object({
  API_URL: z.string(),
});

const Config = Constants.expoConfig?.extra || {};

export const parseEnv = () => {
  if (!isDev) {
    return;
  }

  try {
    envSchema.parse(Config);
  } catch (error) {
    console.warn(error);
  }
};

export { Config };
