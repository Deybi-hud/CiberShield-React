import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Login from '../../pages/Login';
import { AuthContext } from '../../context/AuthContext';
import { AuthService } from '../../services/index';

describe('Login Page', () => {
  let loginSpy;

  beforeEach(() => {
    spyOn(AuthService, 'login').and.returnValue(Promise.resolve({
      data: {
        usuario: { id: 1, nombreUsuario: 'Test User', correo: 'test@example.com', rol: 'CLIENTE' },
        token: 'fake-token'
      }
    }));
    
    loginSpy = jasmine.createSpy('login');
  });

  const renderLogin = () => {
    return render(
      <AuthContext.Provider value={{ login: loginSpy }}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </AuthContext.Provider>
    );
  };

  it('renderiza correctamente', () => {
    renderLogin();
    expect(screen.getByRole('heading', { name: /Iniciar Sesión/i })).toBeTruthy();
  });

  it('renderiza los campos de entrada', () => {
    renderLogin();
    expect(screen.getByPlaceholderText(/Correo electrónico/i)).toBeTruthy();
    expect(screen.getByPlaceholderText(/Contraseña/i)).toBeTruthy();
  });

  it('permite escribir en los campos', () => {
    renderLogin();
    const emailInput = screen.getByPlaceholderText(/Correo electrónico/i);
    const passInput = screen.getByPlaceholderText(/Contraseña/i);

    fireEvent.change(emailInput, { target: { value: 'test@mail.com' } });
    fireEvent.change(passInput, { target: { value: '123456' } });

    expect(emailInput.value).toBe('test@mail.com');
    expect(passInput.value).toBe('123456');
  });

  it('llama a AuthService.login al enviar el formulario', async () => {
    renderLogin();
    
    fireEvent.change(screen.getByPlaceholderText(/Correo electrónico/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText(/Contraseña/i), { target: { value: 'password' } });
    
    const btn = screen.getByText('Ingresar');
    fireEvent.click(btn);


    expect(AuthService.login).toHaveBeenCalled();
    
    await waitFor(() => {
      expect(loginSpy).toHaveBeenCalled();
    });
  });
});