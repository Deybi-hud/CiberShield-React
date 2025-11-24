import axiosInstance from "../../config/axiosInstance";

const API_URL = "https://snake-pc-api.onrender.com/api/v1/admin/usuarios";

class AdminUsuarioService {
    
    getAll() {
        return axiosInstance.get(API_URL);
    }

    getById(id) {
        return axiosInstance.get(`${API_URL}/${id}`);
    }

    actualizar(id, usuario) {
        return axiosInstance.put(`${API_URL}/${id}`, usuario);
    }

    eliminar(id) {
        return axiosInstance.delete(`${API_URL}/${id}`);
    }

    cambiarRol(id, rolData) {
        return axiosInstance.patch(`${API_URL}/${id}/rol`, rolData);
    }
}

export default new AdminUsuarioService();
