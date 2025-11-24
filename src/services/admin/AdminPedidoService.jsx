import axiosInstance from "../../config/axiosInstance";

const API_URL = "https://snake-pc-api.onrender.com/api/v1/admin/pedidos";

class AdminPedidoService {
    
    getAll() {
        return axiosInstance.get(API_URL);
    }

    getById(id) {
        return axiosInstance.get(`${API_URL}/${id}`);
    }

    actualizar(id, pedido) {
        return axiosInstance.put(`${API_URL}/${id}`, pedido);
    }

    eliminar(id) {
        return axiosInstance.delete(`${API_URL}/${id}`);
    }
}

export default new AdminPedidoService();
