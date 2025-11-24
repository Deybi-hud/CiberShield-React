
import { api } from '../api';

export const perfilService = {
  getPerfil: () => api.get('/perfiles/perfil'),
  updatePerfil: (data) => api.put('/perfiles/perfil', data)
};