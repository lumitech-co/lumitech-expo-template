import { useAuthStore } from 'models';
import { resetAllStores } from 'lib/Zustand';
import axios, { AxiosError } from 'axios';
import { ExceptionService } from 'services';

const API_URL = process.env.EXPO_PUBLIC_API_URL;;

const baseQuery = axios.create({
  baseURL: API_URL,
});

baseQuery.interceptors.request.use(config => {
  const { authentication } = useAuthStore.getState();

  if (authentication.accessToken) {
    config.headers.Authorization = `Bearer ${
      authentication.accessToken
    }`;
  }

  return config;
});

baseQuery.interceptors.response.use(
  response => response,
  async (error: AxiosError) => {
    const { authentication } = useAuthStore.getState();

    if (authentication.accessToken && error?.response?.status === 401) {
      ExceptionService.errorResolver(error);

      resetAllStores();
    }

    return Promise.reject(error);
  },
);

export { baseQuery };
