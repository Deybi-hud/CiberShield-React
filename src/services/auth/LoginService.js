 
import { API_BASE_URL } from '../../config/apiConfig';

export const loginService = {
  login: async (correo, contrasena) => {
    const res = await fetch(`${API_BASE_URL}/auths/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ correo, contrasena })
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Credenciales incorrectas');
    }
    return res;
  },

  register: async (data, confirmarContrasena) => {
    const res = await fetch(
      `${API_BASE_URL}/auths/registrar?confirmarContrasena=${encodeURIComponent(confirmarContrasena)}`,
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
    return res;
  }
};