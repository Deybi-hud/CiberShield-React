import axiosInstance from "../../config/axiosInstance";

const API_URL = "https://snake-pc-api.onrender.com/api/v1/pagos";

class PagoService {
    
    getAll() {
        const user = JSON.parse(localStorage.getItem('user'));
        return axiosInstance.get(`${API_URL}/${user?.id}`);
    }

    getById(id) {
        return axiosInstance.get(`${API_URL}/${id}`);
    }

    crear(pago) {
        const user = JSON.parse(localStorage.getItem('user'));
        return axiosInstance.post(API_URL, { ...pago, usuarioId: user?.id });
    }

    actualizar(id, pago) {
        return axiosInstance.put(`${API_URL}/${id}`, pago);
    }
}

export default new PagoService();
