export interface User {
  email: string;
  id: string;
  firstName: string;
}

export interface Authentication {
  accessToken: string;
  refreshToken: string;
}

export interface AuthState {
  user: User;
  authentication: Authentication;
}

export interface AuthStore extends AuthState {
  setUser: (user: User) => void;
  setToken: (token: Authentication) => void;
  resetUserStorePersist: () => void;
}
