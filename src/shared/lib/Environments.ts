/* eslint-disable no-console */
import { z } from 'zod';
import { isDev } from './General';

export const envSchema = z.object({
  API_URL: z.string(),
});

const Config = {
  API_URL: process.env.EXPO_PUBLIC_API_URL || '',
};

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
