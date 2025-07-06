import { Routes } from './Routes';

export type RouteType = keyof typeof Routes;

export type RootStackParamList = {
  // Auth Routes
  AUTH: undefined;
  
  // Tab Routes
  ALERTS: undefined;
  PROFILE: undefined;

  // Common Routes
  NOT_FOUND: undefined;
};
