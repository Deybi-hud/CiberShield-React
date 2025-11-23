import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Wrapper from "../components/templates/Wrapper";
import SidebarHome from "../components/organisms/SidebarHome";
import MainProductDetail from "../components/organisms/MainProductDetail";
import { useCarrito } from "../context/CarritoContext";
import ProductoService from "../services/publico/ProductoService";

const ProductDetail = () => {
  const { id } = useParams();
  const { agregarAlCarrito, productosEnCarrito } = useCarrito();
  const [producto, setProducto] = useState(null);


  useEffect(() => {
    const fetchProducto = async () => {
      try {
        const todos = await ProductoService.getAll();
        const encontrado = todos.find(p => p.id.toString() === id);
        setProducto(encontrado);

      } catch (error) {
        console.error("Error cargando producto", error);
      }
    };

    fetchProducto();
  }, [id]);

  return (
    <Wrapper>
      <SidebarHome
        categoriaActiva="detalle"
        filtrarPorCategoria={() => { }}
        productosEnCarrito={productosEnCarrito}
        onSearch={() => { }}
      />
      <MainProductDetail
        producto={producto}
        agregarAlCarrito={agregarAlCarrito}
      />
    </Wrapper>
  );
};

export default ProductDetail;