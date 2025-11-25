import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom'; 
import MainHome from '../../../components/organisms/MainHome';

describe('MainHome Component', () => {

  const mockProductos = [
    { id: 1, nombre: 'Producto 1', precio: 100, imagen: 'img1.jpg' },
    { id: 2, nombre: 'Producto 2', precio: 200, imagen: 'img2.jpg' }
  ];

  const mockProps = {
    productosFiltrados: mockProductos,
    categoriaActiva: 'todos',
    agregarAlCarrito: () => { }
  };

  const renderWithRouter = (ui) => {
    return render(<BrowserRouter>{ui}</BrowserRouter>);
  };

  it('renderiza todos los elementos visuales correctamente', () => {
    renderWithRouter(<MainHome {...mockProps} />);
    expect(screen.getByRole('heading', { name: /Todos los productos/i })).toBeTruthy();
  });

  it('muestra el título con la categoría activa capitalizada', () => {
    const propsHardware = { ...mockProps, categoriaActiva: 'hardware' };
    renderWithRouter(<MainHome {...propsHardware} />);
    expect(screen.getByRole('heading', { name: /Hardware/i })).toBeTruthy();
  });

  it('muestra el título con la categoría software capitalizada', () => {
    const propsSoftware = { ...mockProps, categoriaActiva: 'software' };
    renderWithRouter(<MainHome {...propsSoftware} />);
    expect(screen.getByRole('heading', { name: /Software/i })).toBeTruthy();
  });

  it('renderiza la cantidad correcta de productos', () => {
    const { container } = renderWithRouter(<MainHome {...mockProps} />);
    const productos = container.querySelectorAll('.producto');
    expect(productos.length).toBe(mockProductos.length);
  });
});