import { useLocalSearchParams } from 'expo-router';
import { RootStackParamList } from 'services';

export function useTypedRoute<T extends keyof RootStackParamList>(
  routeName: T
): RootStackParamList[T] {
  const params = useLocalSearchParams();
  return params as unknown as RootStackParamList[T];
}