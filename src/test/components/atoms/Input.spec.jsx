import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Input from '../../../components/atoms/Input';

describe('Input Component', () => {

    it('renderiza correctamente con props básicos', () => {
        render(<Input placeholder="Escribe aquí" />);
        const input = screen.getByPlaceholderText('Escribe aquí');
        expect(input).toBeTruthy();
        expect(input.type).toBe('text');
    });

    it('maneja el cambio de valor (onChange)', () => {
        const handleChange = jasmine.createSpy('handleChange');
        render(<Input onChange={handleChange} />);

        const input = screen.getByRole('textbox');
        fireEvent.change(input, { target: { value: 'Nuevo valor' } });

        expect(handleChange).toHaveBeenCalled();
    });

    it('muestra mensaje de error y borde rojo cuando hay error', () => {
        const errorMsg = 'Campo inválido';
        render(<Input error={errorMsg} />);

        const input = screen.getByRole('textbox');
        const errorSpan = screen.getByText(errorMsg);

        expect(errorSpan).toBeTruthy();
        expect(input.style.border).toContain('2px solid var(--clr-red)');
    });

    it('aplica clases personalizadas', () => {
        render(<Input className="custom-class" />);
        const input = screen.getByRole('textbox');
        expect(input.classList.contains('custom-class')).toBe(true);
    });
});