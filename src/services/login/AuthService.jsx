import axios from "axios";

const API_URL = "https://snake-pc-api.onrender.com/api/v1/auths";

class AuthService {
    
    login(usuario) {
        return axios.post(`${API_URL}/login`, usuario);
    }

    registrar(usuario, confirmarContrasena) {
        return axios.post(`${API_URL}/registrar`, usuario, {
            params: {
                confirmarContrasena: confirmarContrasena
            }
        });
    }
}

export default new AuthService();
