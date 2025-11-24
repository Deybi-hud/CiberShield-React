import axiosInstance from "../../config/axiosInstance";

const API_URL = "https://snake-pc-api.onrender.com/api/v1/admin/productos";

class AdminProductoService {
    
    getAll() {
        return axiosInstance.get(API_URL);
    }

    getById(id) {
        return axiosInstance.get(`${API_URL}/${id}`);
    }

    crear(producto) {
        return axiosInstance.post(API_URL, producto);
    }

    actualizar(id, producto) {
        return axiosInstance.put(`${API_URL}/${id}`, producto);
    }

    eliminar(id) {
        return axiosInstance.delete(`${API_URL}/${id}`);
    }
}

export default new AdminProductoService();
