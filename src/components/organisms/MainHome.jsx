import React from "react";
import ProductCard from "../molecules/ProductCard";
import Text from "../atoms/Text";
import '../../styles/organisms/MainHome.css';


const MainHome = ({ productosFiltrados, categoriaActiva, agregarAlCarrito }) => {
  const titulo = categoriaActiva === "todos" 
    ? "Todos los productos" 
    : typeof categoriaActiva === 'string'
      ? categoriaActiva.charAt(0).toUpperCase() + categoriaActiva.slice(1)
      : "Productos";

  const productosSeguros = Array.isArray(productosFiltrados) ? productosFiltrados : [];

  return (
    <main>
      <Text as="h2" className="titulo-principal">{titulo}</Text>
      <div className="contenedor-productos">
        {productosSeguros.map((producto) => (
          <ProductCard 
            key={producto?.id || Math.random()} 
            producto={producto} 
            onAddToCart={agregarAlCarrito} 
          />
        ))}
      </div>
    </main>
  );
};

export default MainHome;
