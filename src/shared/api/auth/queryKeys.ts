export const QUERY_KEYS = {
  LOGIN: ["login"],
  GET_USER: ["auth", "user"],
  GET_USER_BY_ID: (id: string) => ["auth", "user", id],
  GET_USERS: (params: { page: number; limit: number; search: string }) => [
    "auth",
    "users",
    { page: params.page, limit: params.limit, search: params.search },
  ],
} as const;
