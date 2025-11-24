import axiosInstance from "../../config/axiosInstance";

const API_URL = "https://snake-pc-api.onrender.com/api/v1/admin/ubicaciones";

class AdminUbicacionService {
    
    getAll() {
        return axiosInstance.get(API_URL);
    }

    getById(id) {
        return axiosInstance.get(`${API_URL}/${id}`);
    }

    crear(ubicacion) {
        return axiosInstance.post(API_URL, ubicacion);
    }

    actualizar(id, ubicacion) {
        return axiosInstance.put(`${API_URL}/${id}`, ubicacion);
    }

    eliminar(id) {
        return axiosInstance.delete(`${API_URL}/${id}`);
    }
}

export default new AdminUbicacionService();
