import axiosInstance from "../../config/axiosInstance";

const API_URL = "https://snake-pc-api.onrender.com/api/v1/pedidos";

class PedidoService {
    
    getAll() {
        const user = JSON.parse(localStorage.getItem('user'));
        return axiosInstance.get(`${API_URL}/${user?.id}`);
    }

    getById(id) {
        return axiosInstance.get(`${API_URL}/${id}`);
    }

    crear(pedido) {
        const user = JSON.parse(localStorage.getItem('user'));
        return axiosInstance.post(API_URL, { ...pedido, usuarioId: user?.id });
    }

    actualizar(id, pedido) {
        return axiosInstance.put(`${API_URL}/${id}`, pedido);
    }

    eliminar(id) {
        return axiosInstance.delete(`${API_URL}/${id}`);
    }
}

export default new PedidoService();
