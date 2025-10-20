import React from 'react';
import { render } from '@testing-library/react';
import Wrapper from '../../components/Templates/Wrapper';

describe('Wrapper Component', () => {

  it('renderiza correctamente', () => {
    const { container } = render(<Wrapper><div>Test Content</div></Wrapper>);
    
    const wrapper = container.querySelector('.wrapper');
    expect(wrapper).toBeTruthy();
  });

  it('renderiza los children correctamente', () => {
    const { getByText } = render(
      <Wrapper>
        <div>Child Component</div>
      </Wrapper>
    );

    expect(getByText('Child Component')).toBeTruthy();
  });

  it('renderiza múltiples children', () => {
    const { getByText } = render(
      <Wrapper>
        <div>First Child</div>
        <div>Second Child</div>
      </Wrapper>
    );

    expect(getByText('First Child')).toBeTruthy();
    expect(getByText('Second Child')).toBeTruthy();
  });
});
