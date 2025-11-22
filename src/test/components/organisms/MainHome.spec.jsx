// src/test/components/organisms/MainHome.spec.jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import MainHome from '../../../components/organisms/MainHome';

describe('MainHome Component', () => {

  const mockProductos = [
    { id: 1, titulo: 'Producto 1', precio: 100, imagen: { url: 'img1.jpg' } },
    { id: 2, titulo: 'Producto 2', precio: 200, imagen: { url: 'img2.jpg' } }
  ];

  const mockProps = {
    productosFiltrados: mockProductos,
    categoriaActiva: 'todos',
    agregarAlCarrito: () => { }
  };

  it('renderiza todos los elementos visuales correctamente', () => {
    render(<MainHome {...mockProps} />);

    expect(screen.getByRole('heading', { name: /Todos los productos/i })).toBeTruthy();
  });

  it('muestra el título con la categoría activa capitalizada', () => {
    const propsHardware = {
      ...mockProps,
      categoriaActiva: 'hardware'
    };
    render(<MainHome {...propsHardware} />);

    expect(screen.getByRole('heading', { name: /Hardware/i })).toBeTruthy();
  });

  it('muestra el título con la categoría software capitalizada', () => {
    const propsSoftware = {
      ...mockProps,
      categoriaActiva: 'software'
    };
    render(<MainHome {...propsSoftware} />);

    expect(screen.getByRole('heading', { name: /Software/i })).toBeTruthy();
  });

  it('renderiza la cantidad correcta de productos', () => {
    const { container } = render(<MainHome {...mockProps} />);
    const productos = container.querySelectorAll('.producto');

    expect(productos.length).toBe(mockProductos.length);
  });
});
