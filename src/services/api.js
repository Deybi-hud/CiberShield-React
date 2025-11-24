 
const API_URL = 'http://localhost:8080/api/v1';

const getUserId = () => {
  const usuario = localStorage.getItem('usuario');
  return usuario ? JSON.parse(usuario).id : null;
};

const getHeaders = (isJson = true) => {
  const headers = {};
  const userId = getUserId();
  if (userId) headers['X-User-Id'] = userId;
  if (isJson) headers['Content-Type'] = 'application/json';
  return headers;
};

export const api = {
  get: (url) => fetch(`${API_URL}${url}`, { headers: getHeaders() }),
  post: (url, body) => fetch(`${API_URL}${url}`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(body)
  }),
  put: (url, body) => fetch(`${API_URL}${url}`, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify(body)
  }),
  delete: (url) => fetch(`${API_URL}${url}`, {
    method: 'DELETE',
    headers: getHeaders()
  }),
 
  upload: (url, formData) => fetch(`${API_URL}${url}`, {
    method: 'PUT',
    headers: { 'X-User-Id': getUserId() },
    body: formData
  })
};