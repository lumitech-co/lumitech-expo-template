import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { authStore, resetAllStores } from "lib";
import { ExceptionService } from "services";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (error: Error) => void;
}> = [];

const processQueue = (error: Error | null, token: string | null = null) => {
  failedQueue.forEach(promise => {
    if (error) {
      promise.reject(error);
    } else if (token) {
      promise.resolve(token);
    }
  });

  failedQueue = [];
};

const baseQuery = axios.create({
  baseURL: API_URL,
});

baseQuery.interceptors.request.use(config => {
  const token = authStore.authentication.accessToken.get();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

baseQuery.interceptors.response.use(
  response => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    if (error?.response?.status === 401 && !originalRequest._retry) {
      const refreshToken = authStore.authentication.refreshToken.get();

      if (!refreshToken) {
        resetAllStores();
        return Promise.reject(error);
      }

      if (isRefreshing) {
        return new Promise<string>((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(token => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return baseQuery(originalRequest);
          })
          .catch(queueError => Promise.reject(queueError));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const response = await axios.post(`${API_URL}/auth/refresh`, {
          refreshToken,
        });

        const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
          response.data.authentication;

        authStore.authentication.set({
          accessToken: newAccessToken,
          refreshToken: newRefreshToken,
        });

        processQueue(null, newAccessToken);
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return baseQuery(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError as Error, null);
        ExceptionService.errorResolver(error);
        resetAllStores();

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);

export { baseQuery };
