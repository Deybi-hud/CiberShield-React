import React, { useState, useEffect } from "react";
import Wrapper from "../components/templates/Wrapper";
import SidebarHome from "../components/organisms/SidebarHome";
import MainHome from "../components/organisms/MainHome";
import { useCarrito } from '../context/CarritoContext';
import { ProductoService } from "../services/index";
import '../styles/pages/Home.css';

const Home = () => {
  const [productos, setProductos] = useState([]);
  const [productosFiltrados, setProductosFiltrados] = useState([]);

  const [categoriaActiva, setCategoriaActiva] = useState("todos");
  const [busqueda, setBusqueda] = useState("");
  const [, setAuthCheck] = useState(0);

  const { agregarAlCarrito, productosEnCarrito } = useCarrito();

  useEffect(() => {
    const interval = setInterval(() => {
      setAuthCheck(prev => prev + 1);
    }, 500);
    return () => clearInterval(interval);
  }, []);


  useEffect(() => {
    const cargarProductos = async () => {
      try {
        console.log('Iniciando carga de productos...');
        const data = await ProductoService.getAll();
        console.log('Productos cargados:', data);

        if (Array.isArray(data)) {
          setProductos(data);
          setProductosFiltrados(data);
        } else if (data && typeof data === 'object') {
          const productosArray = Array.isArray(data.data) ? data.data : [];
          setProductos(productosArray);
          setProductosFiltrados(productosArray);
        } else {
          console.warn('Formato de datos inesperado:', data);
          setProductos([]);
          setProductosFiltrados([]);
        }
      } catch (error) {
        console.error("Error al cargar productos:", error);
        setProductos([]);
        setProductosFiltrados([]);
      }
    };
    cargarProductos();
  }, []);

  useEffect(() => {
    let resultado = productos;

    if (categoriaActiva !== "todos") {
      resultado = resultado.filter((p) => {
        if (p.categoria && p.categoria.id) {
          return p.categoria.id === categoriaActiva;
        }
        if (typeof p.categoria === 'string') {
          return p.categoria === categoriaActiva;
        }
        return false;
      });
    }

    if (busqueda.trim() !== "") {
      resultado = resultado.filter((p) =>
        p.nombre && p.nombre.toLowerCase().includes(busqueda.toLowerCase())
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