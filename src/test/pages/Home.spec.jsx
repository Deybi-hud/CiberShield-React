import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Home from '../../pages/Home';
import { CarritoProvider } from '../../context/CarritoContext'; 
import { ProductoService } from '../../services/index';

describe('Home Page', () => {
  const mockProductos = [
    { id: 1, nombre: 'Producto 1', precio: 100, categoria: { id: 'hardware' }, imagen: { url: 'img1.jpg' } },
    { id: 2, nombre: 'Producto 2', precio: 200, categoria: { id: 'software' }, imagen: { url: 'img2.jpg' } }
  ];

  beforeEach(() => {
    spyOn(ProductoService, 'getAll').and.returnValue(Promise.resolve(mockProductos));
  });

  const renderHome = () => {
    return render(
      <BrowserRouter>
        <CarritoProvider>
          <Home />
        </CarritoProvider>
      </BrowserRouter>
    );
  };

  it('renderiza correctamente y carga productos', async () => {
    renderHome();

    await waitFor(() => {
      expect(ProductoService.getAll).toHaveBeenCalled();
      expect(screen.getByText('Producto 1')).toBeTruthy();
    });
  });

  it('muestra el menú de navegación', async () => {
    renderHome();

    await waitFor(() => {
      const todosElements = screen.getAllByText(/Todos los productos/i);
      expect(todosElements.length).toBeGreaterThan(0);

      expect(screen.getByText('Hardware')).toBeTruthy();
      expect(screen.getByText('Software')).toBeTruthy();
    });
  });
});