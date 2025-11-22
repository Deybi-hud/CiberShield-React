// src/test/components/organisms/LoginCard.spec.jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import LoginCard from '../../../components/organisms/LoginCard'; // Ajusta la ruta

describe('LoginCard Component', () => {

  const mockProps = {
    email: '',
    setEmail: () => { },
    password: '',
    setPassword: () => { },
    errors: {},
    isLoading: false,
    onSubmit: (e) => e.preventDefault(),
    onRegisterClick: () => { },
  };

  it('renderiza todos los elementos visuales correctamente', () => {
    render(<LoginCard {...mockProps} />);

    expect(screen.getByAltText('Usuario CiberShield')).toBeTruthy();
    expect(screen.getByRole('heading', { name: /Iniciar Sesión/i })).toBeTruthy();
    expect(screen.getByPlaceholderText('Correo electrónico')).toBeTruthy();
    expect(screen.getByRole('link', { name: /¿No tienes cuenta\? Regístrate/i })).toBeTruthy();
  });

  it('llama a onRegisterClick cuando se hace clic en el enlace', () => {
    const onRegisterClickSpy = jasmine.createSpy('onRegisterClick');
    render(<LoginCard {...mockProps} onRegisterClick={onRegisterClickSpy} />);
    const registerLink = screen.getByRole('link', { name: /¿No tienes cuenta\? Regístrate/i });
    fireEvent.click(registerLink);

    expect(onRegisterClickSpy).toHaveBeenCalled();
  });
});