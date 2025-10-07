import { useSelectToken } from 'model';
import axios, { AxiosError } from 'axios';
import { ExceptionService } from 'services';

const API_URL = process.env.EXPO_PUBLIC_API_URL;;

const baseQuery = axios.create({
  baseURL: API_URL,
});

baseQuery.interceptors.request.use(config => {
  const token = useSelectToken()

  if (token) {
    config.headers.Authorization = `Bearer ${
      token
    }`;
  }

  return config;
});

baseQuery.interceptors.response.use(
  response => response,
  async (error: AxiosError) => {
    const token = useSelectToken()

    if (token && error?.response?.status === 401) {
      ExceptionService.errorResolver(error);

      // resetAllStores();
    }

    return Promise.reject(error);
  },
);

export { baseQuery };
