import axios from "axios";

const API_URL = "https://snake-pc-api.onrender.com/api/v1/pedidos";

class PedidoService {
    
    getAll() {
        return axios.get(API_URL);
    }

    getById(id) {
        return axios.get(`${API_URL}/${id}`);
    }

    crear(pedido) {
        return axios.post(API_URL, pedido);
    }

    actualizar(id, pedido) {
        return axios.put(`${API_URL}/${id}`, pedido);
    }

    eliminar(id) {
        return axios.delete(`${API_URL}/${id}`);
    }
}

export default new PedidoService();
