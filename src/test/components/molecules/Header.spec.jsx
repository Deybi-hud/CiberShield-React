// src/test/components/molecules/Header.spec.jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from '../../../components/molecules/Header';

describe('Header Component', () => {

  it('renderiza todos los elementos visuales correctamente', () => {
    render(<Header />);

    expect(screen.getByRole('heading', { name: /CiberShield/i })).toBeTruthy();
  });

  it('renderiza el texto del logo correctamente', () => {
    render(<Header />);

    const logo = screen.getByText('CiberShield');
    expect(logo).toBeTruthy();
  });

  it('el heading tiene la clase logo', () => {
    render(<Header />);

    const heading = screen.getByRole('heading', { name: /CiberShield/i });
    expect(heading.classList.contains('logo')).toBe(true);
  });

  it('el componente renderiza un header HTML', () => {
    const { container } = render(<Header />);

    const header = container.querySelector('header');
    expect(header).toBeTruthy();
  });
});
