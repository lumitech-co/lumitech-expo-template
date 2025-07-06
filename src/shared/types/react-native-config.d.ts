import { z } from 'zod';
import { envSchema } from 'lib';

declare module 'expo-constants' {
  interface AppManifest {
    extra?: z.infer<typeof envSchema>;
  }
}
