import axios from "axios";

const API_URL = "https://snake-pc-api.onrender.com/api/v1/admin/pedidos";

class AdminPedidoService {
    
    getAll() {
        return axios.get(API_URL);
    }

    getById(id) {
        return axios.get(`${API_URL}/${id}`);
    }

    actualizar(id, pedido) {
        return axios.put(`${API_URL}/${id}`, pedido);
    }

    eliminar(id) {
        return axios.delete(`${API_URL}/${id}`);
    }
}

export default new AdminPedidoService();
