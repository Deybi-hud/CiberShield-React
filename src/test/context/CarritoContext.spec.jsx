// src/test/context/CarritoContext.spec.jsx
import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { CarritoProvider, useCarrito } from '../../context/CarritoContext';

const TestComponent = () => {
  const { productosEnCarrito, agregarAlCarrito, eliminarDelCarrito, vaciarCarrito, comprarCarrito, compraRealizada } = useCarrito();

  return (
    <div>
      <div data-testid="carrito-count">{productosEnCarrito.length}</div>
      <div data-testid="compra-realizada">{compraRealizada ? 'true' : 'false'}</div>
      <button onClick={() => agregarAlCarrito({ id: 1, nombre: 'Producto 1', precio: 100 })}>
        Agregar
      </button>
      <button onClick={() => eliminarDelCarrito(1)}>Eliminar</button>
      <button onClick={vaciarCarrito}>Vaciar</button>
      <button onClick={comprarCarrito}>Comprar</button>
      {productosEnCarrito.map(p => (
        <div key={p.id} data-testid={`producto-${p.id}`}>
          {p.nombre} - Cantidad: {p.cantidad}
        </div>
      ))}
    </div>
  );
};

describe('CarritoContext', () => {

  beforeEach(() => {
    localStorage.clear();
  });

  it('inicializa con el carrito vacío', () => {
    render(
      <CarritoProvider>
        <TestComponent />
      </CarritoProvider>
    );

    expect(screen.getByTestId('carrito-count').textContent).toBe('0');
  });

  it('agrega productos al carrito', () => {
    render(
      <CarritoProvider>
        <TestComponent />
      </CarritoProvider>
    );

    const agregarBtn = screen.getByText('Agregar');

    act(() => {
      agregarBtn.click();
    });

    expect(screen.getByTestId('carrito-count').textContent).toBe('1');
    expect(screen.getByTestId('producto-1')).toBeTruthy();
  });

  it('incrementa la cantidad si el producto ya existe', () => {
    render(
      <CarritoProvider>
        <TestComponent />
      </CarritoProvider>
    );

    const agregarBtn = screen.getByText('Agregar');

    act(() => {
      agregarBtn.click();
      agregarBtn.click();
    });

    expect(screen.getByTestId('carrito-count').textContent).toBe('1');
    expect(screen.getByText(/Cantidad: 2/)).toBeTruthy();
  });

  it('elimina productos del carrito', () => {
    render(
      <CarritoProvider>
        <TestComponent />
      </CarritoProvider>
    );

    const agregarBtn = screen.getByText('Agregar');
    const eliminarBtn = screen.getByText('Eliminar');

    act(() => {
      agregarBtn.click();
      agregarBtn.click();
    });

    expect(screen.getByText(/Cantidad: 2/)).toBeTruthy();

    act(() => {
      eliminarBtn.click();
    });

    expect(screen.getByText(/Cantidad: 1/)).toBeTruthy();
  });

  it('vacía el carrito completamente', () => {
    render(
      <CarritoProvider>
        <TestComponent />
      </CarritoProvider>
    );

    const agregarBtn = screen.getByText('Agregar');
    const vaciarBtn = screen.getByText('Vaciar');

    act(() => {
      agregarBtn.click();
      agregarBtn.click();
    });

    expect(screen.getByTestId('carrito-count').textContent).toBe('1');

    act(() => {
      vaciarBtn.click();
    });

    expect(screen.getByTestId('carrito-count').textContent).toBe('0');
  });

  it('marca la compra como realizada', () => {
    render(
      <CarritoProvider>
        <TestComponent />
      </CarritoProvider>
    );

    const agregarBtn = screen.getByText('Agregar');
    const comprarBtn = screen.getByText('Comprar');

    act(() => {
      agregarBtn.click();
    });

    expect(screen.getByTestId('compra-realizada').textContent).toBe('false');

    act(() => {
      comprarBtn.click();
    });

    expect(screen.getByTestId('compra-realizada').textContent).toBe('true');
    expect(screen.getByTestId('carrito-count').textContent).toBe('0');
  });

  it('lanza error si useCarrito se usa fuera del Provider', () => {
    const ErrorComponent = () => {
      try {
        useCarrito();
        return <div>No error</div>;
      } catch (error) {
        return <div>{error.message}</div>;
      }
    };

    render(<ErrorComponent />);
    expect(screen.getByText(/useCarrito debe usarse dentro de CarritoProvider/)).toBeTruthy();
  });
});
