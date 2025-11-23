import axios from "axios";

const API_URL = 'https://snake-pc-api.onrender.com/api/v1/productos';

class ProductoService {
    
    getAll() {
        return axios.get(API_URL);
    }

    getById(id) {
        return axios.get(`${API_URL}/${id}`);
    }

    getCategorias() {
        return axios.get(`${API_URL}/categorias`);
    }
}

export default new ProductoService();
