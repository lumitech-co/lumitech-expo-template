import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      gcTime: 1000 * 60 * 5,
    },
    queries: {
      gcTime: 1000 * 60 * 5,
    },
  },
});
