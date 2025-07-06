export const QUERY_KEYS = {
  GET_CURRENT_USER: ["user", "current"],
  GET_USER_BY_ID: (id: string) => ["user", "byId", id],
  GET_USERS: (params?: { page?: number; limit?: number; search?: string; role?: string }) => [
    "users",
    "list",
    { 
      page: params?.page || 1, 
      limit: params?.limit || 10, 
      search: params?.search || '', 
      role: params?.role || '' 
    },
  ],
};
