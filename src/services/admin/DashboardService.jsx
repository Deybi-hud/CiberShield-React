import axios from "axios";

const API_URL = "https://snake-pc-api.onrender.com/api/v1/admin/dashboards";

class DashboardService {
    
    obtenerEstadisticas() {
        return axios.get(API_URL);
    }

    obtenerVentas() {
        return axios.get(`${API_URL}/ventas`);
    }

    obtenerProductosMasVendidos() {
        return axios.get(`${API_URL}/productos-mas-vendidos`);
    }

    obtenerUsuariosRegistrados() {
        return axios.get(`${API_URL}/usuarios-registrados`);
    }
}

export default new DashboardService();
