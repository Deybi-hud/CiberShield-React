import React, { useState, useEffect } from "react";
import Wrapper from "../components/templates/Wrapper";
import SidebarHome from "../components/organisms/SidebarHome";
import MainHome from "../components/organisms/MainHome";

const Home = ({ productosEnCarrito, agregarAlCarrito }) => {
  const [productos, setProductos] = useState([]);
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const [categoriaActiva, setCategoriaActiva] = useState("todos");

  useEffect(() => {
    const cargarProductos = async () => {
      try {
        const response = await fetch("/public/data/products.json");
        const data = await response.json();
        setProductos(data);
        setProductosFiltrados(data);
      } catch (error) {
        console.error("Error al cargar productos:", error);
      }
    };
    cargarProductos();
  }, []);

  const filtrarPorCategoria = (categoriaId) => {
    setCategoriaActiva(categoriaId);
    setProductosFiltrados(
      categoriaId === "todos"
        ? productos
        : productos.filter((p) => p.categoria.id === categoriaId)
    );
  };

  return (
    <Wrapper>
      <SidebarHome
        categoriaActiva={categoriaActiva}
        filtrarPorCategoria={filtrarPorCategoria}
        productosEnCarrito={productosEnCarrito}
      />
      <MainHome
        productosFiltrados={productosFiltrados}
        categoriaActiva={categoriaActiva}
        agregarAlCarrito={agregarAlCarrito}
      />
    </Wrapper>
  );
};

export default Home;