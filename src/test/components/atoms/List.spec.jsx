import React from 'react';
import { render, screen } from '@testing-library/react';
import List from '../../../components/atoms/List';

describe('List Component', () => {

    it('renderiza una lista desordenada (ul) por defecto', () => {
        render(
            <List>
                <li>Item 1</li>
            </List>
        );
        const listElement = screen.getByRole('list');
        expect(listElement.tagName).toBe('UL');
        expect(listElement).toHaveClass('atom-list');
    });

    it('renderiza una lista ordenada (ol) cuando se usa la prop "as"', () => {
        render(
            <List as="ol">
                <li>Item 1</li>
            </List>
        );
        const listElement = screen.getByRole('list');
        expect(listElement.tagName).toBe('OL');
    });

    it('renderiza los children correctamente', () => {
        render(
            <List>
                <li>Elemento A</li>
                <li>Elemento B</li>
            </List>
        );
        expect(screen.getByText('Elemento A')).toBeTruthy();
        expect(screen.getByText('Elemento B')).toBeTruthy();
    });

    it('aplica clases personalizadas correctamente', () => {
        render(
            <List className="mi-clase-extra">
                <li>Item</li>
            </List>
        );
        const listElement = screen.getByRole('list');
        expect(listElement).toHaveClass('atom-list');
        expect(listElement).toHaveClass('mi-clase-extra');
    });
});