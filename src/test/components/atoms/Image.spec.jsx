import React from 'react';
import { render, screen } from '@testing-library/react';
import Image from '../../../components/atoms/Image';

describe('Image component', () => {
  it('renderiza con el src y alt correctos', () => {
    render(<Image src="/assets/img/login/user.png" alt="imagen de prueba" className="img-test" />);
    const img = screen.getByAltText('imagen de prueba');
    expect(img).toBeTruthy();
    expect(img.src).toContain('user.png');
    expect(img).toHaveClass('img-test');
  });
});
