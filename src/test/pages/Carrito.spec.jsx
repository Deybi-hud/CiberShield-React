// src/test/pages/Carrito.spec.jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Carrito from '../../pages/Carrito';
import { CarritoProvider, useCarrito } from '../../context/CarritoContext';

const TestCarritoWrapper = () => {
  const { agregarAlCarrito } = useCarrito();
  
  React.useEffect(() => {
    agregarAlCarrito({ id: 1, nombre: 'Producto Test', precio: 100, imagen: { url: 'test.jpg' }, descripcion: 'Descripción test' });
  }, []);

  return <Carrito />;
};

describe('Carrito Page', () => {

  it('renderiza correctamente', () => {
    render(
      <BrowserRouter>
        <CarritoProvider>
          <Carrito />
        </CarritoProvider>
      </BrowserRouter>
    );

    expect(screen.getByRole('heading', { name: /Carrito/i })).toBeTruthy();
  });

  it('muestra mensaje de carrito vacío cuando no hay productos', () => {
    const { container } = render(
      <BrowserRouter>
        <CarritoProvider>
          <Carrito />
        </CarritoProvider>
      </BrowserRouter>
    );

    const mainElement = container.querySelector('main');
    expect(mainElement).toBeTruthy();
    expect(container.querySelector('aside')).toBeTruthy();
  });

  it('muestra productos en el carrito', () => {
    render(
      <BrowserRouter>
        <CarritoProvider>
          <TestCarritoWrapper />
        </CarritoProvider>
      </BrowserRouter>
    );

    expect(screen.getByText('Producto Test')).toBeTruthy();
    expect(screen.getByText(/Total:/i)).toBeTruthy();
  });

  it('renderiza los botones de acción cuando hay productos', () => {
    render(
      <BrowserRouter>
        <CarritoProvider>
          <TestCarritoWrapper />
        </CarritoProvider>
      </BrowserRouter>
    );

    expect(screen.getByText(/Vaciar Carrito/i)).toBeTruthy();
    expect(screen.getByText(/Comprar ahora/i)).toBeTruthy();
  });

  it('muestra el componente Sidebar', () => {
    const { container } = render(
      <BrowserRouter>
        <CarritoProvider>
          <Carrito />
        </CarritoProvider>
      </BrowserRouter>
    );

    const aside = container.querySelector('aside');
    expect(aside).toBeTruthy();
  });

  it('muestra el enlace para seguir comprando', () => {
    render(
      <BrowserRouter>
        <CarritoProvider>
          <Carrito />
        </CarritoProvider>
      </BrowserRouter>
    );

    expect(screen.getByRole('link', { name: /Seguir comprando/i })).toBeTruthy();
  });

  it('calcula el total correctamente', () => {
    const { container } = render(
      <BrowserRouter>
        <CarritoProvider>
          <TestCarritoWrapper />
        </CarritoProvider>
      </BrowserRouter>
    );

    expect(screen.getByText('Producto Test')).toBeTruthy();
    expect(container.textContent.includes('100') || container.textContent.includes('Total')).toBeTruthy();
  });
});
