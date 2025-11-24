import axiosInstance from "../../config/axiosInstance";

const API_URL = "https://snake-pc-api.onrender.com/api/v1/admin/dashboards";

class DashboardService {
    
    obtenerEstadisticas() {
        return axiosInstance.get(API_URL);
    }

    obtenerVentas() {
        return axiosInstance.get(`${API_URL}/ventas`);
    }

    obtenerProductosMasVendidos() {
        return axiosInstance.get(`${API_URL}/productos-mas-vendidos`);
    }

    obtenerUsuariosRegistrados() {
        return axiosInstance.get(`${API_URL}/usuarios-registrados`);
    }
}

export default new DashboardService();
