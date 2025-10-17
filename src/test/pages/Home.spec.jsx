// src/test/pages/Home.spec.jsx
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Home from '../../pages/Home';
import { CarritoProvider } from '../../context/CarritoContext';

global.fetch = jasmine.createSpy('fetch');

const mockProductos = [
  { id: 1, nombre: 'Producto 1', precio: 100, categoria: { id: 'hardware' }, imagen: { url: 'img1.jpg' } },
  { id: 2, nombre: 'Producto 2', precio: 200, categoria: { id: 'software' }, imagen: { url: 'img2.jpg' } }
];

describe('Home Page', () => {

  beforeEach(() => {
    global.fetch.and.returnValue(
      Promise.resolve({
        json: () => Promise.resolve(mockProductos)
      })
    );
  });

  afterEach(() => {
    global.fetch.calls.reset();
  });

  it('renderiza correctamente', async () => {
    render(
      <BrowserRouter>
        <CarritoProvider>
          <Home />
        </CarritoProvider>
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /Todos los productos/i })).toBeTruthy();
    });
  });

  it('carga productos desde el JSON', async () => {
    render(
      <BrowserRouter>
        <CarritoProvider>
          <Home />
        </CarritoProvider>
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('/data/products.json');
    });
  });

  it('renderiza los componentes principales', async () => {
    const { container } = render(
      <BrowserRouter>
        <CarritoProvider>
          <Home />
        </CarritoProvider>
      </BrowserRouter>
    );

    await waitFor(() => {
      const aside = container.querySelector('aside');
      const main = container.querySelector('main');
      expect(aside).toBeTruthy();
      expect(main).toBeTruthy();
    });
  });

  it('muestra el menú de navegación', async () => {
    render(
      <BrowserRouter>
        <CarritoProvider>
          <Home />
        </CarritoProvider>
      </BrowserRouter>
    );

    await waitFor(() => {
      const todosElements = screen.getAllByText(/Todos los productos/i);
      expect(todosElements.length).toBeGreaterThan(0);
      expect(screen.getByText('Hardware')).toBeTruthy();
      expect(screen.getByText('Software')).toBeTruthy();
    });
  });
});
