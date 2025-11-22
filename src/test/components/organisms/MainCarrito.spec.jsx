// src/test/components/organisms/MainCarrito.spec.jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import MainCarrito from '../../../components/organisms/MainCarrito';

describe('MainCarrito Component', () => {

  const mockProductos = [
    { id: 1, titulo: 'Producto 1', precio: 100, cantidad: 2 },
    { id: 2, titulo: 'Producto 2', precio: 200, cantidad: 1 }
  ];

  const mockProps = {
    carritoComprar: false,
    carritoVacio: false,
    productosEnCarrito: mockProductos,
    eliminarDelCarrito: () => { },
    handleVaciar: () => { },
    handleComprar: () => { },
    total: 400
  };

  it('renderiza todos los elementos visuales correctamente', () => {
    render(<MainCarrito {...mockProps} />);

    expect(screen.getByRole('heading', { name: /Carrito/i })).toBeTruthy();
    expect(screen.getByText(/Total:/i)).toBeTruthy();
    expect(screen.getByText('$400')).toBeTruthy();
    expect(screen.getByText(/Vaciar Carrito/i)).toBeTruthy();
    expect(screen.getByText(/Comprar ahora/i)).toBeTruthy();
  });

  it('muestra mensaje de carrito vacío cuando no hay productos', () => {
    const emptyProps = {
      ...mockProps,
      carritoVacio: true,
      productosEnCarrito: []
    };
    render(<MainCarrito {...emptyProps} />);

    expect(screen.getByText(/Tu carrito está vacío/i)).toBeTruthy();
  });

  it('muestra mensaje de compra exitosa', () => {
    const compradoProps = {
      ...mockProps,
      carritoComprar: true
    };
    render(<MainCarrito {...compradoProps} />);

    expect(screen.getByText(/¡Gracias por tu compra!/i)).toBeTruthy();
  });

  it('llama a handleVaciar cuando se hace clic en Vaciar Carrito', () => {
    const handleVaciarSpy = jasmine.createSpy('handleVaciar');
    render(<MainCarrito {...mockProps} handleVaciar={handleVaciarSpy} />);

    const vaciarButton = screen.getByText(/Vaciar Carrito/i);
    fireEvent.click(vaciarButton);

    expect(handleVaciarSpy).toHaveBeenCalled();
  });

  it('llama a handleComprar cuando se hace clic en Comprar ahora', () => {
    const handleComprarSpy = jasmine.createSpy('handleComprar');
    render(<MainCarrito {...mockProps} handleComprar={handleComprarSpy} />);

    const comprarButton = screen.getByText(/Comprar ahora/i);
    fireEvent.click(comprarButton);

    expect(handleComprarSpy).toHaveBeenCalled();
  });
});
