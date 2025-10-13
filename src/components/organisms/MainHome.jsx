import React from "react";
import ProductCard from "../molecules/ProductCard";

const MainHome = ({ productosFiltrados, categoriaActiva, agregarAlCarrito }) => {
  return (
    <main>
      <h2 className="titulo-principal">
        {categoriaActiva === "todos"
          ? "Todos los productos"
          : categoriaActiva.charAt(0).toUpperCase() + categoriaActiva.slice(1)}
      </h2>

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
