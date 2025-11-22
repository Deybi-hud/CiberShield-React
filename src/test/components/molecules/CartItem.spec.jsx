// src/test/components/molecules/CartItem.spec.jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CartItem from '../../../components/molecules/CartItem';

describe('CartItem Component', () => {
  const productoEnCarrito = {
    id: 'prod-carrito-1',
    nombre: 'ProtonVPN',
    imagen: '/ruta/imagen.jpg',
    precio: 120000,
    cantidad: 2,
    descripcion: 'VPN segura'
  };

  it('renderiza la información del producto en el carrito', () => {
    render(<CartItem producto={productoEnCarrito} onEliminar={() => { }} />);
    expect(screen.getByText('ProtonVPN')).toBeTruthy();
    expect(screen.getByText('Cantidad')).toBeTruthy();
    expect(screen.getByText('2')).toBeTruthy();
    expect(screen.getByText('Precio Unitario')).toBeTruthy();
    expect(screen.getByText(/\$120[.,]000/)).toBeTruthy();
    expect(screen.getByText('Total')).toBeTruthy();
    expect(screen.getByText(/\$240[.,]000/)).toBeTruthy();
  });

  it('llama a la función onEliminar con el ID del producto al hacer clic en el botón', () => {
    const onEliminarSpy = jasmine.createSpy('onEliminar');

    render(<CartItem producto={productoEnCarrito} onEliminar={onEliminarSpy} />);

    const botonEliminar = screen.getByRole('button');
    fireEvent.click(botonEliminar);

    expect(onEliminarSpy).toHaveBeenCalledWith(productoEnCarrito.id);
  });
});