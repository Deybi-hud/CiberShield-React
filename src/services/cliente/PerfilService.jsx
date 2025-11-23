import axios from "axios";

const API_URL = "https://snake-pc-api.onrender.com/api/v1/perfil";

class PerfilService {
    
    obtenerPerfil() {
        return axios.get(API_URL);
    }

    actualizarPerfil(id, datos) {
        return axios.put(`${API_URL}/${id}`, datos);
    }

    obtenerPorId(id) {
        return axios.get(`${API_URL}/${id}`);
    }
}

export default new PerfilService();
