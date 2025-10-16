import React from 'react';
import { render, screen } from '@testing-library/react';
import Button from '../../../components/atoms/Button';

describe('Button Component', () => {
  
  it('renderiza el botón correctamente con su clase base', () => {
    render(<Button>Haz click</Button>);
    const button = screen.getByText('Haz click');
    expect(button).toBeTruthy(); 
    expect(button).toHaveClass('boton');
  });

  it('aplica la prop className correctamente para añadir clases adicionales', () => {
    render(<Button className="boton-iniciar-sesion">Haz click</Button>);
    const button = screen.getByText('Haz click');
    expect(button).toHaveClass('boton');
    expect(button).toHaveClass('boton-iniciar-sesion');
  });

});