import axios from "axios";

const API_URL = "https://snake-pc-api.onrender.com/api/v1/admin/ubicaciones";

class AdminUbicacionService {
    
    getAll() {
        return axios.get(API_URL);
    }

    getById(id) {
        return axios.get(`${API_URL}/${id}`);
    }

    crear(ubicacion) {
        return axios.post(API_URL, ubicacion);
    }

    actualizar(id, ubicacion) {
        return axios.put(`${API_URL}/${id}`, ubicacion);
    }

    eliminar(id) {
        return axios.delete(`${API_URL}/${id}`);
    }
}

export default new AdminUbicacionService();
