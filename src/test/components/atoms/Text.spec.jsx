import React from 'react';
import { render, screen } from '@testing-library/react';
import Text from '../../../components/atoms/Text';

describe('Text Component', () => {
  it('renderiza un párrafo (<p>) por defecto', () => {
    render(<Text>Hola Mundo</Text>);

    const textElement = screen.getByText('Hola Mundo');
    expect(textElement.tagName).toBe('P');
  });

  it('renderiza la etiqueta correcta cuando se le pasa la prop "as"', () => {
    render(<Text as="h1">Soy un Título</Text>);
    const headingElement = screen.getByRole('heading', { name: /Soy un Título/i });
    expect(headingElement.tagName).toBe('H1');
  });

  it('aplica el className correctamente', () => {
    render(<Text className="mi-texto">Texto con estilo</Text>);
    const textElement = screen.getByText('Texto con estilo');
    expect(textElement).toHaveClass('mi-texto');
  });
});