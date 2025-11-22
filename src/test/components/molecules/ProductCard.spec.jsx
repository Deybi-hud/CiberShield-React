// src/test/components/molecules/ProductCard.spec.jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ProductCard from '../../../components/molecules/ProductCard';

describe('ProductCard Component', () => {
  const productoMock = {
    id: 'producto-1',
    nombre: 'Llave de Seguridad',
    imagen: '/ruta/imagen.jpg',
    precio: 50000,
    descripcion: 'Una llave de seguridad robusta.'
  };

  it('renderiza la información del producto correctamente', () => {
    render(<ProductCard producto={productoMock} onAddToCart={() => { }} />);

    expect(screen.getByText('Llave de Seguridad')).toBeTruthy();
    expect(screen.getByText(/\$50[.,]000/)).toBeTruthy(); // Usamos la expresión regular por si acaso
    expect(screen.getByText('Una llave de seguridad robusta.')).toBeTruthy();

    const imagen = screen.getByRole('img');
    expect(imagen.getAttribute('src')).toBe('/ruta/imagen.jpg');
  });

  it('llama a la función onAddToCart cuando se hace clic en el botón "Agregar"', () => {
    const onAddToCartSpy = jasmine.createSpy('onAddToCart');
    render(<ProductCard producto={productoMock} onAddToCart={onAddToCartSpy} />);

    const botonAgregar = screen.getByRole('button', { name: /Agregar/i });
    fireEvent.click(botonAgregar);

    expect(onAddToCartSpy).toHaveBeenCalledWith(productoMock);
  });
});