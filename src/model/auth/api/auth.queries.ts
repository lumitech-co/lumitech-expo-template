import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { AuthApi } from "./auth.api";
import { QUERY_KEYS } from "./queryKeys";
import { LoginResponse } from "../auth.types";

export const useHealthCheck = () => {
  return useQuery<LoginResponse, typeof AxiosError>({
    queryFn: AuthApi.ping,
    queryKey: QUERY_KEYS.HEALTHCHECK,
  });
};
