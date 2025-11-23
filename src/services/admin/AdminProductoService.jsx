import axios from "axios";

const API_URL = "https://snake-pc-api.onrender.com/api/v1/admin/productos";

class AdminProductoService {
    
    getAll() {
        return axios.get(API_URL);
    }

    getById(id) {
        return axios.get(`${API_URL}/${id}`);
    }

    crear(producto) {
        return axios.post(API_URL, producto);
    }

    actualizar(id, producto) {
        return axios.put(`${API_URL}/${id}`, producto);
    }

    eliminar(id) {
        return axios.delete(`${API_URL}/${id}`);
    }
}

export default new AdminProductoService();
