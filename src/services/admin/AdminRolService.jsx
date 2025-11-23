import axios from "axios";

const API_URL = "https://snake-pc-api.onrender.com/api/v1/admin/roles";

class AdminRolService {
    
    getAll() {
        return axios.get(API_URL);
    }

    getById(id) {
        return axios.get(`${API_URL}/${id}`);
    }

    crear(rol) {
        return axios.post(API_URL, rol);
    }

    actualizar(id, rol) {
        return axios.put(`${API_URL}/${id}`, rol);
    }

    eliminar(id) {
        return axios.delete(`${API_URL}/${id}`);
    }
}

export default new AdminRolService();
