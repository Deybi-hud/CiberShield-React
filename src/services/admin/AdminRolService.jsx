import axiosInstance from "../../config/axiosInstance";

const API_URL = "https://snake-pc-api.onrender.com/api/v1/admin/roles";

class AdminRolService {
    
    getAll() {
        return axiosInstance.get(API_URL);
    }

    getById(id) {
        return axiosInstance.get(`${API_URL}/${id}`);
    }

    crear(rol) {
        return axiosInstance.post(API_URL, rol);
    }

    actualizar(id, rol) {
        return axiosInstance.put(`${API_URL}/${id}`, rol);
    }

    eliminar(id) {
        return axiosInstance.delete(`${API_URL}/${id}`);
    }
}

export default new AdminRolService();
