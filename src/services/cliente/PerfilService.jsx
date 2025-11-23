import axios from "axios";

const API_URL = "https://snake-pc-api.onrender.com/api/v1/perfil";

class PerfilService {
    
    obtenerPerfil() {
        return axios.get(`${API_URL}/perfil`);
    }

    actualizarPerfil(datos) {
        return axios.put(`${API_URL}/perfil`, datos);
    }

    cambiarContrasena(contrasenaActual, contrasenaNueva) {
        return axios.put(`${API_URL}/cambiar-contrasena`, {
            contrasenaActual,
            contrasenaNueva
        });
    }

    desactivarCuenta() {
        return axios.put(`${API_URL}/desactivar-cuenta`);
    }

    reactivarCuenta() {
        return axios.put(`${API_URL}/reactivar-cuenta`);
    }
}

export default new PerfilService();
