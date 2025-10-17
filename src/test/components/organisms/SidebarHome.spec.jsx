// src/test/components/organisms/SidebarHome.spec.jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import SidebarHome from '../../../components/organisms/SidebarHome';

describe('SidebarHome Component', () => {

  const mockProps = {
    categoriaActiva: 'todos',
    filtrarPorCategoria: () => {},
    productosEnCarrito: [
      { id: 1, cantidad: 2 },
      { id: 2, cantidad: 1 }
    ]
  };

  it('renderiza todos los elementos visuales correctamente', () => {
    render(
      <BrowserRouter>
        <SidebarHome {...mockProps} />
      </BrowserRouter>
    );

    expect(screen.getByRole('link', { name: /Iniciar sesión/i })).toBeTruthy();
    expect(screen.getByText(/Todos los productos/i)).toBeTruthy();
    expect(screen.getByText(/Hardware/i)).toBeTruthy();
    expect(screen.getByText(/Software/i)).toBeTruthy();
  });

  it('renderiza el componente Header', () => {
    const { container } = render(
      <BrowserRouter>
        <SidebarHome {...mockProps} />
      </BrowserRouter>
    );

    const header = container.querySelector('header');
    expect(header).toBeTruthy();
  });

  it('renderiza el componente NavMenu con las props correctas', () => {
    const { container } = render(
      <BrowserRouter>
        <SidebarHome {...mockProps} />
      </BrowserRouter>
    );

    const nav = container.querySelector('nav');
    expect(nav).toBeTruthy();
  });

  it('renderiza el componente Footer', () => {
    const { container } = render(
      <BrowserRouter>
        <SidebarHome {...mockProps} />
      </BrowserRouter>
    );

    const footer = container.querySelector('footer');
    expect(footer).toBeTruthy();
  });

  it('pasa la cantidad correcta de productos al NavMenu', () => {
    render(
      <BrowserRouter>
        <SidebarHome {...mockProps} />
      </BrowserRouter>
    );

    const numerito = screen.getByText('3');
    expect(numerito).toBeTruthy();
  });
});
