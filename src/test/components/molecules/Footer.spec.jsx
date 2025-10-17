// src/test/components/molecules/Footer.spec.jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from '../../../components/molecules/Footer';

describe('Footer Component', () => {
  it('renderiza el texto del footer correctamente', () => {
    render(<Footer />);

    expect(screen.getByText('© 2025 CiberShield')).toBeTruthy();
    expect(screen.getByText('CiberShield@gmail.com')).toBeTruthy();
  });
});