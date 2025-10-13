import React, { useState, useEffect } from "react";
import Wrapper from "../components/templates/Wrapper";
import SidebarHome from "../components/organisms/SidebarHome";
import MainHome from "../components/organisms/MainHome";

const Home = () => {
  const [productos, setProductos] = useState([]);
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const [productosEnCarrito, setProductosEnCarrito] = useState([]);
  const [categoriaActiva, setCategoriaActiva] = useState("todos");

  useEffect(() => {
    const cargarProductos = async () => {
      try {
        const response = await fetch("/src/data/products.json");
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

  const agregarAlCarrito = (producto) => {
    setProductosEnCarrito((prevCarrito) => {
      const existente = prevCarrito.find((item) => item.id === producto.id);
      return existente
        ? prevCarrito.map((item) =>
            item.id === producto.id
              ? { ...item, cantidad: item.cantidad + 1 }
              : item
          )
        : [...prevCarrito, { ...producto, cantidad: 1 }];
    });
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
//hola
export default Home;
