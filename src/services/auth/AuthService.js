 
import { api } from '../api';

export const loginService = {
  login: async (correo, contrasena) => {
    const res = await api.post('/auths/login', { correo, contrasena });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Credenciales incorrectas');
    }
    return res.json();
  },

  register: async (data, confirmarContrasena) => {
    const res = await fetch(
      `http://localhost:8080/api/v1/auths/registrar?confirmarContrasena=${encodeURIComponent(confirmarContrasena)}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      }
    );
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Error al registrarse');
    }
    return res.json();
  }
};