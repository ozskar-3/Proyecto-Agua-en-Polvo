import { useContext } from 'react';
import { renderHook, act } from '@testing-library/react';
import { describe, test, expect, beforeEach } from 'vitest';
import { CartProvider, CartContext } from '../context/CartContext';

const wrapper = ({ children }) => <CartProvider>{children}</CartProvider>;

describe('Pruebas unitarias para CartContext.jsx', () => {

    beforeEach(() => {
        localStorage.clear();
        sessionStorage.clear();
    });

    test('Inicializa con un carrito vacío si no hay datos almacenados', () => {
        const { result } = renderHook(() => useContext(CartContext), { wrapper });
        expect(result.current.carrito).toEqual([]);
    });

    test('Permite agregar un producto al carrito', () => {
        const { result } = renderHook(() => useContext(CartContext), { wrapper });
        const productoPrueba = { nombre: 'Coca-Cola Original', precio: 2500 };

        act(() => {
            result.current.agregarAlCarrito(productoPrueba);
        });

        expect(result.current.carrito.length).toBe(1);
        expect(result.current.carrito[0].nombre).toBe('Coca-Cola Original');
    });

    test('Incrementa la cantidad si el producto ya existe en el carrito', () => {
        const { result } = renderHook(() => useContext(CartContext), { wrapper });
        const productoPrueba = { nombre: 'Coca-Cola Original', precio: 2500 };

        act(() => {
            result.current.agregarAlCarrito(productoPrueba);
            result.current.agregarAlCarrito(productoPrueba);
        });

        expect(result.current.carrito.length).toBe(1);
        expect(result.current.carrito[0].cantidad).toBe(2);
    });

    test('Permite eliminar un producto del carrito', () => {
        const { result } = renderHook(() => useContext(CartContext), { wrapper });
        const productoPrueba = { nombre: 'Agua en Polvo', precio: 5000 };

        act(() => {
            result.current.agregarAlCarrito(productoPrueba);
        });

        expect(result.current.carrito.length).toBe(1);

        act(() => {
            // Se envía el nombre exacto del producto o el objeto según tu función
            result.current.eliminarDelCarrito(productoPrueba.nombre);
        });

        expect(result.current.carrito.length).toBe(0);
    });

});