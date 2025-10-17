// src/test/components/organisms/SidebarCarrito.spec.jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import SidebarCarrito from '../../../components/organisms/SidebarCarrito';

describe('SidebarCarrito Component', () => {

  it('renderiza todos los elementos visuales correctamente', () => {
    render(
      <BrowserRouter>
        <SidebarCarrito />
      </BrowserRouter>
    );

    expect(screen.getByRole('link', { name: /Seguir comprando/i })).toBeTruthy();
    expect(screen.getByRole('link', { name: /Carrito/i })).toBeTruthy();
  });

  it('renderiza el componente Header', () => {
    const { container } = render(
      <BrowserRouter>
        <SidebarCarrito />
      </BrowserRouter>
    );

    const header = container.querySelector('header');
    expect(header).toBeTruthy();
  });

  it('renderiza el componente NavCarrito', () => {
    const { container } = render(
      <BrowserRouter>
        <SidebarCarrito />
      </BrowserRouter>
    );

    const nav = container.querySelector('nav');
    expect(nav).toBeTruthy();
  });

  it('renderiza el componente Footer', () => {
    const { container } = render(
      <BrowserRouter>
        <SidebarCarrito />
      </BrowserRouter>
    );

    const footer = container.querySelector('footer');
    expect(footer).toBeTruthy();
  });
});
