import axios from "axios";

const API_URL = 'https://snake-pc-api.onrender.com/api/v1/productos';


class ProductosService {

    async getAll() {
        try {
            const response = await axios.get(`${API_URL}/productos`);
        } catch (error) {
            console.error("ERROR --> al obtener un producto: ", error);
            throw error;
        }
    }

    async getById(id) {
        try {

        } catch (error) {
            console.error("Error --> al obtener un producto", error)
            throw error;
        }
    }
}


export default new ProductosService();