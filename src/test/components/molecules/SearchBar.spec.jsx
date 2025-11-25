import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from '../../../components/molecules/SearchBar';

describe('SearchBar Component', () => {

    it('renderiza el input y el icono de búsqueda', () => {
        const { container } = render(<SearchBar onSearch={() => { }} />);

        expect(screen.getByPlaceholderText('Buscar productos...')).toBeTruthy();
        expect(container.querySelector('.bi-search')).toBeTruthy();
    });

    it('llama a la función onSearch al escribir', () => {
        const handleSearch = jasmine.createSpy('onSearch');
        render(<SearchBar onSearch={handleSearch} />);

        const input = screen.getByPlaceholderText('Buscar productos...');
        fireEvent.change(input, { target: { value: 'Laptop' } });

        expect(handleSearch).toHaveBeenCalledWith('Laptop');
    });
});