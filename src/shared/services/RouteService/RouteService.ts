import { router } from 'expo-router';
import { Routes } from './models/Routes';
import { RouteType } from './models/RootStackParamList';

const navigate = (name: RouteType, params?: any) => {
  const path = Routes[name];
  
  if (params) {
    router.push({ pathname: path, params });
  } else {
    router.push(path);
  }
};

const openDrawer = () => {
  // Drawer functionality not implemented in current setup
};

const closeDrawer = () => {
  // Drawer functionality not implemented in current setup
};

const goBack = () => {
  if (router.canGoBack()) {
    router.back();
  }
};

const pop = (screenCount?: number) => {
  // Multiple pops not directly supported, use goBack
  if (router.canGoBack()) {
    router.back();
  }
};

const popToTop = () => {
  // Navigate to root
  router.push(Routes.ALERTS);
};

const push = (name: RouteType, params?: any) => {
  navigate(name, params);
};

const setParams = (params: object) => {
  router.setParams(params);
};

const replace = (name: RouteType, params?: any) => {
  const path = Routes[name];
  
  if (params) {
    router.replace({ pathname: path, params });
  } else {
    router.replace(path);
  }
};

const reset = (name: RouteType, params?: any) => {
  // Reset to specific route
  replace(name, params);
};

const navigateToNestedNavigatorScreen = (
  screen: RouteType,
  params?: any
) => {
  // For nested navigation, navigate directly to the screen
  navigate(screen, params);
};

export const RouteService = {
  navigate,
  goBack,
  pop,
  popToTop,
  push,
  reset,
  replace,
  openDrawer,
  closeDrawer,
  setParams,
  navigateToNestedNavigatorScreen,
};
