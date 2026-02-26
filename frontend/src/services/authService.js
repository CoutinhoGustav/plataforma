import { request } from './api.js';

export const authService = {
  login: async (email, password) => {
    const response = await request({
      method: 'POST',
      url: '/auth/login',
      data: { email, password },
    });

    if (response.data.token) {
      sessionStorage.setItem('authToken', response.data.token);
      sessionStorage.setItem('user', JSON.stringify(response.data.user));
    }

    return response.data;
  },

  logout: () => {
    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('user');
  },

  register: async (userData) => {
    const response = await request({
      method: 'POST',
      url: '/auth/register',
      data: userData,
    });
    return response.data;
  },

  getProfile: async () => {
    const response = await request({
      method: 'GET',
      url: '/auth/profile',
    });
    return response.data;
  },

  updateProfile: async (userData) => {
    const response = await request({
      method: 'PATCH',
      url: '/auth/profile',
      data: userData,
    });
    return response.data;
  },
};

export default authService;
