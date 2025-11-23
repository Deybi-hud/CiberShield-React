import axios from "axios";

const API_URL = 'https://snake-pc-api.onrender.com/api/v1/ubicaciones';

class UbicacionService {
    
    getAll() {
        return axios.get(API_URL);
    }

    getById(id) {
        return axios.get(`${API_URL}/${id}`);
    }
}

export default new UbicacionService();
