 
import { API_BASE_URL } from '../config/apiConfig';

const getUserId = () => {
  const usuario = localStorage.getItem('usuario');
  return usuario ? JSON.parse(usuario).id : null;
};

const getHeaders = (isJson = true) => {
  const headers = {};
  const userId = getUserId();
  if (userId) headers['X-User-Id'] = userId.toString();
  if (isJson) headers['Content-Type'] = 'application/json';
  return headers;
};

export const api = {
  get: (url) => fetch(`${API_BASE_URL}${url}`, { headers: getHeaders() }),
  post: (url, body) => fetch(`${API_BASE_URL}${url}`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(body)
  }),
  put: (url, body) => fetch(`${API_BASE_URL}${url}`, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify(body)
  }),
  delete: (url) => fetch(`${API_BASE_URL}${url}`, {
    method: 'DELETE',
    headers: getHeaders()
  })
};