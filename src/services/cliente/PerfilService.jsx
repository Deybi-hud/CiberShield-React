import axiosInstance from "../../config/axiosInstance";

const API_URL = "https://snake-pc-api.onrender.com/api/v1/perfiles";

class PerfilService {
    
    obtenerPerfil() {
        const user = JSON.parse(localStorage.getItem('user'));
        return axiosInstance.get(`${API_URL}/${user?.id}`);
    }

    actualizarPerfil(datos) {
        const user = JSON.parse(localStorage.getItem('user'));
        return axiosInstance.put(`${API_URL}/${user?.id}`, datos);
    }

    cambiarContrasena(contrasenaActual, contrasenaNueva) {
        const user = JSON.parse(localStorage.getItem('user'));
        return axiosInstance.put(`${API_URL}/cambiar-contrasena/${user?.id}`, {
            contrasenaActual,
            contrasenaNueva
        });
    }

    desactivarCuenta() {
        const user = JSON.parse(localStorage.getItem('user'));
        return axiosInstance.put(`${API_URL}/desactivar-cuenta/${user?.id}`);
    }

    reactivarCuenta() {
        const user = JSON.parse(localStorage.getItem('user'));
        return axiosInstance.put(`${API_URL}/reactivar-cuenta/${user?.id}`);
    }
}

export default new PerfilService();
