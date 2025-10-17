// src/test/components/organisms/NavCarrito.spec.jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import NavCarrito from '../../../components/organisms/NavCarrito';

describe('NavCarrito Component', () => {

  it('renderiza todos los elementos visuales correctamente', () => {
    render(
      <BrowserRouter>
        <NavCarrito />
      </BrowserRouter>
    );

    expect(screen.getByRole('link', { name: /Seguir comprando/i })).toBeTruthy();
    expect(screen.getByRole('link', { name: /Carrito/i })).toBeTruthy();
  });

  it('el enlace de Seguir comprando apunta a la ruta correcta', () => {
    render(
      <BrowserRouter>
        <NavCarrito />
      </BrowserRouter>
    );

    const seguirComprandoLink = screen.getByRole('link', { name: /Seguir comprando/i });
    expect(seguirComprandoLink.getAttribute('href')).toBe('/');
  });

  it('el enlace de Carrito apunta a la ruta correcta', () => {
    render(
      <BrowserRouter>
        <NavCarrito />
      </BrowserRouter>
    );

    const carritoLink = screen.getByRole('link', { name: /Carrito/i });
    expect(carritoLink.getAttribute('href')).toBe('/carrito');
  });

  it('el enlace de Carrito tiene la clase active', () => {
    render(
      <BrowserRouter>
        <NavCarrito />
      </BrowserRouter>
    );

    const carritoLink = screen.getByRole('link', { name: /Carrito/i });
    expect(carritoLink.classList.contains('active')).toBe(true);
  });
});
