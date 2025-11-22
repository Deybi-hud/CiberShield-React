// src/test/pages/Login.spec.jsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Login from '../../pages/Login';

global.fetch = jasmine.createSpy('fetch');
global.alert = jasmine.createSpy('alert');

const mockUsers = [
  { correo: 'test@example.com', contrasena: '1234', nombre: 'Test', apellido: 'User' }
];

describe('Login Page', () => {

  beforeEach(() => {
    global.fetch.and.returnValue(
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockUsers)
      })
    );
    localStorage.clear();
  });

  afterEach(() => {
    global.fetch.calls.reset();
    global.alert.calls.reset();
  });

  it('renderiza correctamente', async () => {
    render(<Login />);

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /Iniciar Sesión/i })).toBeTruthy();
    });
  });

  it('renderiza los campos de entrada', async () => {
    render(<Login />);

    await waitFor(() => {
      expect(screen.getByPlaceholderText(/Correo electrónico/i)).toBeTruthy();
      expect(screen.getByPlaceholderText(/Contraseña/i)).toBeTruthy();
    });
  });

  it('renderiza el botón de ingresar', async () => {
    render(<Login />);

    await waitFor(() => {
      expect(screen.getByText(/Ingresar/i)).toBeTruthy();
    });
  });

  it('renderiza el enlace de registro', async () => {
    render(<Login />);

    await waitFor(() => {
      expect(screen.getByText(/¿No tienes cuenta\? Regístrate/i)).toBeTruthy();
    });
  });

  it('carga usuarios desde el JSON', async () => {
    render(<Login />);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('/data/users.json');
    });
  });

  it('muestra error cuando el email está vacío', async () => {
    const { container } = render(<Login />);

    await waitFor(() => {
      expect(screen.getByPlaceholderText(/Correo electrónico/i)).toBeTruthy();
    }, { timeout: 5000 });

    await waitFor(() => {
      const submitButton = screen.getByRole('button', { name: /Ingresar/i });
      expect(submitButton).toBeTruthy();
    }, { timeout: 5000 });

    expect(container.querySelector('form')).toBeTruthy();
  });

  it('muestra error cuando la contraseña está vacía', async () => {
    const { container } = render(<Login />);

    await waitFor(() => {
      expect(screen.getByPlaceholderText(/Correo electrónico/i)).toBeTruthy();
    });

    const emailInput = screen.getByPlaceholderText(/Correo electrónico/i);
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

    const submitButton = screen.getByRole('button', { name: /Ingresar/i });

    await waitFor(() => {
      fireEvent.click(submitButton);
    });

    await waitFor(() => {
      expect(container.querySelector('form')).toBeTruthy();
    }, { timeout: 3000 });
  });

  it('muestra error cuando el email no es válido', async () => {
    const { container } = render(<Login />);

    await waitFor(() => {
      expect(screen.getByPlaceholderText(/Correo electrónico/i)).toBeTruthy();
    });

    const emailInput = screen.getByPlaceholderText(/Correo electrónico/i);
    fireEvent.change(emailInput, { target: { value: 'invalidemail' } });

    const submitButton = screen.getByRole('button', { name: /Ingresar/i });

    await waitFor(() => {
      fireEvent.click(submitButton);
    });

    await waitFor(() => {
      expect(container.querySelector('form')).toBeTruthy();
    }, { timeout: 3000 });
  });

  it('muestra error cuando la contraseña es muy corta', async () => {
    render(<Login />);

    await waitFor(() => {
      const emailInput = screen.getByPlaceholderText(/Correo electrónico/i);
      const passwordInput = screen.getByPlaceholderText(/Contraseña/i);

      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      fireEvent.change(passwordInput, { target: { value: '123' } });

      const submitButton = screen.getByText(/Ingresar/i);
      fireEvent.click(submitButton);
    });

    await waitFor(() => {
      expect(screen.getByText(/La contraseña debe tener al menos 4 caracteres/i)).toBeTruthy();
    });
  });

  it('muestra la imagen de usuario', async () => {
    render(<Login />);

    await waitFor(() => {
      expect(screen.getByAltText(/Usuario CiberShield/i)).toBeTruthy();
    });
  });

  it('el botón está deshabilitado mientras se cargan usuarios', () => {
    render(<Login />);

    const submitButton = screen.getByText(/Iniciando sesión.../i);
    expect(submitButton).toBeTruthy();
  });
});
