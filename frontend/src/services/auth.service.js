import api from './api';


export async function registerUser({ name, email, password, userType }) {
  const response = await api.post('/auth/register', {
    name,
    email,
    password,
    userType,
  });

  return response.data;
}


export async function loginUser({ email, password }) {
  const response = await api.post('/auth/login', {
    email,
    password,
  });

  return response.data;
}


export async function refreshAccessToken(refreshToken) {
  const response = await api.post('/auth/refresh', {
    refreshToken,
  });

  return response.data;
}


export async function logoutUser(refreshToken) {
  const response = await api.post('/auth/logout', {
    refreshToken,
  });

  return response.data;
}
