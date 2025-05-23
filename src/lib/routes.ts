const API_ROUTES = {
  FETCH_USERS: '/api/proxy-users',
  CREATE_USER: '/api/users',
  UPDATE_USER: (id: number) => `/api/users/${id}`,
  DELETE_USER: (id: number) => `/api/users/${id}`,
};

export default API_ROUTES;
