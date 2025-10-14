import React from "react";
import ProductCard from "../molecules/ProductCard";
import Text from "../atoms/Text";


const MainHome = ({ productosFiltrados, categoriaActiva, agregarAlCarrito }) => {
  return (
    <main>
      <Text as="h2" className="titulo-principal">
        {categoriaActiva === "todos"
          ? "Todos los productos"
          : categoriaActiva.charAt(0).toUpperCase() + categoriaActiva.slice(1)}
      </Text>

      <div className="contenedor-productos">
        {productosFiltrados.map((producto) => (
          <ProductCard
            key={producto.id}
            producto={producto}
            onAddToCart={agregarAlCarrito}
          />
        ))}
      </div>
    </main>
  );
};

export default MainHome;
