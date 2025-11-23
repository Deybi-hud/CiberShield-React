import axios from "axios";

const API_URL = "https://snake-pc-api.onrender.com/api/v1/admin/usuarios";

class AdminUsuarioService {
    
    getAll() {
        return axios.get(API_URL);
    }

    getById(id) {
        return axios.get(`${API_URL}/${id}`);
    }

    actualizar(id, usuario) {
        return axios.put(`${API_URL}/${id}`, usuario);
    }

    eliminar(id) {
        return axios.delete(`${API_URL}/${id}`);
    }

    cambiarRol(id, rolData) {
        return axios.patch(`${API_URL}/${id}/rol`, rolData);
    }
}

export default new AdminUsuarioService();
