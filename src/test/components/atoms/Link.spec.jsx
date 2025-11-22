import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Link from '../../../components/atoms/Link';

describe('Link component', () => {
  it('renderiza el enlace con el texto correcto', () => {
    render(
      <MemoryRouter>
        <Link to="/login" className="link-test">Ir al Login</Link>
      </MemoryRouter>
    );
    const link = screen.getByText('Ir al Login');
    expect(link).toBeTruthy();
    expect(link).toHaveClass('link-test');
    expect(link.getAttribute('href')).toBe('/login');
  });
});
