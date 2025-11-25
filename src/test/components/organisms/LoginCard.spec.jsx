import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom'; // Agregado
import LoginCard from '../../../components/organisms/LoginCard';

describe('LoginCard Component', () => {

  const mockProps = {
    form: { correo: '', contrasena: '' },
    handleChange: jasmine.createSpy('handleChange'),
    errors: {},
    loading: false,
    onSubmit: (e) => e.preventDefault(),
  };

  const renderWithRouter = (ui) => {
    return render(<BrowserRouter>{ui}</BrowserRouter>);
  };

  it('renderiza todos los elementos visuales correctamente', () => {
    renderWithRouter(<LoginCard {...mockProps} />);

    expect(screen.getByAltText('Usuario CiberShield')).toBeTruthy();
    expect(screen.getByRole('heading', { name: /Iniciar Sesión/i })).toBeTruthy();
    expect(screen.getByPlaceholderText('Correo electrónico')).toBeTruthy();
    expect(screen.getByRole('link', { name: /¿No tienes una cuenta\? crea una cuenta/i })).toBeTruthy();
  });

  it('contiene el enlace al registro', () => {
    renderWithRouter(<LoginCard {...mockProps} />);
    const registerLink = screen.getByRole('link', { name: /¿No tienes una cuenta\? crea una cuenta/i });
    expect(registerLink).toBeTruthy();
    expect(registerLink.getAttribute('href')).toBe('/registro');
  });
});