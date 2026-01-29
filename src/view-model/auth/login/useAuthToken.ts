import { useSelectToken } from "model";

export const useAuthToken = () => {
  const token = useSelectToken();

  return token;
};
