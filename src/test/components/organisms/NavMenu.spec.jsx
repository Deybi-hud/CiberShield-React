// src/test/components/organisms/NavMenu.spec.jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import NavMenu from '../../../components/organisms/NavMenu';

describe('NavMenu Component', () => {

  const mockProps = {
    categoriaActiva: 'todos',
    filtrarPorCategoria: () => {},
    productosEnCarrito: [
      { id: 1, cantidad: 2 },
      { id: 2, cantidad: 3 }
    ]
  };

  it('renderiza todos los elementos visuales correctamente', () => {
    render(
      <BrowserRouter>
        <NavMenu {...mockProps} />
      </BrowserRouter>
    );

    expect(screen.getByRole('link', { name: /Iniciar sesión/i })).toBeTruthy();
    expect(screen.getByText(/Todos los productos/i)).toBeTruthy();
    expect(screen.getByText(/Hardware/i)).toBeTruthy();
    expect(screen.getByText(/Software/i)).toBeTruthy();
    expect(screen.getByRole('link', { name: /Carrito/i })).toBeTruthy();
  });

  it('muestra la cantidad correcta de productos en el carrito', () => {
    render(
      <BrowserRouter>
        <NavMenu {...mockProps} />
      </BrowserRouter>
    );

    const numerito = screen.getByText('5');
    expect(numerito).toBeTruthy();
  });

  it('aplica la clase active al botón de categoría activa', () => {
    render(
      <BrowserRouter>
        <NavMenu {...mockProps} />
      </BrowserRouter>
    );

    const todosButton = screen.getByText(/Todos los productos/i);
    expect(todosButton.classList.contains('active')).toBe(true);
  });

  it('llama a filtrarPorCategoria cuando se hace clic en Hardware', () => {
    const filtrarSpy = jasmine.createSpy('filtrarPorCategoria');
    render(
      <BrowserRouter>
        <NavMenu {...mockProps} filtrarPorCategoria={filtrarSpy} />
      </BrowserRouter>
    );

    const hardwareButton = screen.getByText(/Hardware/i);
    fireEvent.click(hardwareButton);

    expect(filtrarSpy).toHaveBeenCalledWith('hardware');
  });

  it('llama a filtrarPorCategoria cuando se hace clic en Software', () => {
    const filtrarSpy = jasmine.createSpy('filtrarPorCategoria');
    render(
      <BrowserRouter>
        <NavMenu {...mockProps} filtrarPorCategoria={filtrarSpy} />
      </BrowserRouter>
    );

    const softwareButton = screen.getByText(/Software/i);
    fireEvent.click(softwareButton);

    expect(filtrarSpy).toHaveBeenCalledWith('software');
  });
});
