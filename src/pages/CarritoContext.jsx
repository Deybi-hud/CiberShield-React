import React, { createContext, useState } from 'react';
import { CarritoProvider } from './pages/CarritoContext.jsx'

const CarritoContext = createContext();

export const CarritoProvider = ({ children }) => {
  const [productosEnCarrito, setProductosEnCarrito] = useState([]);

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

  const eliminarDelCarrito = (productoId) => {
    setProductosEnCarrito((prevCarrito) =>
      prevCarrito
        .map((item) =>
          item.id === productoId
            ? { ...item, cantidad: item.cantidad - 1 }
            : item
        )
        .filter((item) => item.cantidad > 0)
    );
  };

  const vaciarCarrito = () => {
    setProductosEnCarrito([]);
  };

  const value = {
    productosEnCarrito,
    agregarAlCarrito,
    eliminarDelCarrito,
    vaciarCarrito,
  };

  return (
    <CarritoContext.Provider value={value}>
      {children}
    </CarritoContext.Provider>
  );
};

export const useCarrito = () => {
  const context = React.useContext(CarritoContext);
  if (!context) {
    throw new Error('useCarrito debe usarse dentro de CarritoProvider');
  }
  return context;
};

export default CarritoContext;