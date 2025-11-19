import axios from "axios";

// Vite carga la variable del archivo .env
const BASE_URL = import.meta.env.VITE_API_URL;

class UserService {
    async login(usuario) {
        try {
            const response = await axios.post(`${BASE_URL}/usuarios/login`, usuario);
            return response.data;
        } catch (error) {
            console.error("Error en login:", error);
            throw error;
        }
    }

    async register(usuario) {
        try {
            const response = await axios.post(`${BASE_URL}/usuarios/registrar`, usuario);
            return response.data;
        } catch (error) {
            console.error("Error en registro:", error);
            throw error;
        }
    }
}

export default new UserService();