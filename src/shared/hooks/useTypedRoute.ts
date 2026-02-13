import { useLocalSearchParams } from "expo-router";
import { RootStackParamList } from "services";

export const useTypedRoute = <T extends keyof RootStackParamList>(): RootStackParamList[T] => {
  const params = useLocalSearchParams();

  return params as unknown as RootStackParamList[T];
};
