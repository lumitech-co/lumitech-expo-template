import { LoginResponse } from "@/src/model";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { AuthService } from "./auth.api";
import { QUERY_KEYS } from "./queryKeys";

export const useHealthCheck = () => {
  return useQuery<LoginResponse, typeof AxiosError>({
    queryFn: AuthService.ping,
    queryKey: QUERY_KEYS.HEALTHCHECK,
  });
};