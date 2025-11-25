import React from 'react';
import { render, screen } from '@testing-library/react';
import Wrapper from '../../../components/templates/Wrapper';

describe('Wrapper Component', () => {

  it('renderiza correctamente el contenedor', () => {
    const { container } = render(<Wrapper><div>Test Content</div></Wrapper>);
    const wrapper = container.querySelector('.wrapper');
    expect(wrapper).toBeTruthy();
  });

  it('renderiza los children correctamente', () => {
    render(
      <Wrapper>
        <div>Child Component</div>
      </Wrapper>
    );
    expect(screen.getByText('Child Component')).toBeTruthy();
  });

  it('renderiza múltiples children', () => {
    render(
      <Wrapper>
        <div>First Child</div>
        <div>Second Child</div>
      </Wrapper>
    );
    expect(screen.getByText('First Child')).toBeTruthy();
    expect(screen.getByText('Second Child')).toBeTruthy();
  });
});