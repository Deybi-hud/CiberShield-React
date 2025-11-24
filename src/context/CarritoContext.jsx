import React, { createContext, useEffect, useState } from 'react';

const CarritoContext = createContext(null);

export const CarritoProvider = ({ children }) => {

  const [productosEnCarrito, setProductosEnCarrito] = useState(() => {
    const guardados = localStorage.getItem("productos-en-carrito");
    return guardados ? JSON.parse(guardados) : [];
  });

  const [compraRealizada, setCompraRealizada] = useState(false);

  useEffect(() => {
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito))
  }, [productosEnCarrito])

  const agregarAlCarrito = (producto) => {

    setCompraRealizada(false);
    setProductosEnCarrito((prevCarrito) => {
      const existente = prevCarrito.find((item) => item.id === producto.id);
      return existente ? prevCarrito.map((item) => item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item) : [...prevCarrito, { ...producto, cantidad: 1 }];
    });
  };

  const eliminarDelCarrito = (productoId) => {
    setProductosEnCarrito((prevCarrito) =>
      prevCarrito.map((item) => item.id === productoId ? { ...item, cantidad: item.cantidad - 1 } : item).filter((item) => item.cantidad > 0)
    );
  };

  const vaciarCarrito = () => {
    setProductosEnCarrito([]);
    localStorage.setItem("productos-en-carrito", JSON.stringify([]));
    setCompraRealizada(false);
  };

  const comprarCarrito = () => {
    setProductosEnCarrito([]);
    localStorage.setItem("productos-en-carrito", JSON.stringify([]));
    setCompraRealizada(true);

  }

  const value = { productosEnCarrito, agregarAlCarrito, eliminarDelCarrito, vaciarCarrito, comprarCarrito, compraRealizada };

  return (
    <CarritoContext.Provider value={value}>{children} </CarritoContext.Provider>
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

