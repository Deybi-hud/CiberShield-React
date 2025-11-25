import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom'; 
import ProductCard from '../../../components/molecules/ProductCard';

describe('ProductCard Component', () => {
  const productoMock = {
    id: 'producto-1',
    nombre: 'Llave de Seguridad',
    imagen: '/ruta/imagen.jpg',
    precio: 50000,
    descripcion: 'Una llave de seguridad robusta.'
  };

  const renderWithRouter = (ui) => {
    return render(<BrowserRouter>{ui}</BrowserRouter>);
  };

  it('renderiza la información del producto correctamente', () => {
    renderWithRouter(<ProductCard producto={productoMock} onAddToCart={() => { }} />);

    expect(screen.getByText('Llave de Seguridad')).toBeTruthy();
    expect(screen.getByText(/\$50[.,]000/)).toBeTruthy();
    expect(screen.getByText('Una llave de seguridad robusta.')).toBeTruthy();

    const imagen = screen.getByRole('img');
    expect(imagen.getAttribute('src')).toBe('/ruta/imagen.jpg');
  });

  it('llama a la función onAddToCart cuando se hace clic en el botón "Agregar"', () => {
    const onAddToCartSpy = jasmine.createSpy('onAddToCart');
    renderWithRouter(<ProductCard producto={productoMock} onAddToCart={onAddToCartSpy} />);

    const botonAgregar = screen.getByRole('button', { name: /Agregar/i });
    fireEvent.click(botonAgregar);

    expect(onAddToCartSpy).toHaveBeenCalledWith(productoMock);
  });
});