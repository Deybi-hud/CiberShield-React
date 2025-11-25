import React from 'react';
import { render, screen } from '@testing-library/react';
import ListItem from '../../../components/atoms/ListItem';

describe('ListItem Component', () => {

  it('renderiza un elemento de lista (li) correctamente', () => {
    render(<ListItem>Item de prueba</ListItem>);
    const item = screen.getByText('Item de prueba');
    
    expect(item.tagName).toBe('LI');
    expect(item).toHaveClass('atom-list-item');
  });

  it('renderiza los children correctamente', () => {
    render(
      <ListItem>
        <span>Texto dentro de un span</span>
      </ListItem>
    );
    expect(screen.getByText('Texto dentro de un span')).toBeTruthy();
  });

  it('aplica clases personalizadas correctamente', () => {
    render(<ListItem className="mi-clase-custom">Item</ListItem>);
    const item = screen.getByText('Item');
    
    expect(item).toHaveClass('atom-list-item');
    expect(item).toHaveClass('mi-clase-custom');
  });

  it('pasa props adicionales al elemento li (ej. id, eventos)', () => {
    render(<ListItem id="mi-id-unico" data-testid="custom-test-id">Item</ListItem>);
    const item = screen.getByTestId('custom-test-id');
    
    expect(item.id).toBe('mi-id-unico');
  });
});