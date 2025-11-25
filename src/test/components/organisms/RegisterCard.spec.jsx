import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import RegisterCard from '../../../components/organisms/RegisterCard';

describe('RegisterCard Component', () => {
  
  const mockProps = {
    formData: {
      nombreUsuario: '',
      correo: '',
      contrasena: '',
      confirmarContrasena: ''
    },
    onChange: () => {},
    errors: {},
    isLoading: false,
    onSubmit: (e) => e.preventDefault()
  };

  const renderWithRouter = (component) => {
    return render(<BrowserRouter>{component}</BrowserRouter>);
  };

  it('renderiza el título y la imagen de usuario', () => {
    renderWithRouter(<RegisterCard {...mockProps} />);
    
    expect(screen.getByRole('heading', { name: /Crear Cuenta/i })).toBeTruthy();
    expect(screen.getByAltText('Registro de Usuario')).toBeTruthy();
  });

  it('renderiza el formulario de registro', () => {
    const { container } = renderWithRouter(<RegisterCard {...mockProps} />);
    expect(container.querySelector('form')).toBeTruthy();
    expect(screen.getByPlaceholderText('Nombre de usuario')).toBeTruthy();
  });

  it('muestra el enlace para iniciar sesión', () => {
    renderWithRouter(<RegisterCard {...mockProps} />);
    
    const loginLink = screen.getByRole('link', { name: /¿Ya tienes cuenta\? Inicia Sesión/i });
    expect(loginLink).toBeTruthy();
    expect(loginLink.getAttribute('href')).toBe('/login');
  });

  it('deshabilita el botón cuando está cargando', () => {
    const propsLoading = { ...mockProps, isLoading: true };
    renderWithRouter(<RegisterCard {...propsLoading} />);
    
    const button = screen.getByRole('button');
    // Usamos la propiedad disabled del elemento DOM nativo para mayor compatibilidad
    expect(button.disabled).toBe(true);
    expect(button.textContent).toContain('Registrando...');
  });
});