import axios from "axios";

const API_URL = 'https://snake-pc-api.onrender.com/api/v1/productos';

class PedidoService {

    async crearPedido(productosCarrito, correoUsuario) {
        const productosMap = {};
        productosCarrito.forEach(prod => {
            productosMap[prod.id] = prod.cantidad;
        });

        try {
            const response = await axios.post(
                `${BASE_URL}/pedidos/crear`,
                productosMap,
                { params: { correo: correoUsuario } }
            );
            return response.data;
        } catch (error) {
            console.error("Error creando pedido:", error);
            throw error;
        }
    }

    async getMisPedidos(correoUsuario) {
        try {
            const response = await axios.get(`${BASE_URL}/pedidos/mis-pedidos`, {
                params: { correo: correoUsuario }
            });
            return response.data;
        } catch (error) {
            console.error("Error obteniendo pedidos:", error);
            throw error;
        }
    }

    async pagarPedido(pedidoId, correoUsuario, metodoPagoId) {
        try {
            const response = await axios.post(
                `${BASE_URL}/pedidos/${pedidoId}/pagar`,
                null,
                {
                    params: {
                        correo: correoUsuario,
                        metodoPagoId: metodoPagoId
                    }
                }
            );
            return response.data;
        } catch (error) {
            console.error("Error pagando pedido:", error);
            throw error;
        }
    }
}

export default new PedidoService();