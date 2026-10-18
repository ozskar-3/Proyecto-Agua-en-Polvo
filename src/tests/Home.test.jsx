import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import Home from '../pages/Home';

describe('Pruebas para el componente Home.jsx', () => {

    const mockAgregarAlCarrito = vi.fn();

    const renderHome = (initialRoute = '/#coca-cola') => {
        return render(
            <MemoryRouter initialEntries={[initialRoute]}>
                <CartContext.Provider value={{ agregarAlCarrito: mockAgregarAlCarrito, carrito: [] }}>
                    <Home />
                </CartContext.Provider>
            </MemoryRouter>
        );
    };

    test('Renderiza los títulos de las secciones principales', () => {
        renderHome();
        expect(screen.getByText(/La Selección Clásica de Coca-Cola/i)).toBeInTheDocument();
        expect(screen.getByText(/¡Novedad Exclusiva: Agua en Polvo!/i)).toBeInTheDocument();
        expect(screen.getByText(/Contáctanos para Pedidos Especiales/i)).toBeInTheDocument();
    });

    test('Llama a agregarAlCarrito al presionar "Añadir al carrito" en Coca-Cola', () => {
        renderHome();
        // Obtiene todos los botones de la lista de Coca-Cola
        const botonesAnadir = screen.getAllByRole('button', { name: /Añadir al carrito/i });
        
        fireEvent.click(botonesAnadir[0]);
        expect(mockAgregarAlCarrito).toHaveBeenCalledTimes(1);
    });

    test('Llama a agregarAlCarrito al presionar "Comprar ahora" en Agua en Polvo', () => {
        renderHome();
        const botonAguaPolvo = screen.getByRole('button', { name: /Comprar ahora/i });
        
        fireEvent.click(botonAguaPolvo);
        expect(mockAgregarAlCarrito).toHaveBeenCalled();
    });

    test('Permite interactuar y enviar el formulario de contacto con sus placeholders reales', () => {
        // Simulamos alert para que no bloquee la ejecución del test
        window.alert = vi.fn();

        renderHome();

        // Buscamos exactamente con los placeholders de tu Home.jsx
        const inputNombre = screen.getByPlaceholderText('Ej: Juan Pérez');
        const inputEmail = screen.getByPlaceholderText('ejemplo@correo.com');
        const inputMensaje = screen.getByPlaceholderText('Escribe aquí tu consulta...');
        const botonEnviar = screen.getByRole('button', { name: /Enviar Consulta/i });

        // Simulamos la escritura del usuario
        fireEvent.change(inputNombre, { target: { value: 'Oscar Test' } });
        fireEvent.change(inputEmail, { target: { value: 'oscar@test.com' } });
        fireEvent.change(inputMensaje, { target: { value: 'Mensaje de prueba de cobertura' } });

        // Verificamos los valores ingresados
        expect(inputNombre.value).toBe('Oscar Test');
        expect(inputEmail.value).toBe('oscar@test.com');
        expect(inputMensaje.value).toBe('Mensaje de prueba de cobertura');

        // Simulamos el envío del formulario
        fireEvent.click(botonEnviar);
        expect(window.alert).toHaveBeenCalledWith('¡Gracias por tu mensaje! Te responderemos a la brevedad.');
    });

});