 
import { api } from '../api';

export const pedidoService = {
  getMisPedidos: () => api.get('/cliente/pedidos'),
  getPedido: (id) => api.get(`/cliente/pedidos/${id}`),
  crear: (pedido) => api.post('/cliente/pedidos', pedido),
  pagar: (pedidoId, metodoPagoId) =>
    api.post(`/cliente/pedidos/${pedidoId}/pagar?metodoPagoId=${metodoPagoId}`),
  cancelar: (pedidoId) => api.put(`/cliente/pedidos/${pedidoId}/cancelar`)
};
 
import { api } from '../api';

export const perfilService = {
  getPerfil: () => api.get('/perfiles/perfil'),
  updatePerfil: (data) => api.put('/perfiles/perfil', data),
  cambiarPassword: (nueva, confirmar) => api.put('/perfiles/cambiar-contrasena', {
    nuevaContrasena: nueva,
    confirmarContrasena: confirmar
  }),
  subirFoto: (file) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.upload('/usuario/subir-foto', formData);
  },
  desactivarCuenta: () => api.put('/perfiles/desactivar-cuenta')
};