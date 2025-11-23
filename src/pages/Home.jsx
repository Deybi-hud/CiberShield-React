import React, { useState, useEffect } from "react";
import Wrapper from "../components/templates/Wrapper";
import SidebarHome from "../components/organisms/SidebarHome";
import MainHome from "../components/organisms/MainHome";
import { useCarrito } from '../context/CarritoContext';
import ProductoService from "../services/publico/ProductoService";
import '../styles/pages/Home.css';

const Home = () => {
  const [productos, setProductos] = useState([]);
  const [productosFiltrados, setProductosFiltrados] = useState([]);

  const [categoriaActiva, setCategoriaActiva] = useState("todos");
  const [busqueda, setBusqueda] = useState("");

  const { agregarAlCarrito, productosEnCarrito } = useCarrito();


  useEffect(() => {
    const cargarProductos = async () => {
      try {
        const data = await ProductoService.getAll();
        setProductos(data);
        setProductosFiltrados(data);
      } catch (error) {
        console.error("Error al cargar productos:", error);
      }
    };
    cargarProductos();
  }, []);

  useEffect(() => {
    let resultado = productos;


    if (categoriaActiva !== "todos") {
      resultado = resultado.filter((p) => p.categoria.id === categoriaActiva);
    }

    if (busqueda.trim() !== "") {
      resultado = resultado.filter((p) =>
        p.nombre.toLowerCase().includes(busqueda.toLowerCase())
      );
    }

    setProductosFiltrados(resultado);
  }, [categoriaActiva, busqueda, productos]);


  const filtrarPorCategoria = (categoriaId) => {
    setCategoriaActiva(categoriaId);
  };

  const handleSearch = (termino) => {
    setBusqueda(termino);
  };

  return (
    <Wrapper>
      <SidebarHome
        categoriaActiva={categoriaActiva}
        filtrarPorCategoria={filtrarPorCategoria}
        productosEnCarrito={productosEnCarrito}
        onSearch={handleSearch}
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