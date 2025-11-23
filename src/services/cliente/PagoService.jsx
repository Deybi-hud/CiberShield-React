import axios from "axios";

const API_URL = "https://snake-pc-api.onrender.com/api/v1/pagos";

class PagoService {
    
    getAll() {
        return axios.get(API_URL);
    }

    getById(id) {
        return axios.get(`${API_URL}/${id}`);
    }

    crear(pago) {
        return axios.post(API_URL, pago);
    }

    actualizar(id, pago) {
        return axios.put(`${API_URL}/${id}`, pago);
    }
}

export default new PagoService();
